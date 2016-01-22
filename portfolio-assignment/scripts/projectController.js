(function(module) {
  var projectController = {};

  projectController.about = function(ctx, next) {
    about.getData('repos', aboutView.displayData);
    about.getData('events', aboutView.displayData);
    next();
  };

  projectController.resume = function(ctx, next) {
    resumeView.init();
    next();
  };

  projectController.list = function(ctx, next) {
    Project.fetchData(projectView.listInit);
    next();
  };

  projectController.single = function(ctx, next) {
    //this isn't great
    Project.fetchData(projectView.singleInit);
    next();
  };

  projectController.new = function(ctx, next) {
    $('#new').show().siblings().hide();
    next();
  };

  projectController.notFound = function(ctx, next) {
    $('#notFound').show().siblings().hide();
    next();
  };

  module.projectController = projectController;
})(window);
