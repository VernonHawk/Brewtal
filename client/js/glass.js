$(window).on('resize load', function () {
    var w = $(".glass img").width();
    $('.layer-wrapper__4').css('width', w*0.7);
    $('.layer-wrapper__3').css('width', w*0.68);
    $('.layer-wrapper__2').css('width', w*0.666);
    $('.layer-wrapper__1').css('width', w*0.65);

    var h = $('.glass').height();
    $('.layer-cross').css('height', h*0.1);
});  