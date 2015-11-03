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
    if (message === "clone") {
      var githubInstance = new Github({
        token: github.token,
        auth: 'oauth'
      });

      var user = githubInstance.getUser();

      user.repos({ "type": "owner" }, function(err, repos) {
        github.repo = [];

        repos.forEach(function(repo) {

        });

        port.postMessage({ cloneResponse: github.repo });
      });

      function getRepoTree(repo) {
        repo.listBranches(function(err, branches) {

          branches.forEach(function(branch) {

            repo.getTree(branch, function(err, tree) {

              tree.forEach(function(file) {

              });

            });

          });
        });
      }
    }
  });
});