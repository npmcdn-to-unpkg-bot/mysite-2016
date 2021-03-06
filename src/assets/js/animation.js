
window.addEventListener("DOMContentLoaded", (function () {
  if(typeof TweenMax === "function") {

    var elemsInbetween  = document.querySelectorAll(".homeBackground"),
        elGalleryImage  = document.querySelector(".homePhoto_gallery img"),
        listInbetween   = Array.prototype.slice.call(elemsInbetween,0);

    TweenMax.fromTo(".homeIntro_textWelcome", 3, {y: -70, delay: 0.5}, { opacity: 1, y:0, ease:Back.easeOut });
    TweenMax.to(".homeIntro_background", 40, {scale: 1.2, ease:Power0.easeOut, delay: 1.5});

    window.addEventListener("scroll", onScrollAnimateBackgroundHeading);

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

    window.addEventListener("DOMContentLoaded", (function (turtle) {
      if(document.querySelector("[walnut-script]") instanceof HTMLElement) {
        walnut.init();
      }
    })(turtle));

    imagesLoaded( document.querySelector('.homePhoto_gallery'), function( instance ) {
      console.log('all images are loaded');
      turtle.init(turtleCallback);
    });

    function turtleCallback() {
      // Runs after TurtleJS
      // Initiates animation when in view
      console.log("TurtleJS finished");
      var elGalleryImages = document.querySelectorAll(".homePhoto_gallery img");
      elGalleryImages = Array.prototype.slice.call(elGalleryImages,0);

      elGalleryImages.forEach( function(element, index) {
        if(isInViewport(element)) {
          animateGalleryImage();
        }
      });

      // window.addEventListener("scroll", animateGallery);

      var waypoint = new Waypoint({
        element: document.querySelector(".homePhoto_gallery"),

        handler: function(direction) {
          // console.log("Trigger waypoints " + direction);
          // notify(this.element.id + ' triggers at ' + this.triggerPoint);
          var elGalleryImages = document.querySelectorAll(".homePhoto_gallery img");
          for (var i = 0; i < elGalleryImages.length; i++) {
            elGalleryImages[i].style.willChange = "transform";
          }
          animateGalleryImage();
          // window.removeEventListener("scroll", animateGallery);
        },
        offset: "200"
      });

     };


  } // End if TweenLite

})());




