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

$(document).ready(function(){
  projectView.tabNav();
  projectView.hideDesc();
});
