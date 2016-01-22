(function(module){
  var about = {};

  about.all = [];

  //type is events or repos. Or whatever. It's cool.
  about.getData = function(type, callback){
    var qs = '?per_page=10&sort=updated';

    $.get('/github/users/MarsDragon/' + type + qs,
        function(data, message, xhr){
          about.all = data;
        }).done(function(){
          callback(type);
        });
  };


  module.about = about;
})(window);
