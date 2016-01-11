var projectView = {};

projectView.tabNav = function() {
  $('.tab').on('click', function(event){
    var $content = $(this).data('content');
    $('.tab-section').hide();
    $('#'+ $content).fadeIn(700);
  });
};

projectView.hideDesc = function() {
  $('.view-description').on('click', function(event){
    $(this).siblings('.description').children().show();
    $(this).siblings('.description').removeClass('hidden');
    $(this).hide();
  });
};

projectView.createFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '"> ~' + val + '~ </option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
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
  $('#project-export').hide();

  //when the exported JSON is focused on, select it all
  $('#exported').on('focus', function(){
    this.select();
  });

  //when the input changes, build the preview and JSO
  $('#new-proj').on('change', 'input, textarea', projectView.createNew);
};

projectView.createNew = function() {
  var project;

  //clear out the preview
  $('#project-preview').empty();

  //grab the form fields and make a new project with 'em
  project = new Project({
    name: $('#project-name').val(),
    url: $('#project-url').val(),
    category: $('#project-category').val(),
    startDate: $('#project-startDate').val(),
    finDate: $('#project-finished').val().length ? new Date().toISOString().slice(0,10) : null,
    description: $('#project-description').val()
  });

  $('#project-preview').append(project.toHtml());
  $('#project-preview').show();
  $('#new #project-preview section').removeClass('hidden');

  $('pre code').each(function(i, chunk){
    hljs.highlightBlock(chunk);
  });

  $('#project-export').show();

  $('#project-json').val(JSON.stringify(project) + ',');
};

projectView.init = function() {
  //oh FINE
  Project.all.forEach(function(i){
    $('#projects').append(i.toHtml());
  });

  projectView.tabNav();
  projectView.hideDesc();
  projectView.createFilters();
  projectView.eventCategoryFilter();
  projectView.toggleMenu();
  projectView.initNewArticleForm();
};
