(function(module) {
  var projectController = {};

  projectController.about = function() {
    $('main > section').hide();
    $('#about').show();
  };

  projectController.list = function() {
    $('main > section').hide();
    $('#projects').show();
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
