(function subNav() {

	var max_scroll = 50,
		subnav = document.querySelector('.sub-nav');

	if (document.querySelector('.sub-nav') instanceof HTMLElement) {
	    window.addEventListener('scroll', onScroll);

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


})();

