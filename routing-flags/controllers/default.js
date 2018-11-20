exports.install = function() {

	F.route('/');

	// [+xhr] - you can execute "view_subpage" with request type: XMLHttpRequest or classic GET/HTTP
	F.route('/sub/', view_subpage, ['+xhr']);

	F.route('/xhr/', xhr_example, ['xhr']);
	F.route('/xhr/post/', xhr_example_post, ['xhr', 'post']);

	F.route('/post/', form_example, ['post']);
	F.route('/json/', json_example, ['json']);
	F.route('/upload/', upload_example, ['upload']);

	F.route('/put/', put_example, ['put']);
	F.route('/delete/', delete_example, ['delete']);

	// This route is enabled in debug mode
	F.route('/debug/', debug_example, ['debug']);

	F.route('/myflag/', myflag_example, ['!myflag']);

	// https://github.com/petersirka/total.js/tree/master/examples/authorization
	// F.route('/user/profile/', user_profile, ['authorize']);
};

// flags: !myflag
function myflag_example() {

	var self = this;

	if (self.flags.indexOf('!myflag') !== -1) {
		self.plain('MYFLAG - homepage');
		return;
	}

	self.view404();
};

function view_index() {
	this.plain('GET - homepage');
}

// flags: +xhr
function view_subpage() {
	this.plain('SUBPAGE CONTENT');
}

// flags: post
function form_example() {
	this.plain('POST - homepage');
}

// flags: xhr
// Request header must contains XMLHttpRequest
function xhr_example() {
	// https://stackoverflow.com/questions/17478731/whats-the-point-of-the-x-requested-with-header
	// Header : value
	// I put "XMLHttpRequest" here, but you can use anything you want.
	// X-Requested-With : XMLHttpRequest
	this.plain('XHR - homepage');
}

// flags: xhr
// Request header must contains XMLHttpRequest
function xhr_example_post() {

	// https://stackoverflow.com/questions/17478731/whats-the-point-of-the-x-requested-with-header
	// Header : value
	// I put "XMLHttpRequest" here, but you can use anything you want.
	// X-Requested-With : XMLHttpRequest
	this.plain(this.body /*+ '\n\n\n' +this.query*/);
	// http://docs.partialjs.com/HttpRouteOptionsFlags/#post
}


// flags: json
// Request content must be a JSON
function json_example() {
	this.plain('JSON - homepage');
}

// flags: upload
// POST (MULTIPART)
function upload_example() {
	this.plain('UPLOAD - homepage');
}

// flags: debug
function debug_example() {
	this.plain('DEBUG MODE');
}

// flags: delete
function delete_example() {
	this.plain('DELETE - homepage');
}

// flags: put
function put_example() {
	this.plain('PUT - homepage');
}