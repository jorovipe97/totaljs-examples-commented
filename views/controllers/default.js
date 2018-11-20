exports.install = function() {
	F.route('/');
	F.route('/new/', view_homepage2);
	F.route('/xhr/post/', controller_xhr_post, ['xhr', 'post']);
};

function view_homepage2() {
	var self = this;
	self.layout('layout_new');
	self.view('index');
}

function controller_xhr_post() {
	// this = FrameworkController = controller
	var self = this;

	// self.body is the body of the requested message
	self.plain(self.body);
}