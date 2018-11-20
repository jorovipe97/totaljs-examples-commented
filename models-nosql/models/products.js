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

		// insert without no checking for repeated products is being done
		nosql.insert(model);
	});
});