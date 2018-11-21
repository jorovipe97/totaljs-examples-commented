exports.install = function() {
	F.route('/');
	// read
	F.route('/products/', json_query, ['*Products']); // It specifies the scheme to utilize defined in /models folder
	// create
	F.route('/products/new', json_save, ['*Products', 'POST', 'xhr']);

	F.route('/products/http408', http_408_get, ['GET']);

	F.route('/products/http408', http_408, ['POST']);
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

	console.log('saving product');
	
	// Same as: self.$save([options], callback);
	// because of the the model is controller.body in SchemaDeclaration
	self.body.$save(self, self.callback());

	/*ON('#products.save', function () {
		console.log('PRODUCT SAVED');
	});*/
}

function http_408_get()
{
	var self = this;
	// No responds nothing to generate a http 408 error (request timeout)	
}

// No responds nothing to generate a http 408 error (request timeout)
function http_408() {
	var self = this;

	// Insert a document in the someDB database
	var db = NOSQL('someDB');
	db.insert(self.body);

	// un-comment this to send a response to client in json format
	// self.json({some: 'data'})
}