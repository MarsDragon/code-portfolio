(function(module){
  var resumeView = {}


  resumeView.init = function(){
    $('#resume').show().siblings().hide();

    navView.init();
  };

  module.resumeView = resumeView
})(window)
