<?php

use yii\helpers\Html;
use yii\bootstrap\ActiveForm;
use lawsaw\widgets\Button;

?>

<?php $this->beginContent('@frontend/views/layouts/layout-modal.php'); ?>
<div class="site-login">

    <p>Please fill out the following fields to login:</p>

    <div class="row">
        <div class="col-lg-5">
            <?php //$form = ActiveForm::begin(['id' => 'login-form']); ?>

            <?php $form = ActiveForm::begin([
                'id' => false,
                'action' => false,
                'options' => [
                    'data-target' => Yii::$app->urlManager->createUrl(['/forms/login', 'language' => \Yii::$app->language]),
                    'class' => 'formAwesome grid grid--column',
                ],
                'enableClientScript' => false
            ]); ?>




            <?= $form->field($model , 'username', [
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

            <?= $form->field($model , 'password', [
                'options' => [
                    'class' => 'formAwesome-group grid-row grid-row--form grid-row--column',
                ],
                'template' => "
                <div class='grid-cell grid-cell--form-label formAwesome-label-container'>{label}</div>
                <div class='grid-cell grid-cell--form-input formAwesome-input-container'>{input}</div>
                <div class='grid-cell grid-cell--form-validation formAwesome-validation-container'>{error}</div>
            ",
                'labelOptions' => ['class' => 'formAwesome-label']
            ])->passwordInput([
                'autofocus' => true,
                'class' => 'form-control input-md formAwesome-input',
                'placeholder' => 'name'
            ])->error([
                'tag' => 'div',
                'class' => 'formAwesome-validation'
            ]); ?>





            <?= $form->field($model, 'rememberMe')->checkbox() ?>

            <div style="color:#999;margin:1em 0">
                If you forgot your password you can <?= Html::a('reset it', ['site/request-password-reset']) ?>.
            </div>

            <div class="form-group">
                <?php //Html::submitButton('Login', ['class' => 'btn btn-primary formAwesome-submit', 'name' => 'login-button']) ?>
            </div>

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

            <?php ActiveForm::end(); ?>
        </div>
    </div>
</div>
<? $this->endContent(); ?>
