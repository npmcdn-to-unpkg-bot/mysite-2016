"use strict";

function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || html.clientHeight) && rect.right <= (window.innerWidth || html.clientWidth);
}
function enteredViewport(element) {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  return rect.top >= 0 && rect.top <= (window.innerHeight || html.clientHeight) || rect.bottom >= 0 && rect.bottom <= (window.innerHeight || html.clientHeight);
}

function once(fn, context) {
  var result;

  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }

    return result;
  };
}
'use strict';

/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

if (typeof Cache === "function") {
  if (!Cache.prototype.addAll) {
    Cache.prototype.addAll = function addAll(requests) {
      var cache = this;

      // Since DOMExceptions are not constructable:
      function NetworkError(message) {
        this.name = 'NetworkError';
        this.code = 19;
        this.message = message;
      }
      NetworkError.prototype = Object.create(Error.prototype);

      return Promise.resolve().then(function () {
        if (arguments.length < 1) throw new TypeError();

        // Simulate sequence<(Request or USVString)> binding:
        var sequence = [];

        requests = requests.map(function (request) {
          if (request instanceof Request) {
            return request;
          } else {
            return String(request); // may throw TypeError
          }
        });

        return Promise.all(requests.map(function (request) {
          if (typeof request === 'string') {
            request = new Request(request);
          }

          var scheme = new URL(request.url).protocol;

          if (scheme !== 'http:' && scheme !== 'https:') {
            throw new NetworkError("Invalid scheme");
          }

          return fetch(request.clone());
        }));
      }).then(function (responses) {
        // TODO: check that requests don't overwrite one another
        // (don't think this is possible to polyfill due to opaque responses)
        return Promise.all(responses.map(function (response, i) {
          return cache.put(requests[i], response);
        }));
      }).then(function () {
        return undefined;
      });
    };
  }
}
"use strict";

// ;(function(){
window.addEventListener("DOMContentLoaded", function () {
  if (typeof TweenMax === "function") {
    var elemsInbetween, elGalleryImage, listInbetween;
    var animateInbetweenBackgroundHeading;
    var animateGalleryImage;

    (function () {
      var onScrollAnimateBackgroundHeading = function onScrollAnimateBackgroundHeading() {
        listInbetween.forEach(function (el, index) {
          if (enteredViewport(el)) {
            TweenMax.from(el.querySelector(".homeBackground_heading"), 1.4, { opacity: 0, y: -40, ease: Power2.easeOut, delay: 0.5 });
            window.removeEventListener("scroll", onScrollAnimateBackgroundHeading);
            // animateInbetweenBackgroundHeading(el);
          }
        });
      };

      var turtleCallback = function turtleCallback() {
        // Runs after TurtleJS
        // Initiates animation when in view
        console.log("TurtleJS finished");
        var elGalleryImages = document.querySelectorAll(".homePhoto_gallery img");
        elGalleryImages = Array.prototype.slice.call(elGalleryImages, 0);

        elGalleryImages.forEach(function (element, index) {
          if (isInViewport(element)) {
            animateGalleryImage();
          }
        });

        // window.addEventListener("scroll", animateGallery);

        var waypoint = new Waypoint({
          element: document.querySelector(".homePhoto_gallery"),

          handler: function handler(direction) {
            console.log("Trigger waypoints " + direction);
            // notify(this.element.id + ' triggers at ' + this.triggerPoint);
            var elGalleryImages = document.querySelectorAll(".homePhoto_gallery img");
            for (var i = 0; i < elGalleryImages.length; i++) {
              elGalleryImages[i].style.willChange = "transform";
            }
            animateGalleryImage();
            // window.removeEventListener("scroll", animateGallery);
          },
          offset: '25%'
        });
      };

      elemsInbetween = document.querySelectorAll(".homeBackground");
      elGalleryImage = document.querySelector(".homePhoto_gallery img");
      listInbetween = Array.prototype.slice.call(elemsInbetween, 0);


      window.addEventListener("DOMContentLoaded", function () {
        TweenMax.fromTo(".homeIntro_textWelcome", 3, { y: -70, delay: 0.5 }, { opacity: 1, y: 0, ease: Back.easeOut });
        TweenMax.to(".homeIntro_background", 40, { scale: 1.2, ease: Power0.easeOut, delay: 1.5 });

        window.addEventListener("scroll", onScrollAnimateBackgroundHeading);
      });

      animateInbetweenBackgroundHeading = once(function (el) {
        TweenMax.from(el.querySelector(".homeBackground_heading"), 1.4, { opacity: 0, y: -40, ease: Power2.easeOut, delay: 0.5 });
      });
      animateGalleryImage = once(function () {
        var elBackgroundHeading = document.querySelectorAll(".homePhoto_gallery img");
        TweenMax.to(elBackgroundHeading, 3, { scale: 1, ease: Power4.easeOut, delay: 0 });
      });


      window.addEventListener("DOMContentLoaded", function (turtle) {
        turtle.init(turtleCallback);
        if (document.querySelector("[walnut-script]") instanceof HTMLElement) {
          walnut.init();
        }
      }(turtle));

      ;
    })();
  } // End if TweenLite
  // }
}());
"use strict";

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
		if (this.parentElement.querySelector(".boxFull_inner").offsetHeight > window.innerHeight) {
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
			if (openBoxes[i] != this) {
				openBoxes[i].classList.remove("box_item--open");
			}
		}
	}

	function mediaQuery() {
		if (window.innerWidth < 600) {
			if (localStorage.box_has_event === "false") {
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
		morebtn[i].addEventListener("click", function () {
			location.href = this.href;
		});
	}
})();
"use strict";

