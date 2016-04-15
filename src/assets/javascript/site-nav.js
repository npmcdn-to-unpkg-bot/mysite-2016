(function siteNav (argument) {
	var elem = document.querySelector(".site-nav__menu");


	function click() {
		elem.addEventListener("click", toggleActive);
	}

	function toggleActive (e) {
		document.body.classList.toggle("site-nav-mobile--active");
	}

	click();
}());
