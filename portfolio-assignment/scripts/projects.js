function Project(args){
  i = this; //so context is not lost inside the loop, we create a new variable to hold our values
  $.each(args, function(key, value){
    i[key] = value;
  });
};

Project.prototype.toHtml = function(){
  //make a local variable using the template
  var $localProj = $('article.template').clone();

  //category data attribute
  $localProj.attr('data-category', i.category);

  //fill in the html
  $localProj.find('header a').text(i.name);
  $localProj.find('header a').attr('src', i.url);
  $localProj.find('.info time:first').text(i.startDate);
  $localProj.find('.info time:last').text(i.finDate);
  $localProj.find('.description').html(i.description);

  //remove template class
  $localProj.removeClass('template');

  //append as soon as you finish
  Project.prototype.append($localProj);
};

Project.prototype.append = function (obj){
  $('#projects').append(obj);
};

test.forEach(function(obj){
  proj = new Project(obj);
  proj.toHtml();
});
