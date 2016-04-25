/**
 * Created by nickstalter on 4/25/16.
 */
/**
 * MDL Smooth Scrolling
 */
$(document).ready(function () {
    // http://stackoverflow.com/questions/32054194/material-design-lite-and-jquery-something-is-wrong-with-smooth-scroll
    $(".mdl-layout__content").on("scroll", onScroll);
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(".mdl-layout__content").off("scroll");

        $('a').each(function () {
            $(this).removeClass('is-active');
        });
        $(this).addClass('is-active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $(".mdl-layout__content").stop().animate({
            'scrollTop': $target.get( 0 ).offsetTop+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(".mdl-layout__content").on("scroll", onScroll);
        });
    });
});
function onScroll(event){
    var scrollPos = $(".mdl-layout__content").scrollTop();
    $('.mdl-navigation a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.get( 0 ).offsetTop - 30 <= scrollPos && (refElement.get( 0 ).offsetTop+2) + refElement.height() > scrollPos) {
            $('.mdl-navigation__link a').removeClass("is-active");
            currLink.addClass("is-active");
        }
        else{
            currLink.removeClass("is-active");
        }
    });
}
/**
 * Regular Smooth Scrolling
 */

/**
$(document).ready(function (){
    // http://jsfiddle.net/cse_tushar/Dxtyu/141/
    $(document).on("scroll", onScroll);
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('is-active');
        });
        $(this).addClass('is-active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});
function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('.header-menu a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.header-menu a').removeClass("is-active");
            currLink.addClass("is-active");
        }
        else {
            currLink.removeClass("is-active");
        }
    });
}
*/