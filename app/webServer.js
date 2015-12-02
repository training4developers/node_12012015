module.exports = function(config) {

	"use strict";

	const
		fs = require("fs"),
		path = require("path"),
		http = require("http"),
		express = require("express"),
		bodyParser = require("body-parser");

	var
		app = express(),
		widgetRouter = express.Router(),
		httpServer = http.createServer(app),
		widgets = [
			{ id: 1, name: "Test Widget 1", color: "blue", size: "large" },
			{ id: 2, name: "Test Widget 2", color: "red", size: "medium" },
			{ id: 3, name: "Test Widget 3", color: "yellow", size: "small" }
		],
		nextWidgetId = widgets.length;

	widgetRouter.route("/widgets")
		.get(function(req, res) {
			res.json(widgets);
		})
		.post(function(req, res) {
			req.body.id = ++nextWidgetId;
			widgets.push(req.body);
			res.json({ newWidgetId: req.body.id });
		});

	widgetRouter.route("/widgets/:widgetId")
		.get(function(req, res) {
			res.json(widgets.filter(function(widget) {
				return widget.id === parseInt(req.params.widgetId, 10);
			})[0]);
		})
		.put(function(req, res) {

			var widgetToUpdate = widgets.filter(function(widget) {
				return widget.id === parseInt(req.params.widgetId, 10);
			})[0];

			widgetToUpdate.name = req.body.name;
			widgetToUpdate.color = req.body.color;
			widgetToUpdate.size = req.body.size;

			res.status(200).end();

		})
		.delete(function(req, res) {

			var widgetToDelete = widgets.filter(function(widget) {
				return widget.id === parseInt(req.params.widgetId, 10);
			})[0];

			var indexOfWidgetToDelete = widgets.indexOf(widgetToDelete);

			widgets.splice(indexOfWidgetToDelete, 1);
			res.status(200).end();
		});

	app.use("/api", bodyParser.json());
	app.use("/api", widgetRouter);

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
