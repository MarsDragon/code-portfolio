(function(module){
  var resumeView = {}
  var hasRun = 0;

  resumeView.showHide = function(){
    if(hasRun){return;}

    $accordion = $('.accordion');

    $accordion.on('click', function(e){
      $p = $(this).siblings('ul');
      $accordion = $(this);

      $p.toggle(500, function(e){
        if($accordion.hasClass('icon-plus')){
          $accordion.removeClass('icon-plus').addClass('icon-minus');
        }else{
          $accordion.removeClass('icon-minus').addClass('icon-plus');
        }
      });
    });

    hasRun = 1;
  };

  resumeView.init = function(){
    $('#resume').show().siblings().hide();
    resumeView.showHide();

    navView.init();
  }

  module.resumeView = resumeView
})(window)
