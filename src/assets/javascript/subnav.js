
(function subNav() {

	window.addEventListener("resize", function () {
		 calcStartPosition();
	});

	var max_scroll = 0,
		subnav = document.querySelector(".sub-nav");

	calcStartPosition();


	if (document.querySelector('.sub-nav') instanceof HTMLElement) {
	    window.addEventListener('scroll', onScroll);
	}

	function calcStartPosition() {
		var body = document.body.getBoundingClientRect(),
		    elemRect = subnav.getBoundingClientRect(),
		    offset   = elemRect.top - body.top;
		    max_scroll = offset;
	}

	function fixNav() {

	    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

	    if (scrollTop > max_scroll && !subnav.classList.contains('subNavFixed')) {
	        subnav.classList.add('subNavFixed');

	    } else if (scrollTop < max_scroll && subnav.classList.contains('subNavFixed')) {
	        subnav.classList.remove('subNavFixed');

	    }
	}

	var latestKnownScrollY = 0,
		ticking = false;

	function onScroll() {
		latestKnownScrollY = window.scrollY;
		requestTick();
	}

	function requestTick() {
		if(!ticking) {
			requestAnimationFrame(update);
		}
		ticking = true;
	}

	function update() {
		// reset the tick so we can
		// capture the next onScroll
		ticking = false;

		var currentScrollY = latestKnownScrollY;

		fixNav();

		// read offset of DOM elements
		// and compare to the currentScrollY value
		// then apply some CSS classes
		// to the visible items
	}


	var items = _.get(".sub-nav__item a");

	for (var i = 0; i < items.length; i++) {

		items[i].addEventListener("click", function(e) {
			var href = this.href;
			href = href.split("/");
			href = href[href.length-1];
			var elem = _.get(href)[0];
			// var y = elem.getBoundingClientRect().top;

			var bodyRect = document.body.getBoundingClientRect(),
			    elemRect = elem.getBoundingClientRect(),
			    offset   = elemRect.top - bodyRect.top;

			e.preventDefault();
			TweenLite.to(window, 2, {scrollTo:{y:offset}, ease:Power2.ease});
		});
	}


})();


