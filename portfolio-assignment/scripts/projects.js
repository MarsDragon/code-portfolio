(function(module) {

  function Project(args){
    i = this; //so context is not lost inside the loop, we create a new variable to hold our values
    $.each(args, function(key, value){
      i[key] = value;
    });
  };

  Project.all = [];

  Project.loadData = function(test) {
    //new using MAP! For power! For strength!
    Project.all = test.map(function(proj){
      return new Project(proj);
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

  //the total number of projects
  Project.totalProjects = function() {
    return Project.all.length;
  };

  //how many words we wasted on the description in each project
  Project.totalProjectWords = function() {
    return Project.all.map(function(proj) {
      //make this a proper word-counting regex when I care more
      var words = proj.description.split(' ');
      return words.length;
    }).reduce(function(a, b){
      return (a + b);
    });
  };

  Project.prototype.toHtml = function(){
    //standard Handlebars, get template, compile template, insert data, shove onto page
    var compTemplate = Handlebars.compile($('#project-template').text());

    //change markdown into HTML
    this.description = marked(this.description);

    return compTemplate(this);
  };

  module.Project = Project;
})(window);
