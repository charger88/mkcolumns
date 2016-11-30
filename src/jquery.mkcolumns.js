/*
MKColumns v1.0.0
Copyright (c) 2016 Mikhail Kelner
Released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
(function($){
    jQuery.fn.mkcolumns = function(options){
        var options = $.extend({
		
        }, options);
		var make = function(){
			if (!window.mkcolumnselements){
				window.mkcolumnselements = [];
				$(window).on('scroll', calculateColumns);
			}
			window.mkcolumnselements.push($(this));
		};
		var calculateColumns = function(){
			$.each(window.mkcolumnselements, function(i, element){
				var heights = [];
				var maxHeight = 0;
				var baseColumn = -1;
				element.find('> *').each(function(i){
					if ($(this).data('role') == 'base'){
						baseColumn = i;
					}
					heights[i] = $(this).outerHeight();
					if (heights[i] > maxHeight){
						maxHeight = heights[i];
					}
				});
				if (baseColumn >= 0){
					maxHeight = heights[baseColumn];
				}
				if (maxHeight > 0){
					var scrollPosition = $(window).scrollTop();
					var elementStart = element.offset().top;
					var elementEnd = elementStart + maxHeight;
					element.find('> *').each(function(i){
						if (heights[i] > $(window).height()){
							var prc = (scrollPosition > elementStart) ? ((scrollPosition - elementStart) / (maxHeight - $(window).height())) : 0;
							if (prc > 1){
								prc = 1;
							}
							var pos = prc * (maxHeight - heights[i]);
						} else {
							var pos = scrollPosition - elementStart;
							if (pos < 0) {
								pos = 0;
							}
							if (elementEnd < (scrollPosition + heights[i])){
								pos = maxHeight - heights[i];
							}
						}
						$(this).css('margin-top', pos + 'px');
					});
				}
			});
		};
		return this.each(make);
	};
})(jQuery);