var github = {};

OAuth.initialize('7CqVQwx6T4xZKCq5nEB9c4L7xhA');

var githubCache = OAuth.create('github');

if(githubCache) {
  github.token = githubCache.access_token;

  githubCache.me().done(function(data) {
    github.username = data.alias;
    chrome.storage.local.set({ 'github': JSON.stringify(github) }, null);
  });

} else {
  document.getElementById('login').style.display = "inline-block";

  document.getElementById('login').onclick = function() {
    OAuth.popup('github')
    .done(function(result) {
      github.token = result.access_token;

      result.me().done(function(data) {
        github.username = data.alias;

        chrome.storage.local.set({ 'github': JSON.stringify(github) }, null);
        document.getElementById('login').style.display = "none";
      });
    })  
    .fail(function(error) {
      console.log(error);
    });
  };
}
