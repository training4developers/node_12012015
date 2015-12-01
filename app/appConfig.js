"use strict";

const
	fs = require("fs"),
	program = require("commander-plus"),
	defaultPort = 8080,
	defaultRootFolder = "./app/www";

var
	appConfig = {};

program
	.version("0.0.1")
	.option("-P, --port [port]", "web server port")
	.option("-F, --folder [folder]", "root folder of web server")
	.option("-C, --config [pathToConfigFile]", "config file of web server")
	.parse(process.argv);

var loadConfig = program.config ? new Promise(function(resolve, reject) {
	fs.readFile(program.config, "utf-8", function (err, data) {
		if (err) {
			reject(err);
			return;
		}
		resolve(JSON.parse(data));
	});
}) : Promise.resolve({
	webServer: {}
});

var configLoaded = loadConfig.then(function(config) {

	appConfig = config;

	if (program.port) {
		appConfig.webServer.port = program.port;
	}

	if (program.folder) {
		appConfig.webServer.rootFolder = program.folder;
	}

	if (!appConfig.webServer.port) {
		appConfig.webServer.port = process.env.PORT || defaultPort;
	}

	if (!appConfig.webServer.rootFolder) {
		appConfig.webServer.rootFolder = process.env.ROOT_FOLDER || defaultRootFolder;
	}

});

module.exports = {
	getConfig: function() {
		return configLoaded.then(function() {
			return appConfig;
		})
	}
};
