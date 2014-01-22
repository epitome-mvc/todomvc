define(function(require){
	'use strict';

	var epik = require('epik/index'),
		primish = epik.primish,
		view = require('epik/view'),
		rivets = require('epik/plugins/rivets-adapter'),
		template = require('text!../../templates/stats-view.tpl');

	/**
	 * @description todo model defaults.
	 */
	return primish({

		implement: rivets,

		extend: view,

		options: {
			template: template
		},

		map: {

		},

		constructor: function(options){
			this.parent('constructor', options);
		},

		destroy: function(){
			this.unbindRivets();
			this.parent('destroy');
		},

		attachEvents: function(){
			var model = this.model;
			this.$element.html(this.options.template);


			this.rivets.formatters.plural = function(value){
				return value == 1 ? '' : 's';
			};

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
		},

		showCurrent: function(item){
			item || (item = 'all');
			this.$element.find('a.selected').removeClass('selected');
			this.$element.find('a.' + item).addClass('selected');
		}

	});

});
