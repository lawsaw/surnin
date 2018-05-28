$(document).ready(function(){



    ;(function(){
        if(siteOptions.isMobile()) {
            $('html').addClass('device-mobile');
        } else {
            $('html').addClass('device-desktop');
        }
    })();



    modalAwesome.init();



    form.init({
        'messageSuccess': 'Успешная отправка!',
    });



    modal.init();



    dropdownAwesome.init();




});