$(window).on('resize load', function () {
    w = $(".glass img").width();
    $('.layers-wrapper__4').css('width', w*0.7);
    $('.layers-wrapper__3').css('width', w*0.68);
    $('.layers-wrapper__2').css('width', w*0.666);
    $('.layers-wrapper__1').css('width', w*0.65);
});  