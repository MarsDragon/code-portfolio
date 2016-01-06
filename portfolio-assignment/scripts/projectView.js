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

$(document).ready(function(){
  projectView.tabNav();
  projectView.hideDesc();
  projectView.createFilters();
  projectView.eventCategoryFilter();
});
