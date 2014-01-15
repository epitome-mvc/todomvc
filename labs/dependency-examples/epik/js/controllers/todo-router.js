define(function(require){
	'use strict';

	var epik = require('epik/index'),
		primish = epik.primish,
		router = require('epik/router');

	return primish({

		extend: router,

		showActiveFilter: function(){
			// fix up the links for current filter
			var self = this;
			jQuery('#filters li a').each(function(link){
				link.set('class', link.get('href') === self.req ? 'selected' : '');
			});
		}
	});

});
