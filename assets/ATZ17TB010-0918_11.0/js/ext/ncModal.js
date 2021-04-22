(function($){
	$.fn.ncModal = function(options){
		var defaults = $.extend({
			width : 800, // default width
			height: 500, // default height
			zIndex: null, // zindex for the cover element
			bgcolor: 'rgba(1,1,1,0.9)', // color of the cover element
			closeBtn: '.ncModal--close', // selector of close button
			appendTo: '#wrapper', // selector of object for appending cover element

		/** magic number for layout **/
			paddingTop: 20,
			paddingRight: 30,
			paddingBottom: 20,
			paddingLeft: 30,
			maxWidth: 920,
			maxHeight: 610,
		}, options);

		var w = defaults.paddingLeft + defaults.paddingRight;
		var h = defaults.paddingTop + defaults.paddingBottom;
		var getMaxZIndex = function(){
			var maxZIndex = 0;
			var defaultView = document.defaultView;
			var func = function(selector){
				var elements = $(selector);
				for (var i=0; i< elements.length; i++){
					var element = elements[i];
					var curZIndex = element.style.zIndex;
					if (!curZIndex) {
						var css = element.currentStyle || defaultView.getComputedStyle(element, null);
						curZIndex = css ? css.curZIndex : 0;
					}
					curZIndex = curZIndex+0;
					if(maxZIndex < curZIndex) maxZIndex = curZIndex;
				}
			};
			if(arguments.length == 0){
				func('*');
			} else {
				for(var i = 0; i < arguments.length; i++){
					func(arguments[i]);
				}
			}
			return maxZIndex;
		};

		this.each(function(){
			var settings = {
				width: parseInt( $(this).attr('data-width') ) || defaults.width,
				height: parseInt( $(this).attr('data-height') ) || defaults.height,
				bgcolor: $(this).attr('data-bgcolor') || defaults.bgcolor,
				closeBtn: $(this).attr('data-close') || defaults.closeBtn,
				appendTo: $(this).attr('data-append-to') || defaults.appendTo,
				content: $(this).attr('data-content-id')
			};
			$('#'+settings.content).hide();
			$(this).bind('click touchend', function(e){
				
				if( $('#ncModal-wrapper-'+settings.content)[0] ||
					!$('#'+settings.content)[0]){
					return;
				}

				settings.zIndex = $(this).attr('data-z-index') || defaults.zIndex || getMaxZIndex()+1;
				var $content = $('#'+settings.content).clone();
				var elm = $('<div>', {
					id: 'ncModal-wrapper-'+settings.content,
					class: 'ncModal-wrapper',
					css: {
						width: '100%',
						height: '100%',
						backgroundColor: settings.bgcolor,
						overflow: 'hidden',
						position: 'absolute',
						top : 0,
						left: 0,
						zIndex: settings.zIndex,
					}
				})
				.appendTo(settings.appendTo);
				$content.show().css({
					opacity:1,
					width : (Math.min(settings.width, defaults.maxWidth) - w) + 'px',
					height: (Math.min(settings.height, defaults.maxHeight) - h) + 'px',
					zIndex: settings.zIndex + 1,
					paddingLeft: defaults.paddingLeft+'px',
					paddingRight: defaults.paddingRight+'px',
					paddingBottom: defaults.paddingBottom+'px',
					paddingLeft: defaults.paddingLeft+'px',
				})
				.appendTo(settings.appendTo);
				$content.find(settings.closeBtn).bind('click touchend', function(e){
						elm.remove();
						$content.remove();
					}
				);
			});
		});
	};
})(jQuery);

