<?php
namespace frontend\widgets;
use common\models\Lang;

class Language extends \yii\bootstrap\Widget
{

    public $class;
    public $frontTheme;
    public $backTheme;

    public function init(){}

    public function run() {
        $options = [
            'class' => $this->class,
            'frontTheme' => $this->frontTheme,
            'backTheme' => $this->backTheme,
        ];
        return $this->render('language',[
            'current' => Lang::getCurrent(),
            'langs' => Lang::find()->where('id != :current_id', [':current_id' => Lang::getCurrent()->id])->all(),
            'options' => $options,
        ]);
    }
}