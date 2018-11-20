exports.install = function() {
	F.route('/');
	F.route('/new/', view_homepage2);
	F.route('/xhr/post/', controller_xhr_post, ['xhr', 'post']);
	F.route('/create/user', create_user); // Read the 'model' example for see how to send a db file as json
};

function view_homepage2() {
	var self = this;
	self.layout('layout_new');
	self.view('index');
}

function controller_xhr_post() {
	// this = FrameworkController = controller
	var self = this;

	// self.body is the body send in the request, only compatible on PUT, POST, 
	self.plain(self.body);
}