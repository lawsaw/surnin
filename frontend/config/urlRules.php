<?php
return [
//    '/' => 'site/index',
//    [
//        'pattern' => 'news',
//        'route' => 'news/default/index',
//        'suffix' => '.html',
//    ],
//    [
//        'pattern' => '<action>',
//        'route' => 'site/<action>',
//        'suffix' => '.html',
//    ],
//    [
//        'pattern' => '<module>/<id:\d+>',
//        'route' => '<module>/default/view',
//        'suffix' => '.html',
//    ],




//    '/' => 'site/index',
//    'modal' => 'lawsaw/modal',

//    '' => 'site/index',
//    '<controller:\w+>/<action:\w+>/' => '<controller>/<action>',


//    [
//        'pattern' => 'about',
//        'route' => 'site/about',
//        'suffix' => '/',
//    ],
//    [
//        'pattern' => 'modal',
//        'route' => 'modal/index',
//        'suffix' => '.html',
//    ],


    '/' => 'site/index',
    //'<controller:\w+>/<action:\w+>/' => '<controller>/<action>',
    'controller:\w+>/<action:\w+>/<slug:[A-Za-z0-9 -_.]+>' => '<controller>/<action>',

    '<language:(ru|ua|en)>/' => 'site/index',
    '<language:(ru|ua|en)>/<action:(contact|login|logout)>/*' => 'site/<action>',
    '<language:(ru|ua|en)>/<controller:\w+>/<id:\d+>'=>'<controller>/view',
    '<language:(ru|ua|en)>/<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
    '<language:(ru|ua|en)>/<controller:\w+>/<action:\w+>/*'=>'<controller>/<action>',



    'modal' => 'lawsaw/modal',



];