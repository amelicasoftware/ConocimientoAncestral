window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("header-acerca-de").style.paddingTop = "0px";
    } else {
        document.getElementById("header-acerca-de").style.paddingTop = "40px";
    }
}