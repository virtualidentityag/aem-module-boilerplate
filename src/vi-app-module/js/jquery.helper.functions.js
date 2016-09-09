/*global $, window, jQuery*/
/*jslint browser:true, devel:true */

/*!
 * These functions extend the global jQuery object
 * and add methods that we need throughout our plugins
 */

;(function( $, window, document, undefined ) {

	'use strict';

	// Detect media queries support
	if (!$.hasOwnProperty('mediaQuerySupport')) {

		// Append a style rule to the <head> element
		$('<style>@media all and (min-width:1px) { .mediatest {position:absolute} }</style>').appendTo($('head'));

		var d = document.createElement('div');
		d.className = 'mediatest';
		document.body.appendChild(d);

		if(window.getComputedStyle && window.getComputedStyle(d).position == 'absolute') {
			$.mediaQuerySupport = true;
		} else {
			$.mediaQuerySupport = false;
		}
		document.body.removeChild(d);
	}

	// Debounce function
	// Source: https://davidwalsh.name/javascript-debounce-function
	if (!$.isFunction($.viDebounce)) {
		$.viDebounce = function(func, wait, immediate) {
			var timeout;
		    return function() {
		        var context = this, args = arguments;
		        clearTimeout(timeout);
		        timeout = setTimeout(function() {
		            timeout = null;
		            if (!immediate) {
						func.apply(context, args);
					}
		        }, wait);
		        if (immediate && !timeout) {
					func.apply(context, args);
				}
		    };
		};
	}

}(jQuery, window, document));
