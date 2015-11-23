//utils
var Parser = (function() {
  
  
  var Module = {};

  //public

  //insert .html file from github
  Module.tagContent = function(content) {

    //head details: return [contentHead] for HTML settings
    var head = ['<head>', '</head>'],
        contentHead = '',
        headStart = content.toLowerCase().indexOf(head[0]),
        headEnd = content.toLowerCase().indexOf(head[1]);
    
    //link details: return [links] for CodePen CSS settings
    var link = '<link',
        linkEnd = '>',
        links = [],
        linkHref = '',
        hrefText = 'href=',
        linkFirst = content.toLowerCase().indexOf(link);
    
    //script details: return [scripts] for CodePen JS settings
    var script = ['<script ', '</script>'],
        scripts = [],
        scriptSrc = '',
        srcText = 'src=',
        scriptFirst = content.toLowerCase().indexOf(script[0]),
        scriptEnd = content.toLowerCase().indexOf(script[1]);
    
    //body details: return [bodyContent] for CodePen editor
    var body = ['<body>', '</body>'],
        bodyContent = '',
        bodyStart = content.toLowerCase().indexOf(body[0]),
        bodyEnd = content.toLowerCase().indexOf(body[1]);
    
    
    //gather link tags into an array
    if (linkFirst !== -1){
      var numLinks = content.split(link).length - 1;
      console.log("Number of Link Tags:", numLinks);
      for(var l = 0; l <= numLinks - 1; l++){
        var linkLast = content.toLowerCase().indexOf(linkEnd, linkFirst);
        links.push(content.toLowerCase().substring(linkFirst, linkLast + 1));
        //update linkFirst
        linkFirst = content.toLowerCase().indexOf(link, linkLast);
      }
    }
    
    /*
      @WIP:
        a) only get EXTERNAL scripts
        b) extract and place into array
    */
    if (scriptFirst !== -1){
      var numScripts = content.split(script[0]).length - 1;
      console.log("Number of scripts tags:", numScripts);
      for(var s = 0; s <= numScripts - 1; s++){
        var scriptLast = content.toLowerCase().indexOf(script[1], scriptFirst);
        scripts.push(content.toLowerCase().substring(scriptFirst, scriptLast + 9));
        //update scriptFirst
        scriptFirst = content.toLowerCase().indexOf(script[0], scriptFirst + 7);
      }
    }
    
    //extract [head] content
    if (headStart !== -1) {
      contentHead = content.slice(headStart + head[0].length, headEnd);
      //console.log(contentHead);
    }

    //extract [body] content
    if (bodyStart !== -1) {
      bodyContent = content.slice(bodyStart + body[0].length, bodyEnd);
      //ghContent.textContent = bodyContent;
    }
    
    return {
      head: contentHead,
      body: bodyContent,
      links: links,
      scripts: scripts
    };

  };

  //close but still WIP
  //intuitive it doesn't mess with external sources
  Module.convertSrc = function(repo, srcRef, tags) {
      //srcType, tags, username, sha, \path
      var username = repo.user,
          reponame = repo.repo,
          branchname = repo.branch;
      
      // if preceded http || https || //
      // then ignore
      var http = 'http';
      var slashSlash = '//';
      var converts = [];
      var path;
      
      tags.forEach(function(tag){
        
        var tagArray = [tag];
        var isExternal = tag.toLowerCase().indexOf(http);
        
        if(isExternal === -1) isExternal = tag.toLowerCase().indexOf(slashSlash);
        
        //clean & convert relative links
        if(isExternal === -1){
          //do stuff
          path = stripSrc(srcRef, tagArray);
          var rawgit = 'https://rawgit.com/' + username + '/' + reponame + '/' + branchname + '/' + path;
          //console.log(rawgit);
          converts.push(rawgit);
    
        } else {
          
          var ext = stripSrc(srcRef, tagArray);
          converts.push(ext[0]);
          
        }
        
      });
      
      
      return converts;
      
  };

  //private helper fns
  //...
  
  /*
    strip external sources: 
      srcType = 'href' || 'src'
      tags = links || scripts (array)
  */
    
  function stripSrc(srcType, tags){
    
    var stripTag = [];
    
    tags.forEach(function(tag){
      
      //get the source
      var getSrc = tag.toLowerCase().indexOf(srcType);
      var getNext = tag.toLowerCase().indexOf('"', getSrc);
      var getEnd = tag.toLowerCase().indexOf('"', getNext + 1);
      
      //pesky single quotes!
      if(getNext === -1) getNext = tag.toLowerCase().indexOf("\'", getSrc);
      if(getEnd === -1) getEnd = tag.toLowerCase().indexOf("\'", getNext + 1);
      
      if(getSrc !== -1 && getEnd !== -1) stripTag.push(tag.toLowerCase().substring(getNext + 1, getEnd));
      
    });
    
    return stripTag;
    
  };

  //@End
  return Module;
  
})();