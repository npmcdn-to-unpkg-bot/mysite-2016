if (typeof Array.prototype.indexOf !== 'function') {
    Array.prototype.indexOf = function (item) {
        for(var i = 0; i < this.length; i++) {
            if (this[i] === item) {
                return i;
            }
        }
        return -1;
    }; 
}

window._ = (function () {
  
    function aquery(elems) {
      for(var i = 0; i < elems.length; i++ ) {
        this[i] = elems[i];
      }
      this.length = elems.length;   
    }

    aquery.prototype = {
      map: function (callback) {
        var results = [], i = 0;
        for ( ; i < this.length; i++) {
          results.push(callback.call(this, this[i], i));
        }
        return results;
      },
      forEach: function (callback) {
          this.map(callback);
          return this; 
      },
      addEvent: function(evnt, func) {
        if (document.addEventListener) {
          return function (evt, fn) {
            return this.forEach(function (el) {
              el.addEventListener(evt, fn, false);
            });
          };
        } else if (document.attachEvent)  {
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
      removeEvent: function(event, func){
          if (this.removeEventListener) {                   // For all major browsers, except IE 8 and earlier
              this.removeEventListener(event, func);
          } else if (this.detachEvent) {                    // For IE 8 and earlier versions
              this.detachEvent('on'+event, func);
          }
      }
    }
     
    var _ = {
        get: function (selector) {
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
}());
