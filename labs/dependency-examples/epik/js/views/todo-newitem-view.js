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
		},

		edit: function(event, context){

		},


		keypress: function(event, context){
			event && 13 == (event.charCode || event.keyCode) && this.blur();
		}

	});

});
