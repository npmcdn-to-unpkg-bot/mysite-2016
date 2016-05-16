TweenLite.from(".homeIntro_textWelcome", 2, {opacity: 0, y: -70, ease:Back.easeOut, delay: 0.5});
TweenLite.to(".homeIntro_background", 40, {scale: 1.2, ease:Power0.easeOut, delay: 1.5});

window.addEventListener("scroll", function(){
	var elBackground = document.querySelector(".homeBackground");
	var elGalleryImage = document.querySelector(".homePhoto_gallery img");

	if(enteredViewport(elBackground)) {
		animateInbetweenBackgroundHeading();
	}
	// if(isInViewport(elGalleryImage)) {
	// 	animateGalleryImage();
	// }

});

var animateInbetweenBackgroundHeading = once(function() {
	var elBackgroundHeading = document.querySelector(".homeBackground h3");
	TweenLite.to(elBackgroundHeading, 4, {scale: 1.2, ease:Power0.easeOut, delay: 0.5});
});

var animateGalleryImage = once(function() {
	var elBackgroundHeading = document.querySelectorAll(".homePhoto_gallery img");
	TweenLite.to(elBackgroundHeading, 2, {scale: 1, ease:Bounce.easeOut, delay: 0});
});



