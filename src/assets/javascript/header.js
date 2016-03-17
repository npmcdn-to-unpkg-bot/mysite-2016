(function header() {

    var max_scroll = 50,
        subnav = document.querySelector('.sub-nav');

    window.addEventListener('scroll', fixNav);

    function fixNav() {

        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if (scrollTop > max_scroll && !subnav.classList.contains('.filterbuttonFixed')) {
            subnav.classList.add('filterbuttonFixed');

        } else if (scrollTop < max_scroll && subnav.classList.contains('.filterbuttonFixed')) {
            subnav.classList.remove('filterbuttonFixed');

        }
    }

})();
