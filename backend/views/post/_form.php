<?php

use common\models\Post;
use yii\helpers\ArrayHelper;
use yii\helpers\Html;
use yii\widgets\ActiveForm;
use kartik\select2\Select2;
use kartik\file\FileInput;
use kartik\datetime\DateTimePicker;
use yii\bootstrap\Tabs;
use lawsaw\models\Lang;

/* @var $this yii\web\View */
/* @var $model common\models\Post */
/* @var $form yii\widgets\ActiveForm */
/* @var $authors yii\db\ActiveRecord[] */
/* @var $category yii\db\ActiveRecord[] */
/* @var $tags yii\db\ActiveRecord[] */
?>

<div class="post-form">

    <?php $form = ActiveForm::begin(['options' =>['enctype' => 'multipart/form-data']]); ?>

    <?= $form->field($model, 'category_id')->dropDownList(
        ArrayHelper::map($category, 'id', 'title')
    ) ?>

    <?= $form->field($model, 'author_id')->dropDownList(
        ArrayHelper::map($authors, 'id', 'username')
    ) ?>




    <?=$form->field($model, 'imageFile')
        /**
         * kartik-v FileInput widget
         * @link https://github.com/kartik-v/yii2-widget-fileinput
         */
        ->widget(FileInput::classname(), [
            'options' =>
                [
                    'accept' => 'image/*',
                ],
            /**
             * for more options @link http://demos.krajee.com/widget-details/fileinput
             * */
            'pluginOptions' =>
                [
                    'showUpload' => false,
                    'showRemove' => false,
                    'initialPreview' => $model->image?Html::img($model->image , ['width' => '200']):false,
                ],
        ])->label('Image');?>

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



    <?= $form->field($model, 'publish_status')->dropDownList(
        [Post::STATUS_DRAFT => Yii::t('backend', 'Draft'), Post::STATUS_PUBLISH => Yii::t('backend', 'Published')]
    ) ?>



    <?= $form->field($model , 'tags')
        /**
         * kartik select2 widget
         * @link https://github.com/kartik-v/yii2-widget-select2
         */
        ->widget(Select2::className() , [
            'data' => ArrayHelper::map($tags, 'id', 'title'),
            'options' =>
                [
                    'placeholder' => 'Select tags',
                    'multiple' => true
                ]
        ])->label('Tags')?>
    <p class="alert-info">
        You can add new tags <a href="/tag">here</a>
    </p><br />


    <?= $form->field($model, 'publish_date')->widget(DateTimePicker::className() , [
        'pluginOptions' =>
            [
                'format' => 'yyyy-mm-dd HH:ii',
                'todayHighlight' => true
            ]
    ]) ?>

    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? Yii::t('backend', 'Create') : Yii::t('backend', 'Update'), ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
