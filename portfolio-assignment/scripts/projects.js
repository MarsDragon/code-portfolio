function Project(args){
  i = this; //so context is not lost inside the loop, we create a new variable to hold our values
  $.each(args, function(key, value){
    i[key] = value;
  });
};

Project.all = [];

Project.loadData = function(test) {
  test.forEach(function(obj){
    Project.all.push(new Project(obj));
  });
};

Project.fetchData = function() {
  var etag = '';
  //start off by grabbing etag to check if JSON has been changed
  $.ajax('/data/data.json', {
    method: 'HEAD',
    success: function(data, msg, xhr){
      console.log(xhr.getResponseHeader('eTag'));
      etag = xhr.getResponseHeader('eTag');

      if(localStorage.etag == etag){
        Project.loadData(JSON.parse(localStorage.testData));
        projectView.init();
      }else{
        $.getJSON('/data/data.json', function(testData){
          console.log('Run callback');
          Project.loadData(testData);
          localStorage.setItem('testData', JSON.stringify(testData));
          localStorage.setItem('etag', etag);
          projectView.init();
        });
      }
    }
  });
};

Project.prototype.toHtml = function(){
  //standard Handlebars, get template, compile template, insert data, shove onto page
  var compTemplate = Handlebars.compile($('#project-template').text());

  //change markdown into HTML
  this.description = marked(this.description);

  return compTemplate(this);
};
