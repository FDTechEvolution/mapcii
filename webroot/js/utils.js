function getWindowSize() {
    var h = $(window).height();
    var w = $(window).width();
    var screen = {h:h,w:w};
    console.log(screen);
    return screen;
}