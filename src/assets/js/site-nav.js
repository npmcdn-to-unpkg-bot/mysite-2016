(function siteNav (argument) {
	var elem = document.querySelector(".siteNav_menu");


	function click() {
		elem.addEventListener("click", toggleActive);
	}

	function toggleActive (e) {
		document.body.classList.toggle("siteNav-mobile--active");
	}

	click();
}());
