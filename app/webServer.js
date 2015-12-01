module.exports = function(config) {

	"use strict";

	const
		fs = require("fs"),
		path = require("path"),
		http = require("http"),
		express = require("express");

	var
		app = express(),
		httpServer = http.createServer(app);

	app.use(express.static(config.webServer.rootFolder));

	return {
		// start: function(callback) {
		// 	httpServer.listen(config.webServer.port, callback);
		// },
		start: function() {
			return new Promise(function(resolve, reject) {
				httpServer.listen(config.webServer.port, function(err) {
					err ? reject(err) : resolve();
				});
			});
		}
	};

}
