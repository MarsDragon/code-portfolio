page.base('');

page('/', projectController.about);
page('/about', projectController.about);
page('/resume', projectController.resume);
page('/projects', projectController.list);
page('/projects/:projectName', projectController.single);
page('/new', projectController.new);
page('*', projectController.notFound);

page();
