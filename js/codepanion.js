var port = chrome.runtime.connect({ name: "githubAction" });

var github = {
  selectedRepo: null,
  selectedBranch: null
}

var button = document.createElement('button');
button.setAttribute('id', 'codepanion');
button.setAttribute('class', 'button button-medium');
button.innerHTML = '<svg class="nc-icon glyph" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16"><g> <path fill-rule="evenodd" clip-rule="evenodd" fill="#aeaeae" d="M8,0.2c-4.4,0-8,3.6-8,8c0,3.5,2.3,6.5,5.5,7.6 C5.9,15.9,6,15.6,6,15.4c0-0.2,0-0.7,0-1.4C3.8,14.5,3.3,13,3.3,13c-0.4-0.9-0.9-1.2-0.9-1.2c-0.7-0.5,0.1-0.5,0.1-0.5 c0.8,0.1,1.2,0.8,1.2,0.8C4.4,13.4,5.6,13,6,12.8c0.1-0.5,0.3-0.9,0.5-1.1c-1.8-0.2-3.6-0.9-3.6-4c0-0.9,0.3-1.6,0.8-2.1 c-0.1-0.2-0.4-1,0.1-2.1c0,0,0.7-0.2,2.2,0.8c0.6-0.2,1.3-0.3,2-0.3c0.7,0,1.4,0.1,2,0.3c1.5-1,2.2-0.8,2.2-0.8 c0.4,1.1,0.2,1.9,0.1,2.1c0.5,0.6,0.8,1.3,0.8,2.1c0,3.1-1.9,3.7-3.7,3.9C9.7,12,10,12.5,10,13.2c0,1.1,0,1.9,0,2.2 c0,0.2,0.1,0.5,0.6,0.4c3.2-1.1,5.5-4.1,5.5-7.6C16,3.8,12.4,0.2,8,0.2z"></path> </g></svg>GitHub';

document.getElementsByClassName('secondary-nav')[0].insertBefore(button, document.getElementById('edit-settings'));

var container = document.createElement('div');
container.setAttribute('id', 'cp_modal');
container.setAttribute('class', 'cp_modal');

var overlay = document.getElementById('popup-overlay');

button.onclick = function() {
  if(overlay.style.display === "none" || overlay.style.display === "") {
    overlay.style.display = "block"
  } 

  container.classList.toggle('open');
};

var xmr = new XMLHttpRequest();

xmr.open("GET", chrome.extension.getURL("codepanion.html"), true );
xmr.send(null);

xmr.onreadystatechange = function() {
  if(xmr.readyState === 4) {
    port.postMessage('getRepos');
    container.innerHTML = xmr.responseText;
    document.body.appendChild(container);

    var dropdowns = document.getElementsByClassName('dropdown');
    var repoSelect = document.getElementsByClassName('repo-dropdown')[0];
    var branchSelect = document.getElementsByClassName('branch-dropdown')[0];

    repoSelect.onclick = function() {
      this.classList.toggle('dropdown-open');
      var items = this.getElementsByClassName('dropdown-item');
      var select = this.getElementsByClassName('dropdown-select')[0];

      for(var x = 0; x < items.length; x++) {
        items[x].onclick = function(event) {
          var fileBrowser = document.getElementsByClassName('file-browser')[0].getElementsByTagName('ul')[0];
          while (fileBrowser.firstChild) {
            fileBrowser.removeChild(fileBrowser.firstChild);
          }
          select.innerHTML = event.target.innerHTML;
          github.selectedRepo = event.target.innerHTML;
          port.postMessage({ getBranch: event.target.innerHTML });
        }
      }
    }

    branchSelect.onclick = function() {
      this.classList.toggle('dropdown-open');

      var items = this.getElementsByClassName('dropdown-item');
      var select = this.getElementsByClassName('dropdown-select')[0];

      for(var x = 0; x < items.length; x++) {
        items[x].onclick = function(event) {
          select.innerHTML = event.target.innerHTML;
          github.selectedBranch = event.target.innerHTML;
          port.postMessage({ getTree:  github});
        }
      }
    }
  }
}

document.getElementById('popup-overlay').onclick = function() {
  this.style.display = "none";
  container.classList.remove('open');
}

port.onMessage.addListener(function(message) {
  if(message.returnBranches) {
    var branches = message.returnBranches;
    var branchDropdown = document.getElementsByClassName('branch-dropdown')[0].getElementsByTagName('ul')[0];
    while (branchDropdown.firstChild) {
      branchDropdown.removeChild(branchDropdown.firstChild);
    }
    branches.forEach(function(branch) {
      var branchItem = document.createElement('li');
      branchItem.innerHTML = branch;
      branchItem.setAttribute('class', 'dropdown-item');
      branchDropdown.appendChild(branchItem);
    });
    document.getElementsByClassName('branch-dropdown')[0].getElementsByClassName('dropdown-select')[0].innerHTML = 'Branch';
  }

  if(message.returnTree) {
    var tree = message.returnTree;
    var fileBrowser = document.getElementsByClassName('file-browser')[0].getElementsByTagName('ul')[0];
    while (fileBrowser.firstChild) {
      fileBrowser.removeChild(fileBrowser.firstChild);
    }
    tree.forEach(function(item) {
      var treeItem = document.createElement('li');
      console.log(item);
      treeItem.innerHTML = item.path;
      if(item.type === 'blob') {
        treeItem.setAttribute('class', 'file');
      } else {
        treeItem.setAttribute('class', 'folder');
      }
      fileBrowser.appendChild(treeItem);
    });
  }

  if(message.returnRepos) {
    var repos = message.returnRepos;
    var repoDropdown = document.getElementsByClassName('repo-dropdown')[0].getElementsByTagName('ul')[0];
    while (repoDropdown.firstChild) {
      repoDropdown.removeChild(repoDropdown.firstChild);
    }
    repos.forEach(function(repo) {
      var repoItem = document.createElement('li');
      repoItem.innerHTML = repo;
      repoItem.setAttribute('class', 'dropdown-item');
      repoDropdown.appendChild(repoItem);
    });
  }
});