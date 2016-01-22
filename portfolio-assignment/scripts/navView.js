(function(module){
  var navView = {}
  var hasRun = 0;

  var footerHtml = function(){
    var footTemplate = Handlebars.compile($('#footer-template').text());

    var context = {
      totalProj: Project.totalProjects(),
      totalWords: Project.totalProjectWords()
    };

    return footTemplate(context);
  };

  navView.toggleMenu = function () {
    if(hasRun){return}

    var $menu = $('.menu-toggle');
    $menu.on('click', function(e) {
      e.preventDefault();
      $('.tab-nav').toggle(400,function(){
        if($menu.hasClass('icon-menu3')){
          $menu.removeClass('icon-menu3').addClass('icon-menu4');
        }else{
          $menu.removeClass('icon-menu4').addClass('icon-menu3');
        }
      });
    });
    hasRun = 1;
  };

  navView.footerInit = function(){
    $('footer ul').html(footerHtml());
  };

  navView.init = function(){
    navView.toggleMenu();
  };

  module.navView = navView;
})(window)
