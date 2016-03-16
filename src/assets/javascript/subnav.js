
if(document.querySelector(".sub-nav") instanceof HTMLElement) {
    (function subNav() {

        var max_scroll = 50,
            subnav = document.querySelector(".sub-nav");

        // window.addEventListener("scroll", function() {
        //     onScroll(fixNav);
        // });
        window.addEventListener("scroll", fixNav);

        function fixNav() {

            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if(scrollTop > max_scroll && !subnav.classList.contains("subNavFixed")) {
                    subnav.classList.add("subNavFixed");

            } else if(scrollTop < max_scroll && subnav.classList.contains("subNavFixed") ) {
                    subnav.classList.remove("subNavFixed");
            }
        }

    })();
}

