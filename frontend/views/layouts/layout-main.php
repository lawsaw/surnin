<?php

use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\web\View;

?>

<?php $this->beginContent('@frontend/views/layouts/main.php'); ?>

    <?php $this->registerLinkTag([
        'rel' => 'stylesheet',
        'type' => 'text/css',
        'href' => $this->params['cssFile'],
    ]);?>

    <div class="wrap">
        <div class="wrapPage">
            <div class="wrapPageBody">

                <?php
                    NavBar::begin([
                        'brandLabel' => Yii::$app->name,
                        'brandUrl' => Yii::$app->homeUrl,
                        'options' => [
                            'class' => 'navbar-inverse navbar-fixed-top',
                        ],
                    ]);
                    $menuItems = [
                        ['label' => 'Home', 'url' => ['/site/index']],
                        ['label' => 'About', 'url' => ['/site/about']],
                        ['label' => 'Contact', 'url' => ['/site/contact']],
                    ];
                    if (Yii::$app->user->isGuest) {
                        $menuItems[] = ['label' => 'Signup', 'url' => ['/site/signup']];
                        $menuItems[] = ['label' => 'Login', 'url' => ['/site/login']];
                    } else {
                        $menuItems[] = '<li>'
                            . Html::beginForm(['/site/logout'], 'post')
                            . Html::submitButton(
                                'Logout (' . Yii::$app->user->identity->username . ')',
                                ['class' => 'btn btn-link logout']
                            )
                            . Html::endForm()
                            . '</li>';
                    }
                    echo Nav::widget([
                        'options' => ['class' => 'navbar-nav navbar-right'],
                        'items' => $menuItems,
                    ]);
                    NavBar::end();
                ?>

                <?= $content ?>

            </div>
        </div>
        <div class="wrapModalAwesome">
            <!-- modals go here -->
        </div>

    </div>






<?php

$this->registerJs(setScript()['js']('index'), View::POS_END);
$this->registerJs(setScript()['defer'](), View::POS_END);
$this->registerJs(setScript()['iframe'](), View::POS_END);

?>


<? $this->endContent(); ?>