page.base('');

///look at page.js, do an always
//page.dispach(), line 314, call global function pointer, need var to hold that function

page('/', projectController.about, aboutView.init);
page('/about', projectController.about, aboutView.init);
page('/resume', projectController.resume);
page('/projects', projectController.list);
page('/projects/:projectName', projectController.single);
//no link to this, but it exists
page('/new', projectController.new);
page('*', projectController.notFound);

page();
