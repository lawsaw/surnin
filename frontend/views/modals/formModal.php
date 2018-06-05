<?php

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model \common\models\ContactForm */

use yii\helpers\Html;
use yii\bootstrap\ActiveForm;
//use yii\captcha\Captcha;

use lawsaw\widgets\Button;


?>

<?php $this->beginContent('@frontend/views/layouts/layout-modal.php'); ?>

<div class="site-contact">

    <h2><?= Html::encode($this->title) ?></h2>


    <?php $form = ActiveForm::begin([
        'id' => false,
        'action' => false,
        'options' => [
            'data-target' => Yii::$app->urlManager->createUrl(['/forms/test', 'language' => \Yii::$app->language]),
            'class' => 'formAwesome grid grid--column',
        ],
        'enableClientScript' => false
    ]); ?>



    <?= $form->field($model , 'name', [
        'options' => [
            'class' => 'formAwesome-group grid-row grid-row--form grid-row--column',
        ],
        'template' => "
                <div class='grid-cell grid-cell--form-label formAwesome-label-container'>{label}</div>
                <div class='grid-cell grid-cell--form-input formAwesome-input-container'>{input}</div>
                <div class='grid-cell grid-cell--form-validation formAwesome-validation-container'>{error}</div>
            ",
        'labelOptions' => ['class' => 'formAwesome-label']
    ])->textInput([
        'autofocus' => true,
        'class' => 'form-control input-md formAwesome-input',
        'placeholder' => 'name'
    ])->error([
        'tag' => 'div',
        'class' => 'formAwesome-validation'
    ]); ?>



    <?= $form->field($model , 'email', [
        'options' => [
            'class' => 'formAwesome-group grid-row grid-row--form grid-row--column',
        ],
        'template' => "
                <div class='grid-cell grid-cell--form-label formAwesome-label-container'>{label}</div>
                <div class='grid-cell grid-cell--form-input formAwesome-input-container'>{input}</div>
                <div class='grid-cell grid-cell--form-validation formAwesome-validation-container'>{error}</div>
            ",
        'labelOptions' => ['class' => 'formAwesome-label']
    ])->textInput([
        'class' => 'form-control input-md formAwesome-input',
        'placeholder' => 'email'
    ])->error([
        'tag' => 'div',
        'class' => 'formAwesome-validation'
    ]); ?>



    <?= $form->field($model , 'phone', [
        'options' => [
            'class' => 'formAwesome-group grid-row grid-row--form grid-row--column',
        ],
        'template' => "
                <div class='grid-cell grid-cell--form-label formAwesome-label-container'>{label}</div>
                <div class='grid-cell grid-cell--form-input formAwesome-input-container'>{input}</div>
                <div class='grid-cell grid-cell--form-validation formAwesome-validation-container'>{error}</div>
            ",
        'labelOptions' => ['class' => 'formAwesome-label']
    ])->textInput([
        'class' => 'form-control input-md formAwesome-input intTelInput',
        'placeholder' => 'phone'
    ])->error([
        'tag' => 'div',
        'class' => 'formAwesome-validation'
    ]); ?>



    <?= $form->field($model , 'subject', [
        'options' => [
            'class' => 'formAwesome-group grid-row grid-row--form grid-row--column',
        ],
        'template' => "
                <div class='grid-cell grid-cell--form-label formAwesome-label-container'>{label}</div>
                <div class='grid-cell grid-cell--form-input formAwesome-input-container'>{input}</div>
                <div class='grid-cell grid-cell--form-validation formAwesome-validation-container'>{error}</div>
            ",
        'labelOptions' => ['class' => 'formAwesome-label']
    ])->textInput([
        'class' => 'form-control input-md formAwesome-input',
        'placeholder' => 'subject'
    ])->error([
        'tag' => 'div',
        'class' => 'formAwesome-validation'
    ]); ?>



    <?= $form->field($model , 'body', [
        'options' => [
            'class' => 'formAwesome-group grid-row grid-row--form grid-row--column',
        ],
        'template' => "
                <div class='grid-cell grid-cell--form-label formAwesome-label-container'>{label}</div>
                <div class='grid-cell grid-cell--form-input formAwesome-input-container'>{input}</div>
                <div class='grid-cell grid-cell--form-validation formAwesome-validation-container'>{error}</div>
            ",
        'labelOptions' => ['class' => 'formAwesome-label']
    ])->textarea([
        'rows' => 6,
        'class' => 'form-control input-md formAwesome-input',
        'placeholder' => 'BODy'
    ])->error([
        'tag' => 'div',
        'class' => 'formAwesome-validation'
    ]); ?>



<!--            --><?//= $form->field($model , 'verifyCode', [
//                'options' => [
//                    'class' => 'formAwesome-group grid-row grid-row--form grid-row--column',
//                ],
//                'template' => "
//                        <div class='grid-cell grid-cell--form-label formAwesome-label-container'>{label}</div>
//                        <div class='grid-cell grid-cell--form-input formAwesome-input-container'>{input}</div>
//                        <div class='grid-cell grid-cell--form-validation formAwesome-validation-container'>{error}</div>
//                    ",
//                'labelOptions' => ['class' => 'formAwesome-label']
//            ])->widget(Captcha::className(), [
//                'template' => "
//                        {image}
//                        {input}
//                    ",
//            ])->error([
//                'tag' => 'div',
//                'class' => 'formAwesome-validation'
//            ]); ?>


    <?php

        // Get model name for validation using
        $captcha = explode('\\',get_class($model));
        $captcha = strtolower(end($captcha));

    ?>

    <div class="formAwesome-group grid-row grid-row--form grid-row--column field-<?= $captcha; ?>-recaptcha required">
        <div class="grid-cell grid-cell--form-label formAwesome-label-container">
            <label class="formAwesome-label">reCaptcha</label>
        </div>
        <div class="grid-cell grid-cell--form-input formAwesome-input-container">
            <div id="captcha-popup"></div>
        </div>
        <div class="grid-cell grid-cell--form-validation formAwesome-validation-container">
            <div class="formAwesome-validation"></div>
        </div>
    </div>


    <div class="grid-row grid-row--bottom">
        <div class="grid-cell">
            <?= Button::widget([
                'className' => 'new-class',
                'classContent' => 'formAwesome-submit',
                'theme' => 'lightblue',
                'size' => 'sizeL',
                'iconBefore' => [
                    'type' => 'fa',
                    'value' => 'fa-eye',
                ],
                'iconAfter' => [
                    'type' => 'svg',
                    'value' => 'svg-recording',
                ],
                'href' => '#',
                'label' => 'Hello World',
            ]); ?>
        </div>
    </div>


    <?php ActiveForm::end(); ?>

    <script>
        intTelInput.init();
        captcha.init({
            'id': 'captcha-popup',
            'key': '<?= Yii::$app->params['recaptchaSitekeyPublic'] ?>',
            'lang' : 'en'
        });
    </script>


</div>

<? $this->endContent(); ?>
