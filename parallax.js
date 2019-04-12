//Kobe Chang Edit: I added two function arguments to this script: widthLimit and staticOffset
// widthLimit: stops parallax scrolling when the viewer width is too small
// staticOffset: when hitting the width limit, shift the parallax background y-position down 
(function( $ ){
	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.parallax = function(xpos, speedFactor, outerHeight, widthLimit, staticOffset) {
		var $this = $(this);
		var getHeight;
		var firstTop;
		var paddingTop = 0;
		
		//get the starting position of each element to have parallax applied to it		
		$this.each(function(){
		    firstTop = staticOffset;
		});

		if (outerHeight) {
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		} else {
			getHeight = function(jqo) {
				return jqo.height();
			};
		}
			
		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		if (arguments.length < 4 || widthLimit === null) widthLimit = null;
		if (arguments.length < 5 || staticOffset === null) firstTop = $this.offset().top;
		
		// function to be called whenever the window is scrolled or resized
		function update(){
			var pos = $window.scrollTop();				

			if (widthLimit === null || $window.width() > widthLimit ){
				firstTop = $this.offset().top;
				$this.each(function(){
					var $element = $(this);
					var top = $element.offset().top;
					var height = getHeight($element);
	
					// Check if totally above or totally below viewport
					if (top + height < pos || top > pos + windowHeight) {
						return;
					}
	
					$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
				});

			}else {
				firstTop = staticOffset;
				$this.each(function(){
					var $element = $(this);
					var top = $element.offset().top;
					var height = getHeight($element);
	
					// Check if totally above or totally below viewport
					if (top + height < pos || top > pos + windowHeight) {
						return;
					}
	
					$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * .01) + "px");
				});
			}
			
		}		

		$window.bind('scroll', update).resize(update);
		update();
	};
})(jQuery);