//convert script.js to vanilla
//remove jQuery dependency
    /*   

        needed dependencies:
            oauth.io -> github sign in
            githubjs -> github api calls

    */

(function(){
    
    var gh_username, gh_pas, gh_url, gh_path, gh_path_len, gh_commit_msg, gh_path_pieces, gh_data,
    signIn = document.getElementsByTagName('button')[0],
    commit = document.getElementsByTagName('button')[1],
    results = document.getElementById('data_dump');
    
    OAuth.initialize('qg3uN6ehTJYw_uXad1AO8iki2WA'); /* global OAuth */
    
    signIn.on('click', function(e){
        e.preventDefault();
        
          OAuth.popup('github')
            .done(function(result){
              console.log(result.access_token);
              gh_pas = result.access_token;
              
              result.me().done(function(data){
                  console.log(data.alias);
                  gh_username = data.alias;
              });
          
          })
            .fail(function(err){
              console.log(err);
          });
    });
    
    commit.on('click', function(e){
        e.preventDefault();
        
        gh_url = document.getElementById('gh-url').value;
        gh_path = document.getElementById('gh-path').value;
        gh_commit_msg = document.getElementById('gh-commit-msg').value;
        gh_path_pieces = gh_path.split('/');
        gh_path_len = gh_path_pieces.length;
        
        //spell out the path
        var _path = '';
        for (var i = 2; i < gh_path_len; i++) {
          if (i === (gh_path_len - 1)) {
            _path += gh_path_pieces[i];
          } else {
            _path += gh_path_pieces[i] + "/";
          }
        }
        
        //create new github js instance
        var github = new Github({
          token: gh_pas,
          auth: 'oauth'
        });
        
        var repo = github.getRepo(gh_username, gh_path_pieces[0]);
        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', gh_url, true);
        xhr.responseType = 'text';
        
        xhr.onload = function(){
            if(xhr.status >= 200 && xhr.status <= 400){
                
                gh_data = xhr.responseText;
                repo.write(gh_path_pieces[1], _path, gh_data, gh_commit_msg, function(err) {
                    results.textContent = gh_data;
                    console.log(err);
                });
                
            } else {
                console.log(Error(xhr.status));
            }
        };
        
        xhr.send();
        
    });
    
    
    
    
    
})();