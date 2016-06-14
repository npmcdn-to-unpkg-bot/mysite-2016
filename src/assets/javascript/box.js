
(function box() {

	var boxes = document.querySelectorAll(".boxPreview");
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
		if( this.parentElement.querySelector(".boxFull_inner").offsetHeight > window.innerHeight ) {
			this.parentElement.classList.add("boxFull-stickToTop");
		} else {
			this.parentElement.classList.remove("boxFull-stickToTop");
		}
		this.parentElement.classList.toggle("box_item--open");
		document.body.classList.toggle("body-boxItem-open");

		this.parentElement.querySelector(".box_image").addEventListener("click", closeBox);
	}

	function closeBox() {
		document.body.classList.remove("body-boxItem-open");
		var openBoxes = document.querySelectorAll(".box_item--open");
		for (var i = 0; i < openBoxes.length; i++) {
			if(openBoxes[i] != this) {
				openBoxes[i].classList.remove("box_item--open");
			}
		}
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
			document.body.classList.remove("body-boxItem-open");
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

}())
