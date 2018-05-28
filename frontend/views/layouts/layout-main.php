<?php

use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;

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

    <script>
        var defer = {
            'styleVersion': '<?= Yii::$app->params['styleVersion'] ?>',
            'language': '<?= getLang() ?>',
            'js': '<?= $this->context->module->controller->action->id == 'rendering' ? 'rendering' : 'index' ?>'
        }
        function downloadJSAtOnload() {
            var element = document.createElement("script");
            element.src = "/js/defer.js?v=<?= Yii::$app->params['styleVersion'] ?>";
            document.body.appendChild(element);
        }
        if (window.addEventListener)
            window.addEventListener("load", downloadJSAtOnload, false);
        else if (window.attachEvent)
            window.attachEvent("onload", downloadJSAtOnload);
        else window.onload = downloadJSAtOnload;
    </script>

    <script>
        function init() {
            var vidDefer = document.getElementsByTagName('iframe');
            for (var i = 0; i < vidDefer.length; i++) {
                if (vidDefer[i].getAttribute('data-src')) {
                    vidDefer[i].setAttribute('src', vidDefer[i].getAttribute('data-src'));
                }
            }
        }
        window.onload = init;
    </script>


<? $this->endContent(); ?>