var projects = [];

function Project(args){
  i = this; //so context is not lost inside the loop, we create a new variable to hold our values
  $.each(args, function(key, value){
    i[key] = value;
  });
};

Project.prototype.toHtml = function(){
  //standard Handlebars, get template, compile template, insert data, shove onto page
  var compTemplate = Handlebars.compile($('#project-template').text());

  //change markdown into HTML
  this.description = marked(this.description);

  return compTemplate(this);
};

//Project.prototype.append = function (obj){
//  $('#projects').append(obj);
//};

test.forEach(function(obj){
  projects.push(new Project(obj));
});

//oh FINE
projects.forEach(function(i){
  $('#projects').append(i.toHtml());
});
