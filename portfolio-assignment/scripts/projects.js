function Project(args){
  i = this; //so context is not lost inside the loop, we create a new variable to hold our values
  $.each(args, function(key, value){
    i[key] = value;
  });
};

Project.prototype.toHtml = function(){
  //make a local variable using the template
  var $localProj = $('article.template').clone();

  //fill in the html
  $localProj.find('header a').text(i.name);
  $localProj.find('header a').attr('src', i.url);
  $localProj.find('.info time:first').text(i.startDate);
  $localProj.find('.info time:last').text(i.finDate);
  $localProj.find('.description').text(i.description);

  //remove template class
  $localProj.removeClass('template');

  //append as soon as you finish
  Project.prototype.append($localProj);
  Project.prototype.cleanUp();
};

Project.prototype.append = function (obj){
  $('#projects').append(obj);
};

Project.prototype.cleanUp = function (){
  $('article.template').hide();
};

test.forEach(function(obj){
  proj = new Project(obj);
  proj.toHtml();
});
