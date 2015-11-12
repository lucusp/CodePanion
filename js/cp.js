//utils
var cp = (function() {
  
  
  var Module = {};

  //public

  //insert .html file from github
  Module.tagContent = function(content) {
    //  we probably need to leave tags alone
    //  that are inside <code> or <pre> tags
    var head = ['<head>', '</head>'],
        contentHead = '',
        headStart = content.toLowerCase().indexOf(head[0]),
        headEnd = content.toLowerCase().indexOf(head[1]);
    
    //we need to extract these and place in CSS settings
    var link = '<link',
        linkEnd = '>',
        links = [],
        linkHref = '',
        hrefText = 'href=',
        linkFirst = content.toLowerCase().indexOf(link);
    
    //only concerned with external scripts
    //place in JS settings
    var script = ['<script', '</script'],
        scripts = [],
        scriptSrc = '',
        srcText = 'src=',
        scriptFirst = content.toLowerCase().indexOf(script[0]),
        scriptEnd = content.toLowerCase().indexOf(script[1]);
        
    var body = ['<body>', '</body>'],
        bodyContent = '',
        bodyStart = content.toLowerCase().indexOf(body[0]),
        bodyEnd = content.toLowerCase().indexOf(body[1]);
    
    
    //start putting together pieces
    
    if (linkFirst !== -1){
      var numLinks = content.split(link).length - 1;
      for(var l = 0; l <= numLinks - 1; l++){
        var linkLast = content.toLowerCase().indexOf(linkEnd, linkFirst);
        links.push(content.toLowerCase().substring(linkFirst, linkLast + 1));
        //update linkFirst
        linkFirst = content.toLowerCase().indexOf(link, linkLast);
      }
    }
    
    if (scriptFirst !== -1){
      var numScripts = content.split(script[0]).length - 1;
      console.log("Number of scripts", numScripts);
    }
    
    if (headStart !== -1) {
      contentHead = content.slice(headStart + head[0].length, headEnd);
      //console.log(contentHead);
    }

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

  //enter type 'script','link', etc
  //ugly WIP still
  Module.convertSrc = function(content) {
    var link = '<link',
        linkHref = '',
        linkFirst = content.toLowerCase().indexOf(link),
        src = 'href="',
        hrefLocation = '',
        http = 'http' || '//',
        httpLocation = '';
    
    //find all the links and get locations
    //get href attr
    if(linkFirst !== -1){
      console.log(linkFirst);
      hrefLocation = content.toLowerCase().indexOf(src, linkFirst);
      console.log(hrefLocation);
      httpLocation = content.toLowerCase().indexOf(http, hrefLocation);
        if(httpLocation !== -1 && httpLocation === hrefLocation + 6){
          console.log('true');
        }
    }
        

    for (var i = 0; i < tags.length; i++) {
      //oldSrc.push(tags[i].href);
    };

  };

  //private helper fns
  //...
  function stripSrc(srcType, tags){
    
    var stripTag = [];
    
    tags.forEach(function(tag){
      
      var getSrc = tag.toLowerCase().indexOf(srcType) + 6;
      var getEnd = tag.toLowerCase().indexOf('"', getSrc);
      if(getSrc !== -1 && getEnd === -1) getEnd = tag.toLowerCase().indexOf("\'", getSrc);
      stripTag.push(tag.toLowerCase().substring(getSrc, getEnd));
      
    });
    
    return stripTag;
    
  };

  return Module;
  
  
}());