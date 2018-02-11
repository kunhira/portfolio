$(function(){
    typing();
})


function typing(){
    var textLen = $('.firstView__name__typing').text().length;
    //一文字ずつspanで囲う
    $('.firstView__name__typing').children().addBack().contents().each(function() {
        if (this.nodeType == 3) {
            $(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));
        }
    });

    $('.firstView__name__typing').append('<span class="cursor"></span>');
    $('.firstView__name__typing').css({'opacity':'1'});
    setTimeout(function(){
        $('.firstView__top').fadeOut();
        $('.firstView__bottom').fadeOut();
        for(i=0; i <= textLen;i++){
            $('.firstView__name__typing').children('span:eq('+i+')').delay(100*i).fadeIn(10);
        }
        $('.cursor').delay(1200).fadeOut(10);
    },3200);

}