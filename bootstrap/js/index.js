$(document).ready(function () {
    $('#getstarted').click(function () {
        $('html,body').stop().animate({
            scrollTop: 0,
        }, 'slow')
    })
})

$(document).scroll(function () { 
    $('.info-img').each(function (index,element) { 
         if($(document).scrollTop() + window.innerHeight >= $(element).offset().top ){
            $(element).find('img').addClass('active');
         }else{
            $(element).find('img').removeClass('active');
         }
    });
});


var count = 1;
function moveimg() {  
    if(count == 1 ){
        $('.moveimg').addClass('active');
        $('.movetext').addClass('active');
        count = 0;
    }else{
        $('.moveimg').removeClass('active')
        $('.movetext').removeClass('active')
        count = 1;
    }
}
    
setInterval(moveimg,5000)
moveimg();