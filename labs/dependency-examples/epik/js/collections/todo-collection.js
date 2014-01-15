define(function(require){
	'use strict';

	var epik = require('epik/index'),
		primish = epik.primish,
		model = require('models/todo-model'),
		storage = require('epik/storage'),
		collection = require('epik/collection');

	/**
	 * @description collection of todo models.
	 */
	return primish({

		extend: collection,

		// enable storage methods, namespaced as collection.
		implement: [storage.sessionStorage()],

		// base model class prototype
		model: model
	});

});
