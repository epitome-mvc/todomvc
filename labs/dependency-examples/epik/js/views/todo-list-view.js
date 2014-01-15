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

		destroy: function(){
			this.unbindRivets();
			this.parent('destroy');
		},

		attachEvents: function(){
			this.bindRivets(this);
			this.collection.on('change add remove reset empty', function(){
				console.log('changes?');
				this.store();
			})
		},

		edit: function(event, context){
			context.item.editing = !context.item.editing;
		},

		remove: function(event, context){
			var model = context.collection.getModelById(context.item.id);
			model && context.collection.remove(model);
		},

		keypress: function(event, context){
			event && 13 == (event.charCode || event.keyCode) && this.blur();
		}

	});

});
