// Run only on install
chrome.runtime.onInstalled.addListener(function(details) {
  if(details.reason === "install") {
    chrome.tabs.create({ 'url': 'chrome-extension://' + chrome.runtime.id + '/options.html'});
  } 
});

// Rest of the logic
var github;

chrome.storage.local.get('github', function(result) {
  github = JSON.parse(result.github);
});

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(message) {
    if (message.getBranch) {
      var githubInstance = new Github({
        token: github.token,
        auth: 'oauth'
      });

      var getBranches = [];

      githubInstance.getRepo(github.username, message.getBranch).listBranches(function(err, branches) {
        branches.forEach(function(branch) {
          getBranches.push(branch);
        });
        port.postMessage( { returnBranches: getBranches} );
      });
    }

    if (message.getTree) {
      var githubInstance = new Github({
        token: github.token,
        auth: 'oauth'
      });

      var getTree = [];

      githubInstance.getRepo(github.username, message.getTree.selectedRepo).getTree(message.getTree.selectedBranch, function(err, tree) {
        tree.forEach(function(item) {
          getTree.push(item.path);
        });
        port.postMessage({ returnTree: getTree });
      });
    }

    if(message === 'getRepos') {
      var githubInstance = new Github({
        token: github.token,
        auth: 'oauth'
      });

      var getRepos = [];

      var user = githubInstance.getUser();

      user.repos({ type: 'owner' }, function(err, repos) {
        repos.forEach(function(repo) {
          getRepos.push(repo.name);
          console.log(repo.name);
        });
        port.postMessage( { returnRepos: getRepos } );
      });
    }
  });
});