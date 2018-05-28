<?php

use lawsaw\widgets\Seo;
use lawsaw\widgets\Button;

?>

<?= Seo::widget([
    'title'         => 'Заголовок',
    'description'   => 'Описание',
    'image'         => 'Картинка',
    'url'           => 'сайт',
    'type'          => 'тип'
]); ?>

Index page


<?= Button::widget([
    'classContent' => 'awModalOpen',
    'theme' => 'lightblue',
    'size' => 'sizeL',
    'href' => '#',
    'label' => 'Open modal',
    'modal' => [
        'id' => 'testModal',
        'mode' => 'sidebarTop',
        'anim' => [
            'in' => 'sidebarToBottom',
            'out' => 'sidebarToTop',
        ],
        'workClass' => 'css-vertical-align-top'
    ]
]); ?>