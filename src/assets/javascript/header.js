(function header() {

    var max_scroll = 50;

    // var subnav = _.get(".sub-nav")[0];
    var subnav = document.querySelector(".sub-nav");

    window.addEventListener("scroll", fixNav);

    function fixNav() {

        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if(scrollTop > max_scroll && !subnav.classList.contains(".filterbuttonFixed")) {
                subnav.classList.add("filterbuttonFixed");
                // console.log("go floated");
        }
        else if(scrollTop < max_scroll && subnav.classList.contains(".filterbuttonFixed") ) {
                // console.log("return to normal");
                subnav.classList.remove("filterbuttonFixed");
        }
    }

})();
