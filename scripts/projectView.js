(function(module) {

  var projectView = {};

  projShow = function(ele){
    ele.removeClass('hidden').children().show();
  };

  //reveals the description when the view more link is clicked on the project list page
  //should I put in a link to hide the description again?
  projectView.revealDesc = function() {
    $('.view-description').on('click', function(event){
      //Get the sibling description, remove its class .hidden, hide it, show its children
      var $ele = $(this);
      projShow($ele.siblings('.description'))
      //take this out, allow a toggle? 
      $ele.hide();
    });
  };

  //show the entire description and don't have a view more link
  projectView.showDesc = function() {
    projShow($('.description'));
    $('.view-description').remove();
  };

  //new project stuff
  projectView.initNewArticleForm = function () {
    //hide the exported field for now
    $('#exported').hide();

    //if there's local data for the fields, load it in. Else do nothing.
    $('#new-proj input, textarea').each(function(i){
      var $name = $(this).attr('name');
      localStorage[$name] ? $(this).val(localStorage.getItem($name)) : null;
    });

    //when the exported JSON is focused on, select it all
    $('#exported').on('focus', function(){
      this.select();
    });

    //when the input changes, build the preview and JSON
    $('#new-proj').on('change', 'input, textarea', projectView.createNew);
  };

  projectView.createNew = function() {
    var project = new Project({});

    $('#project-preview').empty;

    //this is the clever bit
    //loop over the input and the textareas, grabbing out the name/values and using those as the key/values in the object
    $('#new-proj input, textarea').each(function(i){
      var $name = $(this).attr('name');
      project[$name] = $(this).val();
      //slip the localStorage in here too, why not
      localStorage.setItem($name, $(this).val());
    });

    $('#project-preview').html(project.toHtml());
    $('#project-preview').show();
    $('#new #project-preview section').removeClass('hidden');

    $('pre code').each(function(i, chunk){
      hljs.highlightBlock(chunk);
    });

    $('#exported').show();

    $('#project-json').val(JSON.stringify(project) + ',');
  };

  //initialize the project list view
  projectView.listInit = function() {
    //loop over all Projects, append them to the DOM
    if($('#projects article').length == 0){
      Project.all.forEach(function(i){
        $('#projects').append(i.toHtml());
      });
    }

    //set up all the events
    projectView.revealDesc();
    projectView.initNewArticleForm();

    $('#projects').show().siblings().hide();

    //kludy, but have to do it this way until I add page.always()
    navView.init();
    navView.footerInit();
  };

  //initialize the single project view
  projectView.singleInit = function(projectName) {
    Project.all.some(function(i){
      if(i.frag == '/projects/' + projectName){
        $('#project').html(i.toHtml());
        return true;
      }
    });

    $('#project').show().siblings().hide();

    projectView.showDesc();

    navView.init();
  };

  //and tne new project
  projectView.newInit = function(){
    projectView.initNewArticleForm();
    $('#new').show().siblings().hide();

    navView.init();
  };

  module.projectView = projectView;
})(window);
