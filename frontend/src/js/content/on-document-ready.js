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


$(document).ready(function(){


    // scrollAwesome.init({
    //     'container' : $('body')
    // });
    //
    // scrollAwesome.init({
    //     'container' : $('.block-1'),
    //     'direction' : 'x',
    // });

    $(window).impulse({
        range: 110,
        leap: 1.1,
        tempo: 750,
        sloth: 0.9,
        constrain: 5,
        // 'range': 53,
        // 'leap': 0.53,
    });
    $('.block-1').impulse({
        'direction': 'x'
    });


    tabAwesome.init({
        'container' : '.tabAwesome1',
        'event' : 'click',
        'contentSpeedOpening' : 2000,
        'contentSpeedClosing' : 2000,
        'menuSpeedOpening' : 0,
        'menuSpeedClosing' : 0,
    });

    tabAwesome.init({
        'container' : '.tabAwesome2',
        'event' : 'mouseenter',
        'contentSpeedOpening' : 2000,
        'contentSpeedClosing' : 2000,
        'menuSpeedOpening' : 2000,
        'menuSpeedClosing' : 2000,
    });

    // tabAwesome.init({
    //     'container' : '.tabAwesome2',
    //     'event' : 'click',
    //     'contentOpenSpeed' : 1500,
    //     'contentCloseSpeed' : 1500,
    //     'menuOpenSpeed' : 1500,
    //     'menuCloseSpeed' : 1500,
    // });



    scroollyCustom.init({
        'container' : '.supernavbar-3',
        'type'      : 'full',
        'deltaTop'      : 50,
        'deltaBottom'   : 50,
    });

    scroollyCustom.init({
        'container' : '.supernavbar-1',
        'parent'    : '.navbar-container-1',
        'type'      : 'parent-full'
    });


    scroollyCustom.init({
        'container' : '.supernavbar-2',
        'parent'    : '.navbar-container-2',
        'type'      : 'parent-full',
        'deltaTop'      : 50,
        'deltaBottom'   : 50,
    });






    siteOptions.clock();

    siteOptions.listenScrollDirection();

    //siteOptions.listenPos('.navbar');

    detectDevice();

    modalAwesome.init();

    gridAwesome.init({
        container           : '.gridAwesomeDemo4',
        type                : 'col',
        animation           : true,
        animationDuration   : 1500,
        animationFunction   : 'ease',
        //size                : [2,4]
    });

    gridAwesome.init({
        container           : '.gridAwesomeDemo1',
        type                : 'row',
        animation           : true,
        animationDuration   : 1500,
        animationFunction   : 'ease',
        //size                : [2,4]
    });


    gridAwesome.init({
        container           : '.gridAwesomeDemo2',
        type                : 'col',
        animation           : true,
        animationDuration   : 1500,
        animationFunction   : 'ease-in',
        //size                : [2,4]
    });

    gridAwesome.init({
        container           : '.gridAwesomeDemo3',
        type                : 'colrowed',
        animation           : true,
        animationDuration   : 1500,
        animationFunction   : 'ease-out',
        //size                : [2,4]
    });



    tooltipAwesome.init();


    var timer = '01-09-2017 00:00:00';


    timerAwesome.init({
        'container'     : '.timer-hours',
        'type'          : 'type1',
        'speed'         : 1000,
        'period'        : 1000,
        'pause'         : 0,
        'timer'         : {
            'target': timer
        },
        'cover'         : {
            'active' : true,
            'content' : '',
        },
        'loop'          : false,
        'mode'          : 'timer-hours',
        'direction'     : 'topBottom',
    });

    timerAwesome.init({
        'container'     : '.timer-minutes',
        'type'          : 'type1',
        'speed'         : 1000,
        'period'        : 1000,
        'pause'         : 0,
        'timer'         : {
            'target': timer
        },
        'cover'         : {
            'active' : true,
            'content' : '',
        },
        'loop'          : false,
        'mode'          : 'timer-minutes',
        'direction'     : 'topBottom',
    });

    timerAwesome.init({
        'container'     : '.timer-seconds',
        'type'          : 'type1',
        'speed'         : 1000,
        'period'        : 1000,
        'pause'         : 0,
        'timer'         : {
            'target': timer
        },
        'cover'         : {
            'active' : true,
            'content' : '',
        },
        'callback'      : function(){
            modalAwesome.open('sidebarTop');
            setTimeout(function(){
                modalAwesome.close('sidebarTop');
            },1500);
        },
        'loop'          : false,
        'mode'          : 'timer-seconds',
        'direction'     : 'topBottom',
    });


    timerAwesome.init({
        'container'     : '.clock-seconds-1',
        'type'          : 'type1',
        'pause'         : 0,
        'cover'         : {
            'active' : true,
            'content' : '',
        },
        'mode'          : 'clock-seconds',
        'direction'     : 'leftRight',
    });
    timerAwesome.init({
        'container'     : '.clock-seconds-2',
        'type'          : 'type1',
        'pause'         : 0,
        'cover'         : {
            'active' : true,
            'content' : '',
        },
        'mode'          : 'clock-seconds',
        'direction'     : 'rightLeft',
    });
    timerAwesome.init({
        'container'     : '.clock-seconds-3',
        'type'          : 'type1',
        'pause'         : 0,
        'cover'         : {
            'active' : true,
            'content' : '',
        },
        'mode'          : 'clock-seconds',
        'direction'     : 'topBottom',
    });
    timerAwesome.init({
        'container'     : '.clock-seconds-4',
        'type'          : 'type1',
        'pause'         : 0,
        'cover'         : {
            'active' : true,
            'content' : '',
        },
        'mode'          : 'clock-seconds',
        'direction'     : 'bottomTop',
    });

    timerAwesome.init({
        'container'     : '.clock-minutes',
        'type'          : 'type1',
        'speed'         : 1000,
        'period'        : 1000,
        'cover'         : {
            'active' : false,
            'content' : '',
        },
        'loop'          : false,
        'mode'          : 'clock-minutes',
        'direction'     : 'topBottom',
    });

    timerAwesome.init({
        'container'     : '.clock-hours',
        'type'          : 'type1',
        'speed'         : 1000,
        'period'        : 1000,
        'cover'         : {
            'active' : false,
            'content' : '',
        },
        'loop'          : false,
        'mode'          : 'clock-hours',
        'direction'     : 'topBottom',
    });


    timerAwesome.init({
        'container'     : '.timer-custom-1',
        'type'          : 'type2',
        'pause'         : 3000,
        'speed'         : 750,
        'period'        : 1500,
        'cover'         : {
            'active' : true,
            'content' : '',
        },
        'loop'          : true,
        'data'          : ['Я','C'],
        'mode'          : 'string',
        'direction'     : 'bottomTopBack',
    });
    timerAwesome.init({
        'container'     : '.timer-custom-2',
        'type'          : 'type2',
        'pause'         : 3250,
        'speed'         : 750,
        'period'        : 1500,
        'cover'         : {
            'active' : true,
            'content' : '',
        },
        'loop'          : true,
        'data'          : ['Р','O'],
        'mode'          : 'string',
        'direction'     : 'bottomTopBack',
    });
    timerAwesome.init({
        'container'     : '.timer-custom-3',
        'type'          : 'type2',
        'pause'         : 3500,
        'speed'         : 750,
        'period'        : 1500,
        'cover'         : {
            'active' : true,
            'content' : '',
        },
        'loop'          : true,
        'data'          : ['И','O'],
        'mode'          : 'string',
        'direction'     : 'bottomTopBack',
    });
    timerAwesome.init({
        'container'     : '.timer-custom-4',
        'type'          : 'type2',
        'pause'         : 3750,
        'speed'         : 750,
        'period'        : 1500,
        'cover'         : {
            'active' : true,
            'content' : ':)',
        },
        'loop'          : true,
        'data'          : ['К','L'],
        'mode'          : 'string',
        'direction'     : 'bottomTopBack',
    });













    //$('.slickCustom').slick();

    slickCustom.init({
        custom: {
            container: '.slickCustom-1',
            slides: [1,2,3,4]
        },
        dots: true,
        adaptiveHeight: true
    });
    slickCustom.init({
        custom: {
            container: '.slickCustom-2',
            slides: []
        },
        dots: true
    });





});




$(window).on(siteOptions.trigger.customScroll, function(e, pos) {

    //console.log('new: ' + pos.new + '; last: ' + pos.last + '; direction: ' + pos.direction);

});



$(window).on(siteOptions.trigger.adaptive, function(e, state) {

    //console.log(state);

});


$(window).on(siteOptions.trigger.timerAwesome, function(e, options) {

    //console.log(options);

});


$(window).on(siteOptions.trigger.second, function(e, value) {

    //console.log('second has passed: ' + value);

});

$(window).on(siteOptions.trigger.minute, function(e, value) {

    //console.log('minute has passed: ' + value);

});

$(window).on(siteOptions.trigger.hour, function(e, value) {

    //console.log('hour has passed: ' + value);

});
