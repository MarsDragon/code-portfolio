(function(module){
  var githubView = {};

  var add = function(type, ele){
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

  githubView.init = function(type){
    //I'm not sure if this is genius or madness
    $('#'+type).append(
      github.all.map(
        function(ele){
          return add(type, ele);
        }
      )
    );
  };

  module.githubView = githubView;
})(window);
