define(function(require){
	'use strict';

	var epik = require('epik/index'),
		primish = epik.primish,
		router = require('epik/router');

	return primish({

		extend: router,

		map: {
			active: false,
			completed: true
		}
	});

});
