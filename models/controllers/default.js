exports.install = function() {
	F.route('/', json_homepage);
};

function json_homepage() {

    var self = this;
	var User = MODEL('user');

	// sends a formated json
    self.json(User.create(), true);

}