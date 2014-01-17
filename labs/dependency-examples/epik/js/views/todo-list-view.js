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
			var collection = this.collection,
				self = this;

			// filter works through collection
			this.rivets.formatters.filter = function(items){
				return collection.filters == null ? items : items.filter(function(item){
					return collection.filters === item.get('completed');
				});
			};

			this.bindRivets(this);

			collection.on('change add remove reset empty sort', function(){
				collection.store();
				self.resetToggler();
			});
		},

		edit: function(event, context){
			context.item.editing = !context.item.editing;
		},

		remove: function(event, context){
			context.collection.remove(context.item);
		},

		keypress: function(event){
			event && 13 == (event.charCode || event.keyCode) && this.blur();
		},

		resetToggler: function(){
			this.toggleStatus = this.collection.every(function(item){
				return item.get('completed');
			});
		},

		toggler: function(element, context){
			var type = !!element.currentTarget.checked;
			context.collection.forEach(function(item){
				item.set('completed', type);
			});
		}

	});

});
