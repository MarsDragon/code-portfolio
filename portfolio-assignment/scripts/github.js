(function(module){
  var github = {};

  github.all = [];

  //type is events or repos. Or whatever. It's cool.
  github.getData = function(type, callback){
    var qs = '?per_page=10&sort=updated';

    $.get('/github/users/MarsDragon/' + type + qs,
        function(data, message, xhr){
          github.all = data;
        }).done(function(){
          callback(type);
        });
  };


  module.github = github;
})(window);
