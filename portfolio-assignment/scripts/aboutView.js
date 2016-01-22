(function(module){
  var aboutView = {};

  var add = function(type, ele){
    //move this to index and templates
    if(type == 'repos'){
      return '<li><a href="'+ ele.url + '">' + ele.name + '</a></li>';
    }else{
      if(ele.type == 'IssueCommentEvent'){
        return '<li><a href=\''+ ele.payload.comment.html_url + '\'>' + ele.type + '</a></li>';
      }else{
        return '<li><a href="'+ ele.repo.url + '">' + ele.type + '</a> to '+ ele.repo.name +'</li>';
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

    //temp until I get page working right
    aboutView.init();
  };

  aboutView.init = function(type){
    $('#about').show().siblings().hide();
  };

  module.aboutView = aboutView;
})(window);
