var Fs = require('fs');

exports.install = function() {
	F.route('/', view_index);
};


// function* is a Generator function.
// Generators are functions which can be exited and later re-entered. Their context (variable bindings) will be saved across re-entrances.
// They are like coroutines in unity.

/*
Generators in JavaScript -- especially when combined with Promises --
are a very powerful tool for asynchronous programming as they mitigate --
if not entirely eliminate -- the problems with callbacks, such as
Callback Hell and Inversion of Control. 
*/
function *view_index() {
	var self = this;
	// https://docs.totaljs.com/latest/en.html#api~global~sync
	var users = yield sync(Fs.readFile)(F.path.databases('users.json'));
	users = JSON.parse(users.toString('utf8'));
	self.view(users);
}