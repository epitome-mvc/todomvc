define(function(require){
	'use strict';

	var epik = require('epik/index'),
		primish = epik.primish,
		model = require('epik/model');

	/**
	 * @description todo model defaults.
	 */
	return primish({

		extend: model,

		defaults: {
			completed: false,
			title: ''
		},

		constructor: function(data, options){
			this.parent('constructor', data, options);
			this.set('id', +new Date());
		}

	});

});
