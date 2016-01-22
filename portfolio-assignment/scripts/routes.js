page.base('');

///look at page.js, do an always
//page.dispach(), line 314, call global function pointer, need function to hold that function


page('/', projectController.about, navView.init);
page('/about', projectController.about, navView.init);
page('/resume', projectController.resume, navView.init);
page('/projects', projectController.list, navView.init);
page('/projects/:projectName', projectController.single, navView.init, projectView.showDesc);
page('/new', projectController.new, navView.init);
page('*', projectController.notFound, navView.init);

page();
