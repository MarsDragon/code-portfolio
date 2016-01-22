(function(module){
  var resumeView = {}


  resumeView.init = function(){
    $('#resume').show().siblings().hide();
  };

  module.resumeView = resumeView
})(window)
