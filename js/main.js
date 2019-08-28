$(document).ready(function () {
    $('#day').click(function () {
        $(this).attr("disabled", true);
        $("#night").attr("disabled", false);
        $("body").removeClass("lighten-3").addClass("darken-3");
    });
});

$(document).ready(function () {
    $('#night').click(function () {
        $(this).attr("disabled", true);
        $("#day").attr("disabled", false);
        $("body").removeClass("darken-3").addClass("lighten-3")
    });
});

$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('.materialboxed').materialbox();
    $('.modal').modal();
    $('.tooltipped').tooltip();
    $('.carousel').carousel();
    $('.slider').slider();
    $('.collapsible').collapsible();
});

window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("top-btn").style.display = "block";
    } else {
        document.getElementById("top-btn").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

$(function () {
    $('.bxslider').bxSlider({
        mode: 'fade',
        captions: true,
        slideWidth: 600,
        auto: true,
        autoControls: true,
        pager: true,
    });
});
