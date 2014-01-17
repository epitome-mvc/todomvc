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
	return primish('todos', {

		extend: collection,

		// enable storage methods, namespaced as collection.
		implement: [storage.localStorage()],

		// base model class prototype
		model: model,

		constructor: function(models, options){
			this.filters = null;
			this.parent('constructor', models, options);
			var data = this.retrieve();
			data && this.set(data);
		}
	});

});
