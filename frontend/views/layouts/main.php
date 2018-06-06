<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use frontend\assets\AppAsset;
use lawsaw\widgets\FavIcon;

AppAsset::register($this);

?>

<?php $this->beginPage() ?>

<!DOCTYPE html>

<html lang="<?= Yii::$app->language ?>" prefix="og: http://ogp.me/ns#">

<head>

    <meta charset="<?= Yii::$app->charset ?>">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="user-scalable=no">

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

    <?= FavIcon::widget([
        'icon' => 'image.png',
    ]); ?>

    <?= Html::csrfMetaTags()  ?>

    <title><?= Html::encode($this->title) ?></title>

    <?php $this->head() ?>

</head>

<body>

    <?php $this->beginBody() ?>

        <?= $content ?>

    <?php $this->endBody() ?>

</body>

</html>

<?php $this->endPage() ?>
