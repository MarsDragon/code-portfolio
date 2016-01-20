(function(module){
  var github = {};

  github.all = [];

  //type is events or repos. Or whatever. It's cool.
  github.getData = function(type, callback){
    var qs = '?per_page=10&sort=updated';

    $.ajax({
      url: 'https://api.github.com/users/MarsDragon/' + type + qs,
      method: 'GET',
      ifModified: true,
      header: {'Authorization': 'token ' + gitAuth.getToken()},
      success: function(data, msg, xhr){
        github.all = data;
        localStorage[type] = JSON.stringify(data);
      }
    }).done(function(){
      callback(type);
    });
  };

  module.github = github;
})(window);
