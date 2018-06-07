<?php

use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\web\View;
use yii\helpers\Html;
use lawsaw\widgets\Language;
use lawsaw\widgets\Button;

?>

<?php $this->beginContent('@frontend/views/layouts/main.php'); ?>

    <?php $this->registerLinkTag([
        'rel' => 'stylesheet',
        'type' => 'text/css',
        //'href' => $this->params['cssFile'],
        'href' => '/css/index.min.css?v='.\Yii::$app->params['styleVersion'],
    ]);?>

    <div class="wrap">
        <div class="wrapPage">
            <div class="wrapPageBody">

                <?= Language::widget([
                    'frontTheme' => 'introductioned',
                    'backTheme' => 'introductioned'
                ]);
                ?>

                <ul>
                    <li><?= Html::a('Home', ['site/index']) ?></li>
                    <li><?= Html::a('About', ['site/about']) ?></li>
                    <li><?= Html::a('Contact', ['site/contact']) ?></li>
                    <li><?= Html::a('Blog', ['post/index']) ?></li>
                    <li>
                        <?php

                        if (Yii::$app->user->isGuest) {
                            echo Html::a('Signup', ['site/signup']);
                            echo ' / ';
                            echo Html::a('Login', ['site/login']);
                            echo Button::widget([
                                'classContent' => 'awModalOpen',
                                'theme' => 'lightblue',
                                'size' => 'sizeL',
                                'href' => '#',
                                'label' => 'Login modal',
                                'modal' => [
                                    'id' => 'loginModal',
                                    'mode' => '',
                                    'anim' => [
                                        'in' => 'zoomIn',
                                        'out' => 'zoomIn',
                                    ],
                                    'workClass' => '',
                                    'model' => 'LoginForm',
                                ]
                            ]);
                        } else {
                            echo ''
                                . Html::beginForm(['/site/logout'], 'post')
                                . Html::submitButton(
                                    'Logout (' . Yii::$app->user->identity->username . ')',
                                    ['class' => 'btn btn-link logout']
                                )
                                . Html::endForm()
                                . '';
                        }
                        ?>
                    </li>
                    <li></li>
                </ul>

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