module.exports = function(grunt) {

	grunt.initConfig({
		webServer: {
			port: 8060,
			rootFolder: "./app/www"
		}
	});

	grunt.registerTask("prepare-files", function() {
		console.log("preparing files...");
	});

	grunt.registerTask("package-files", function(mode) {
		console.log("packaging files... " + mode);
		console.log(grunt.config("webServer"));
	});

	grunt.registerTask("web-server", function() {

		"use strict";

		const
			webServer = require("./app/webServer");

		var appServer = webServer(grunt.config());
		appServer.start().then(function() {
			console.log("web server started on port " + config.webServer.port);
		});

		this.async();
	});

	grunt.registerTask("default",
		["prepare-files", "package-files"]);

};
