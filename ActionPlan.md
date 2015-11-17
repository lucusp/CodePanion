CodePanion Course of Action
========

Team Members:
-------

**Harris Carney, UI & Integration**:

```
    //current tasks here
```

**Lucus Pettigrew, Utilities & Staging**:

####Clone
+ GitHub Content staging for CodePen
  + `HTML`
    + `HEAD` content, insert into `HTML` settings
    + `BODY` content, insert into `HTML` editor
    + `LINK` stylesheet tags
  + `CSS`
    + Convert relative path to [rawgit](https://rawgit.com) links
    + Place external `link` sources in CSS settings
  + `SCRIPT`
    + Convert relative path to [rawgit](https://rawgit.com) sources
    + Place external `script` sources into Javascript settings

####Commit
+ CodePen Content staging for GitHub
  + `HTML`
    + `BODY` Content, insert into `HTML`, `HEAD`, `BODY` wrappers
    + Recreate `LINK` tags for `HEAD`
  + `CSS`
    + Revert converted rawgit links to relative links
    + Recreate `LINK` tags
    + Place `LINK` tags in corrent place of `HEAD` tags
  + `SCRIPT`
    + Revert converted rawgit links to relative links
    + Recreate `SCRIPT` tags
    + Place `SCRIPT` tags in corrent place of `HEAD` or `BODY`