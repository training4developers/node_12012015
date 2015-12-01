"use strict";

const
	appConfig = require("./app/appConfig"),
	webServer = require("./app/webServer");

appConfig.getConfig().then(function(config) {

	var appServer = webServer(config);
	appServer.start().then(function() {
		console.log("web server started on port " + config.webServer.port);
	});

});
