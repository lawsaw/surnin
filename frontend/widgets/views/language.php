<?php
use yii\helpers\Html;
use lawsaw\widgets\Button;
use lawsaw\widgets\Dropdown;
?>


<?php
foreach ($langs as $lang) {

    $langArray[] = [
        'title'=> $lang->url,
        'link'=> '/'.$lang->url.Yii::$app->getRequest()->getLangUrl(),
    ];

}
?>


<?= Dropdown::widget([
    'className'=> 'langSwitcher',
    'frontTheme' => $options['frontTheme'],
    'backTheme' => $options['backTheme'],
    'size' => 'sizeXS',
    'current' => $current->url,
    'iconBefore' => [
        'type' => 'block',
        'value' => 'buttonAwesome-icon-image--arrow arrow-xs-right',
    ],
    'biasLeft' => true,
    'content' => $langArray
]);
?>
