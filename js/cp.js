var cp = (function() {
  var Module = {};

  //public Modules
  //insert .html file from github
  Module.tagContent = function(content) {
    //  we probably need to leave tags alone
    //  that are inside <code> or <pre> tags
    var head = ['<head>', '</head>'],
        contentHead = '',
        headStart = content.toLowerCase().indexOf(head[0]),
        headEnd = content.toLowerCase().indexOf(head[1]);
    
    var body = ['<body>', '</body>'],
        bodyContent = '',
        bodyStart = content.toLowerCase().indexOf(body[0]),
        bodyEnd = content.toLowerCase().indexOf(body[1]);
    
    if (headStart !== -1) {
      contentHead = content.slice(headStart + head[0].length, headEnd);
      console.log(contentHead);
    }

    if (bodyStart !== -1) {
      bodyContent = content.slice(bodyStart + body[0].length, bodyEnd);
      console.log(bodyContent);
    }
    
    return {
      head: contentHead,
      body: bodyContent
    };

  };

  //enter type 'script','link', etc
  //ugly WIP still
  Module.convertSrc = function(link) {
    var oldSrc = [];
    var tags = document.getElementsByTagName(link);

    for (var i = 0; i < tags.length; i++) {
      oldSrc.push(tags[i].src);
    };

  };

  //private helper fns
  //...

  return Module;
}());