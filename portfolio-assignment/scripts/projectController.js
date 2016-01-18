(function(module) {
  var projectController = {};

  projectController.about = function() {
    $('main > section').hide();
    $('#about').show();
  };

  projectController.list = function() {
    Project.fetchData();
    $('main > section').hide();
    $('#projects').show();
  };

  projectController.single = function(ctx) {
    //this isn't great
    Project.fetchData();

    $('main > section').hide();

    Project.all.some(function(i){
      if(i.frag == '/projects/' + ctx.params.projectName){
        $('#project').html(i.toHtml());
        return true;
      }
    });
    
    $('#project').show();
  };

  projectController.new = function() {
    $('main > section').hide();
    $('#new').show();
  };

  projectController.notFound = function() {
    $('main > section').hide();
    $('#notFound').show();
  };

  module.projectController = projectController;
})(window);
