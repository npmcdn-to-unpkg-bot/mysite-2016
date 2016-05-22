
(function box() {

	var boxes = document.querySelectorAll(".box_item");
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

		// if (localStorage.clicked_box === this.href) {
		// 	window.location.href = this.href;
		// } else {
		// 	localStorage.clicked_box = this.href;
		// }
		var openBoxes = document.querySelectorAll(".box_item--open");
		for (var i = 0; i < openBoxes.length; i++) {
			if(openBoxes[i] != this) {
				openBoxes[i].classList.remove("box_item--open");
			}
		}
		this.classList.add("box_item--open");
		this.removeEventListener("click", openBox);
	}

	function mediaQuery () {
		if (window.innerWidth < 600) {
			if(localStorage.box_has_event === "false") {
				localStorage.box_has_event = "true";
				init();
			}

		} else {
			deinit();
			localStorage.box_has_event = "false";
		}
	}

	window.addEventListener('resize', mediaQuery);
	window.addEventListener('orientationchange', mediaQuery);
	mediaQuery();


	var morebtn = document.querySelectorAll(".box_moreBtn");

	for (var i = 0; i < morebtn.length; i++) {
		morebtn[i].addEventListener("click", function() {
 			location.href = this.href;
		});
	}

	// var boxesContent = document.querySelectorAll(".box_content");

	// for (var i = 0; i < boxesContent.length; i++) {
	// 	boxesContent[i].addEventListener("click", function(e) {
 // 			e.preventDefault();
	// 	});
	// }


}())
