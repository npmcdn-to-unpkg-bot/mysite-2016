
(function box() {

	var boxes = document.querySelectorAll(".box__image");
	localStorage.box_has_event = false;
	localStorage.clicked_box = "";

	function init() {
		for (var i = 0; i < boxes.length; i++) {
			boxes[i].addEventListener("click", openBox);
		}
	}
	function deinit() {
		for (var i = 0; i < boxes.length; i++) {
			boxes[i].removeEventListener("click", openBox);
		}
	}


	function openBox(e) {
		e.preventDefault();

		// this.addEventListener("click", function(){
		// 	window.location.href = this.href;
		// });
		if (localStorage.clicked_box === this.href) {
			window.location.href = this.href;
		}else {
			localStorage.clicked_box = this.href;
		}
		var openBoxes = document.querySelectorAll(".box__item--open");
		for (var i = 0; i < openBoxes.length; i++) {
			openBoxes[i].classList.remove("box__item--open");
		}
		this.parentNode.classList.toggle("box__item--open");
	}

	function mediaQuery () {
		if (window.innerWidth < 600) {
			if(localStorage.box_has_event === "false") {
				localStorage.box_has_event = "true";
				init();
				console.log("boxes complete");
			}

		} else {
			deinit();
			localStorage.box_has_event = "false";
		}
	}

	window.addEventListener('resize', mediaQuery);
	window.addEventListener('orientationchange', mediaQuery);
	mediaQuery();


}())
