(function(module){
  var githubToken = 'b2bded39f11399ab6ee03f4677d1d5388e419807';
  //'45a50a7d6d2217957ee7295e9478b8674aec844d';

  var gitAuth = {};

  gitAuth.getToken = function(){
    return githubToken;
  };

  module.gitAuth = gitAuth;
})(window);
