var projectView = {};

projectView.tabNav = function() {
  $('.tab').on('click', function(event){
    var $content = $(this).data('content');
    $('.tab-section').hide();
    $('#'+ $content).fadeIn(700);
  });
};

// DONE: Call all of the above functions, once we are sure the DOM is ready.
$(document).ready(function(){
  projectView.tabNav();
});
