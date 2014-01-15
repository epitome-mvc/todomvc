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
			this.parent('constructor', options);
			this.resetToggler();
		},

		destroy: function(){
			this.unbindRivets();
			this.parent('destroy');
		},

		attachEvents: function(){
			var self = this;
			this.bindRivets(this);
			this.collection.on('change add remove reset empty', function(){
				self.collection.store();
				self.resetToggler();
			})
		},

		edit: function(event, context){
			context.item.editing = !context.item.editing;
		},

		remove: function(event, context){
			context.collection.remove(context.item);
		},

		keypress: function(event, context){
			event && 13 == (event.charCode || event.keyCode) && this.blur();
		},

		resetToggler: function(){
			this.toggleStatus = this.collection.every(function(item){
				return item.get('completed');
			})
		},

		toggler: function(element, context){
			var type = !!element.currentTarget.checked;
			context.collection.forEach(function(item){
				item.set('completed', type);
			});
		}

	});

});
