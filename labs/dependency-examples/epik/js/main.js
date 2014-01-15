require.config({
	paths: {
		epik: '../bower_components/epik/lib',
		primish: '../bower_components/primish',
		lodash: '../bower_components/lodash/dist/lodash',
		slicker: '../bower_components/slicker/index',
		rivets: '../bower_components/rivets/dist/rivets',
		jquery: '../bower_components/jquery/jquery',
		'rivets-adapter': 'epik/plugins/rivets-adapter',
		text: '../bower_components/requirejs-text/text'
	},
	urlArgs: 'b=' + +new Date
});


define(function(require){
	'use strict';

	var TodoCollection = require('collections/todo-collection'),
		TodoList = require('views/todo-list-view'),
		TodoNewItemView = require('views/todo-newitem-view'),
		TodoStatsView = require('views/todo-stats-view'),
		model = require('epik/model');

	var todos = new TodoCollection(null, {
		id: 'todos'
	});

	todos.set(todos.retrieve() || []);

	var listview = new TodoList({
		collection: todos,
		element: '#main'
	});

	var newItem = new model();

	var appview = new TodoNewItemView({
		model: newItem,
		element: '#header',
		'onModel:change:title': function(){
			todos.add(newItem.toJSON());
			newItem.destroy();
		}
	});

	var statsview = new TodoStatsView({
		collection: todos,
		model: new model({
			remaining: todos.filter(function(item){ return !item.get('completed')}).length,
			completed: todos.filter(function(item){ return item.get('completed')}).length
		}),
		element: '#footer'
	});

});