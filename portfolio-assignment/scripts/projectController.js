(function(module) {
  var projectController = {};

  projectController.about = function() {
    $('#about').show().siblings().hide();
    github.getData('repos', githubView.init);
    github.getData('events', githubView.init);
  };

  projectController.resume = function() {
    $('#resume').show().siblings().hide();
  };

  projectController.resume = function() {
    $('main > section').hide();
    $('#resume').show();
  };

  projectController.list = function() {
    Project.fetchData();
    $('#projects').show().siblings().hide();
  };

  projectController.single = function(ctx) {
    //this isn't great
    Project.fetchData();

    Project.all.some(function(i){
      if(i.frag == '/projects/' + ctx.params.projectName){
        $('#project').html(i.toHtml());
        return true;
      }
    });

    $('#project').show().siblings().hide();
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
