(function(module){
  var aboutView = {};

  var add = function(type, ele){

    var template = Handlebars.compile($('#git-template').text());

    //maybe add in avatar? But it's only gonna be my face
    if(type == 'repos'){
      //add description?
      return template({url: ele.html_url, name: ele.name});
    }else{
      if(ele.type == 'IssueCommentEvent'){
        return template({url: ele.payload.comment.html_url, name: ele.type});
      }else{
        //could add in a commit message
        //have to munge the url because git just doesn't return an HTML url
        var url = ele.repo.url.split(/api./).join('').split(/repos\//).join('');
        return template({url: url, name: ele.type, repo: ele.repo.name});
      }
    }
  };

  aboutView.displayData = function(type){
    //I'm not sure if this is genius or madness
    $('#'+type).html(
      about.all.map(
        function(ele){
          return add(type, ele);
        }
      )
    );
  };

  aboutView.init = function(type){
    $('#about').show().siblings().hide();

    navView.init();
  };

  module.aboutView = aboutView;
})(window);
