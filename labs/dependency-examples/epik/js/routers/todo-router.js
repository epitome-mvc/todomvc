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
			jQuery('#filters li a').each(function(i, $link){
				$link = jQuery($link);
				$link.attr('class', $link.attr('href') === self.req ? 'selected' : '');
			});
		}
	});

});
