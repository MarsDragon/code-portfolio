(function(module) {

  var projectView = {};

  //rip
  // projectView.initTab = function() {
  //   //this is kinda slow
  //   $('.tab-section').hide();
  //   localStorage.currTab ? $('#'+ localStorage.getItem('currTab')).show() : $('#about').show();
  //   console.log('cache hit!');
  // };

  //double rip
  // projectView.tabNav = function() {
  //   $('.tab').on('click', function(event){
  //     var $content = $(this).data('content');
  //     $('.tab-section').hide();
  //     $('#'+ $content).fadeIn(700);
  //     localStorage.setItem('currTab', $content);
  //     console.log('cache write!');
  //   });
  // };

  //should I put in a link to hide the description again?
  projectView.hideDesc = function() {
    $('.view-description').on('click', function(event){
      $(this).siblings('.description').children().show();
      $(this).siblings('.description').removeClass('hidden');
      $(this).hide();
    });
  };

  projectView.createFilters = function() {
    $('article').each(function() {
      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '"> ~ ' + val + ' ~ </option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    });
  };

  projectView.eventCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      if ($(this).val()) {
        var $cat = $(this).val();
        $('article').hide();
        $('article').filter("[data-category='" + $cat + "']").fadeIn(700);
      } else {
        $('article').not('article.template').show();
      }
    });
  };

  projectView.toggleMenu = function () {
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
    console.log('cache hit!');

    //when the exported JSON is focused on, select it all
    $('#exported').on('focus', function(){
      this.select();
    });

    //when the input changes, build the preview and JSON
    $('#new-proj').on('change', 'input, textarea', projectView.createNew);
  };

  projectView.footerHtml = function(){
    var footTemplate = Handlebars.compile($('#footer-template').text());

    var context = {
      totalProj: Project.totalProjects(),
      totalWords: Project.totalProjectWords()
    };

    return footTemplate(context);
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
    console.log('cache write!');

    $('#project-preview').html(project.toHtml());
    $('#project-preview').show();
    $('#new #project-preview section').removeClass('hidden');

    $('pre code').each(function(i, chunk){
      hljs.highlightBlock(chunk);
    });

    $('#exported').show();

    $('#project-json').val(JSON.stringify(project) + ',');
  };

  projectView.init = function() {
    //loop over all Projects, append them to the DOM
    Project.all.forEach(function(i){
      $('#projects').append(i.toHtml());
    });

    $('footer ul').append(projectView.footerHtml());

    //set up all the events
    // projectView.initTab();
    // projectView.tabNav();
    projectView.hideDesc();
    projectView.createFilters();
    projectView.eventCategoryFilter();
    projectView.toggleMenu();
    projectView.initNewArticleForm();
  };

  module.projectView = projectView;
})(window);
