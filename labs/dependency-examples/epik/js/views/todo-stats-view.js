define(function(require){
	'use strict';

	var epik = require('epik/index'),
		primish = epik.primish,
		view = require('epik/view'),
		rivets = require('epik/plugins/rivets-adapter');

	/**
	 * @description todo model defaults.
	 */
	return primish({

		implement: rivets,

		extend: view,

		constructor: function(options){
			this.parent('constructor', options)
		},

		destroy: function(){
			this.unbindRivets();
			this.parent('destroy');
		},

		attachEvents: function(){
			var model = this.model;

			this.bindRivets(this);
			this.collection.on('change reset', function(){
				model.set({
					remaining: this.filter(function(item){ return !item.get('completed')}).length,
					completed: this.filter(function(item){ return item.get('completed')}).length
				});
			});
		},

		keypress: function(event){
			event && 13 == (event.charCode || event.keyCode) && this.blur();
		},

		clear: function(event, context){
			var completed = context.collection.filter(function(item){
				return item.get('completed');
			});

			completed.length && context.collection.remove(completed);
		}

	});

});
