page.base('');

///look at page.js, do an always
//page.dispach(), line 314, call global function pointer, need var to hold that function
//use page.callbacks,

// page('/*', navView.init);
page('/', projectController.about, aboutView.init);
page('/about', projectController.about, aboutView.init);
page('/resume', projectController.resume);
page('/projects', projectController.list);
page('/projects/:projectName', projectController.single);
page('/new', projectController.new);
page('*', projectController.notFound);

page();
