(function(module) {

  function Project(args){
    //updating to the less-hacky way to do it
    Object.keys(args).forEach(function(k, index, keys){
      this[k] = args[k];
    },this);
  };

  Project.all = [];

  Project.loadData = function(test) {
    //new using MAP! For power! For strength!
    Project.all = test.map(function(proj){
      return new Project(proj);
    });
  };

  Project.fetchData = function(callback, projectName) {
    var etag = '';
    //start off by grabbing etag to check if JSON has been changed
    $.ajax('/data/data.json', {
      method: 'HEAD',
      success: function(data, msg, xhr){
        etag = xhr.getResponseHeader('eTag');

        //once we have that, check if it matches what's in local storage
        if(localStorage.etag == etag){
          //if yes, just use that
          Project.loadData(JSON.parse(localStorage.testData));
          callback(projectName);
        }else{
          //else get the data from the changed JSON, then load the JSON into local data.
          $.getJSON('/data/data.json', function(testData){
            Project.loadData(testData);
            localStorage.setItem('testData', JSON.stringify(testData));
            localStorage.setItem('etag', etag);
            callback(projectName);
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
      //GET REGEXED
      //Actually helpful comment: This regex finds the boundaries of words, followed by one or more word characters, followed by another word boundary. So it's a word-counter.
      //The special part is it doesn't match word characters that start with pointy bracket or pointy bracket plus frontslash. Net result: doesn't count HTML tags.
      var re = /\b|[^<\/]\w+\b/;
      var words = proj.description.split(re);
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
