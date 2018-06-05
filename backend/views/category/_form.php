<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use yii\bootstrap\Tabs;
use lawsaw\models\Lang;

/* @var $this yii\web\View */
/* @var $model common\models\Category */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="category-form">

    <?php $form = ActiveForm::begin(); ?>
    <?php
    foreach(Lang::getLangList() as $key => $lang) {
        $tabItems[] = [
            'label' => $lang,
            'content' => $this->renderAjax('_language_form', [
                'form' => $form,
                'model' => $model,
                /*if language is default do not pass it to _language_form
                * if you pass it, it wouldn't work. other ways, form language suffix and pass it to view file
                */
                'lang' => $key == Lang::getDefaultLang()->url ? '' : "_$key",
            ])
        ];
    }
    ?>

    <?php echo Tabs::widget([
        'items' => $tabItems
    ])?>

    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? 'Create' : 'Update', ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>