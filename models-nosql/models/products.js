NEWSCHEMA('Products').make(function(schema) {
	schema.define('name', String);
	schema.define('price', Number, (value, model) => { value > 0 }); // field validation

	// Sets SchemaDeclaration.query
	schema.setQuery(function(error, options, callback, controller) {
		NOSQL('products').find().make(function(builder) {
			// builder.take(U.parseInt(options.take) || 20);
			// builder.skip(U.parseInt(options.skip) || 0);
			builder.callback(callback);
		});
	});

	// Saves the product into the database
	// sets SchemaDeclaration.save
	schema.setSave(function (error, model, controller, callback) {
		// IMPORTANT: the model is controller.body (self.body)
		var nosql = NOSQL('products');

		// Global SUCCESS: https://goo.gl/pS1Xzq
		// SUCCESS() returns an objoect like this: { success: Boolean, [value: value ]}
		// It is not needed to send that object. We could send whathever object that we consider appropiate
		// the important here is to note that callback(obj) will send a response to the client
		// if client does not receive the response in the max time then a HTTP 408 error will be sended to
		// client
		// callback({response: 'hello', someData: 'foo bar xd'})
		//callback(SUCCESS(true));
		// EMIT is alias for F.emit()
		// EMIT('products.save', model);
		console.log('product saved');
		callback(); // respond with the save object

		// insert without no checking for repeated products is being done
		nosql.insert(model);
	});
});