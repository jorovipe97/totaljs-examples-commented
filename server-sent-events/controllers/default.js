exports.install = function() {
	F.route('/');
	F.route('/one-way-messaging/', view_SSE, ['sse']); // sse: Server-Sent Event
};

function view_SSE() {

	var self = this;
	var indexer = 0;
	// self.sseID: Gets the lastEventID (only for Server Sent Events).
	var counter = parseInt(self.sseID || '0');

	console.log('Last event ID:', self.sseID);

	var interval = setInterval(function() {
		// if no conected clear interval
		if (!self.isConnected) {
			clearInterval(interval);
			return;
		}

		/*
			Send data to client - One way messaging

			@data {String or Object}
			@eventname {String} :: default null
			@id {String} :: default null (Last Event ID)
			@retry {Number} :: in milliseconds, default config['default-request-timeout']

			controller.sse(data, [eventname], [id], [retry])
		*/
		self.sse({ counter: counter++, message: utils.GUID(10) }, null, counter);

		// reconnect by the @retry
		indexer++;
		if (indexer > 10) {
			clearInterval(interval);
			self.close();
		}

	}, 1000);

	/*
	self.res.on('close', function() {
		console.log('CLIENT DISCONNECT');
	});
	*/

}