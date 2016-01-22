(function(module) {
  var projectController = {};

  projectController.about = function(ctx, next) {
    $('#about').show().siblings().hide();
    about.getData('repos', aboutView.init);
    about.getData('events', aboutView.init);
    next();
  };

  projectController.resume = function(ctx, next) {
    $('#resume').show().siblings().hide();
    next();
  };

  projectController.list = function(ctx, next) {
    Project.fetchData(projectView.init);
    $('#projects').show().siblings().hide();
    next();
  };

  projectController.single = function(ctx, next) {
    //this isn't great
    Project.fetchData(projectView.init);

    Project.all.some(function(i){
      if(i.frag == '/projects/' + ctx.params.projectName){
        $('#project').html(i.toHtml());
        return true;
      }
    });

    $('#project').show().siblings().hide();

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
