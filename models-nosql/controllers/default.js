exports.install = function() {
	F.route('/');
	// read
	F.route('/products/', json_query, ['*Products']); // It specifies the scheme to utilize defined in /models folder
	// create
	F.route('/products/new', json_save, ['*Products', 'POST', 'xhr']);
};

function json_query() {
	// this = controller = FrameworkController
	var self = this;
	// Executes SchemaDeclaration.query according to the schema which is defined in the F.route().
	self.$query(self.query, self.callback());

	// about self.callback()
	// Returns the wrapped function callback(err, some_data_as_model)
	// the model is a way of passing data between controllers and views
	// I think self.callback() saves the query response in the view model which requested the route
}

function json_save() {
	var self = this;
	
	// Same as: self.$save([options], callback);
	// because of the the model is controller.body in SchemaDeclaration
	self.body.$save(self, self.callback());
}