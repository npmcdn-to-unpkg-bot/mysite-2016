// function onScroll (evt) {

//   // Store the scroll value for laterz.
//   var lastScrollY = window.scrollY;

//   // Prevent multiple rAF callbacks.
//   if (scheduledAnimationFrame) {
//     return;
//   }

//   var scheduledAnimationFrame = true;
//   requestAnimationFrame(evt);
// }

(function gallery() {

    function getFlickrImages() {

    }

    function get500pxImages() {

    }

})();

(function check_if_user_has_visited_before() {

	var start = _.get('.startscreen')[0];
	if (start instanceof HTMLElement) {
		if (typeof(Storage) !== 'undefined') {

		    if (localStorage.hasVisitedBefore) {

		        start.style.display = 'none';

		    } else {
		        localStorage.hasVisitedBefore = true;

		    }

		} else {
		    // Sorry! No Web Storage support..
		}
	}



})();
