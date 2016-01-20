(function(module){
  var github = {};

  github.all = [];

  //type is events or repos. Or whatever. It's cool.
  github.getData = function(type, callback){
    var qs = '?per_page=10&sort=updated';

    var etag = '';
    //start off by grabbing etag to check if JSON has been changed
    $.ajax('https://api.github.com/users/MarsDragon/' + type + qs, {
      method: 'HEAD',
      success: function(data, msg, xhr){
        etag = xhr.getResponseHeader('eTag');

        //once we have that, check if it matches what's in local storage
        if(localStorage.gitEtag == etag){
          //if yes, just use that
          github.all = JSON.parse(localStorage[type]);
          callback(type);
        }else{
          $.ajax({
            url: 'https://api.github.com/users/MarsDragon/' + type + qs,
            method: 'GET',
            ifModified: true,
            header: {'Authorization': 'token ' + gitAuth.getToken()},
            success: function(data, msg, xhr){
              github.all = data;
              localStorage[type] = JSON.stringify(data);
              localStorage.setItem('gitEtag', etag);
            }
          }).done(function(){
            callback(type);
          });
        }
      }
    });
  };

  module.github = github;
})(window);
