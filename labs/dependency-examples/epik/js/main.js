require.config({
	paths: {
		epik: '../bower_components/epik/lib',
		'rivets-adapter': '../bower_components/epik/lib/plugins/rivets-adapter',
		primish: '../bower_components/primish',
		lodash: '../bower_components/lodash/dist/lodash',
		slicker: '../bower_components/slicker/index',
		rivets: '../bower_components/rivets/dist/rivets',
		jquery: '../bower_components/jquery/jquery',
		text: '../bower_components/requirejs-text/text'
	},
	bundlesss: {
		'epik/epik-min': [
			'epik/index',
			'epik/model',
			'epik/model-sync',
			'epik/collection',
			'epik/collection-sync',
			'epik/agent',
			'epik/storage',
			'epik/router',
			'epik/view',
			'epik/plugins/rivets-adapter',
			'slicker'
		]
	}
	//urlArgs: 'b=' + +new Date
});


define(function(require){
	'use strict';

	require('epik/epik-min');

	var TodoCollection = require('collections/todo-collection'),
		TodoList = require('views/todo-list-view'),
		TodoNewItemView = require('views/todo-newitem-view'),
		TodoStatsView = require('views/todo-stats-view'),
		Router = require('routers/todo-router'),
		model = require('epik/model');

	// collection of views
	var todos = new TodoCollection(null, {
		id: 'todos'
	});

	// main list of items view
	var listView = new TodoList({

		collection: todos,

		element: '#main'

	});

	// add new item micro view
	new TodoNewItemView({

		model: new model(),

		element: '#header',

		'onModel:change:title': function(){
			todos.add(this.model.toJSON());
			this.model.destroy();
		}

	});

	// footer stats view
	var statsView = new TodoStatsView({

		collection: todos,

		model: new model({
			remaining: todos.filter(function(item){ return !item.get('completed')}).length,
			completed: todos.filter(function(item){ return item.get('completed')}).length
		}),

		element: '#footer'
	});

	// listen to route changes
	var router = new Router({
		routes: {
			'': 'init',
			'#!/': 'applyFilter',
			'#!/:filter': 'applyFilter'
		},

		onInit: function() {
			// we may want to always have a state
			// this.navigate('#!/');
		},

		onApplyFilter: function(filter) {
			// the filter is being used by the todo collection and view.
			// when false, the whole collection is being passed.
			todos.filters = filter in this.map ? this.map[filter] : null;

			// need to manually force this because of the filter
			listView.syncRivets();

			// also let status know to show current.
			statsView.showCurrent(filter);
		}
	});

});