<?php
namespace frontend\controllers;

use Yii;
use yii\web\Controller;


class AppController extends Controller
{

    public $layout = 'layout-main';


    public function debug($arr) {
        echo '<pre>'. print_r($arr, true) .'</pre>';
    }

    public function backPage()
    {
        //return Yii::$app->getResponse()->redirect(Yii::$app->getHomeUrl());
        return $this->redirect(Yii::$app->request->referrer);
    }

    public function goBack2($defaultUrl = null)
    {
        //return Yii::$app->getResponse()->redirect(Yii::$app->getUser()->getReturnUrl($defaultUrl));
        var_dump(Yii::$app->getUser()->getReturnUrl($defaultUrl));
    }


}


function debug($arr) {

    echo '<pre>'. print_r($arr, true) .'</pre>';

}