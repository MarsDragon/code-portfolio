page.base('');

page('/', projectController.about);
page('/about', projectController.about);
page('/projects', projectController.list);
page('/new', projectController.new);
page('*', projectController.notFound);

page();
