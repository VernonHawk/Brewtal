import $ from 'jquery';

function adjustGlassSize() {
    const width = $('.glass img').width();
    const height = $('.glass').height();
    
    $('.layer-wrapper__4').css('width', width * 0.7);
    $('.layer-wrapper__3').css('width', width * 0.68);
    $('.layer-wrapper__2').css('width', width * 0.666);
    $('.layer-wrapper__1').css('width', width * 0.65);

    $('.layer-cross').css('height', height * 0.1);
}

export default adjustGlassSize;