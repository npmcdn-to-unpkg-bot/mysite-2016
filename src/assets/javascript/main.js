
(function gallery(){

    function getFlickr() {

    }

})();


(function visited() {

    if(typeof(Storage) !== "undefined") {

        if(localStorage.hasVisitedBefore) {
            var start = _(".startscreen");
            start.style.display = none;
        } else {
            localStorage.hasVisitedBefore = true;
        }

    } else {
        // Sorry! No Web Storage support..
    }

})();
