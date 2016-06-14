;(function(){

  if(typeof TweenMax === "function") {

  var elemsInbetween  = document.querySelectorAll(".homeBackground"),
      elGalleryImage  = document.querySelector(".homePhoto_gallery img"),
      listInbetween   = Array.prototype.slice.call(elemsInbetween,0);

  window.addEventListener("load", function () {
    TweenMax.fromTo(".homeIntro_textWelcome", 3, {y: -70, delay: 0.5}, { opacity: 1, y:0, ease:Back.easeOut });
    TweenMax.to(".homeIntro_background", 40, {scale: 1.2, ease:Power0.easeOut, delay: 1.5});

    window.addEventListener("scroll", onScrollAnimateBackgroundHeading);
  });

  function onScrollAnimateBackgroundHeading(){
    listInbetween.forEach(function(el, index) {
      if( enteredViewport(el) ) {
        TweenMax.from(el.querySelector(".homeBackground_heading"), 1.4, {opacity: 0, y: -40, ease:Power2.easeOut, delay: 0.5});
        window.removeEventListener("scroll", onScrollAnimateBackgroundHeading);
        // animateInbetweenBackgroundHeading(el);
      }
    });
  }

  var animateInbetweenBackgroundHeading = once(function(el) {
    TweenMax.from(el.querySelector(".homeBackground_heading"), 1.4, {opacity: 0, y: -40, ease:Power2.easeOut, delay: 0.5});
  });

  var animateGalleryImage = once(function() {
    var elBackgroundHeading = document.querySelectorAll(".homePhoto_gallery img");
    TweenMax.to(elBackgroundHeading, 3, {scale: 1, ease:Power4.easeOut, delay: 0});
  });

  ;(function(){
    window.addEventListener("load", function () {
      turtle.init(func);
      if(document.querySelector("[walnut-script]") instanceof HTMLElement) {
        walnut.init();
      }

      function func() {
        // Runs after TurtleJS
        // Initiates animation when in view
        var elGalleryImages = document.querySelectorAll(".homePhoto_gallery img");
        elGalleryImages = Array.prototype.slice.call(elGalleryImages,0);

        elGalleryImages.forEach( function(element, index) {
          if(isInViewport(element)) {
            animateGalleryImage();
          }
        });

        window.addEventListener("scroll", animateGallery);

        function animateGallery(){
          var elGalleryImages = document.querySelectorAll(".homePhoto_gallery img");
          for (var i = 0; i < elGalleryImages.length; i++) {
            elGalleryImages[i].style.willChange = "transform";
          }

          if(isInViewport(elGalleryImages[0])) {
            animateGalleryImage();
            window.removeEventListener("scroll", animateGallery);
          }
        }
       };
    });
  })();

  }

})();