if (typeof Array.prototype.indexOf !== 'function') {
  Array.prototype.indexOf = function (item) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === item) {
        return i;
      }
    }
    return -1;
  };
}

window._ = function () {

  function aquery(elems) {
    for (var i = 0; i < elems.length; i++) {
      this[i] = elems[i];
    }
    this.length = elems.length;
  }

  aquery.prototype = {
    map: function map(callback) {
      var results = [],
          i = 0;
      for (; i < this.length; i++) {
        results.push(callback.call(this, this[i], i));
      }
      return results;
    },
    forEach: function forEach(callback) {
      this.map(callback);
      return this;
    },
    addEvent: function addEvent(evnt, func) {
      if (document.addEventListener) {
        return function (evt, fn) {
          return this.forEach(function (el) {
            el.addEventListener(evt, fn, false);
          });
        };
      } else if (document.attachEvent) {
        return function (evt, fn) {
          return this.forEach(function (el) {
            el.attachEvent("on" + evt, fn);
          });
        };
      } else {
        return function (evt, fn) {
          return this.forEach(function (el) {
            el["on" + evt] = fn;
          });
        };
      }
    },
    removeEvent: function removeEvent(event, func) {
      if (this.removeEventListener) {
        // For all major browsers, except IE 8 and earlier
        this.removeEventListener(event, func);
      } else if (this.detachEvent) {
        // For IE 8 and earlier versions
        this.detachEvent('on' + event, func);
      }
    }
  };

  var _ = {
    get: function get(selector) {
      var elems;
      if (typeof selector === "string") {
        elems = document.querySelectorAll(selector);
      } else if (selector.length) {
        elems = selector;
      } else {
        elems = [selector];
      }
      return new aquery(elems);
    }
  };

  return _;
}();
"use strict";

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

    function getFlickrImages() {}

    function get500pxImages() {}
})();
"use strict";

(function siteNav(argument) {
	var elem = document.querySelector(".siteNav_menu");

	function click() {
		elem.addEventListener("click", toggleActive);
	}

	function toggleActive(e) {
		document.body.classList.toggle("siteNav-mobile--active");
	}

	click();
})();
'use strict';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function (err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
} else {
  console.log('No support for service worker');
}
"use strict";

if (document.querySelector(".subNav") instanceof HTMLElement) {

	(function subNav() {

		window.addEventListener("resize", function () {
			calcStartPosition();
		});

		var max_scroll = 0,
		    subnav = document.querySelector(".subNav");

		calcStartPosition();

		if (document.querySelector('.subNav') instanceof HTMLElement) {
			window.addEventListener('scroll', onScroll);
		}

		function calcStartPosition() {
			var body = document.body.getBoundingClientRect(),
			    elemRect = subnav.getBoundingClientRect(),
			    offset = elemRect.top - body.top;
			max_scroll = offset;
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
			if (!ticking) {
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

		var items = _.get(".anchor-link");

		for (var i = 0; i < items.length; i++) {

			items[i].addEventListener("click", function (e) {
				var href = this.href;
				href = href.split("/");
				href = href[href.length - 1];
				var elem = _.get(href)[0];
				// var y = elem.getBoundingClientRect().top;

				var bodyRect = document.body.getBoundingClientRect(),
				    elemRect = elem.getBoundingClientRect(),
				    offset = elemRect.top - bodyRect.top;

				e.preventDefault();
				TweenLite.to(window, 2, { scrollTo: { y: offset }, ease: Power4.ease });
			});
		}
	})();
}
"use strict";
//# sourceMappingURL=main.js.map
