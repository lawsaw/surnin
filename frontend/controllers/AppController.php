<?php
namespace frontend\controllers;

use yii\web\Controller;


class AppController extends Controller
{

    public $layout = 'layout-main';


    public function debug($arr) {

        echo '<pre>'. print_r($arr, true) .'</pre>';

    }


}


function debug($arr) {

    echo '<pre>'. print_r($arr, true) .'</pre>';

}