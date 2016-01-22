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

  projectController.single = function(ctx) {
    projectName = ctx.params.projectName;

    //we're calling fetchData here on the off chance someone is coming directly to a single project page with no data loaded
    Project.fetchData(projectView.singleInit, projectName);
  };

  projectController.new = function() {
    $('#new').show().siblings().hide();
  };

  projectController.notFound = function() {
    $('#notFound').show().siblings().hide();
  };

  module.projectController = projectController;
})(window);
