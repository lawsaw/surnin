<?php
/**
 * this is view file for language tab in tag form
 * @var $this yii\web\View
 * @var $model common\models\Tag
 * @var $form yii\widgets\ActiveForm
 * @var $lang
 */
?>

<?= $form->field($model, 'title'.$lang)->textInput(['maxlength' => 255]) ?>
<?= $form->field($model, 'description'.$lang)->textarea(['rows' => 3]) ?>
<?= $form->field($model, 'anons'.$lang)->textarea(['rows' => 6]) ?>
<?= $form->field($model, 'content'.$lang)->textarea(['rows' => 6]) ?>

