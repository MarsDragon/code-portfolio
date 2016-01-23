(function(module){
  var aboutView = {};

  var add = function(type, ele){

    var template = Handlebars.compile($('#git-template').text());

    if(type == 'repos'){
      return template({url: ele.url, name: ele.name});
    }else{
      if(ele.type == 'IssueCommentEvent'){
        return template({url: ele.payload.comment.html_url, name: ele.type});
      }else{
        return template({url: ele.repo.url, name: ele.type, repo: ele.repo.name});
      }
    }
  };

  aboutView.displayData = function(type){
    //I'm not sure if this is genius or madness
    $('#'+type).append(
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
