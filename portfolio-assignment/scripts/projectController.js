(function(module) {
  var projectController = {};

  projectController.about = function(ctx, next) {
    about.getData('repos', aboutView.displayData);
    about.getData('events', aboutView.displayData);
    next();
  };

  projectController.resume = function() {
    resumeView.init();
  };

  projectController.list = function() {
    Project.fetchData(projectView.listInit);
  };

  projectController.single = function() {
    Project.fetchData(projectView.singleInit);
  };

  projectController.new = function() {
    $('#new').show().siblings().hide();
  };

  projectController.notFound = function() {
    $('#notFound').show().siblings().hide();
  };

  module.projectController = projectController;
})(window);
