<?php
/**
 * Created by PhpStorm.
 * User: sqrl
 * Date: 7/5/16
 * Time: 3:11 PM
 */

namespace frontend\controllers;

use Yii;
use common\models\TestForm;
use common\models\LoginForm;
use yii\web\Response;
use yii\bootstrap\ActiveForm;
use yii\helpers\Url;

class FormsController extends AppController
{


    public function actionTest()
    {
        \Yii::$app->response->format = Response::FORMAT_JSON;

        $model = new TestForm();
        $data = \Yii::$app->request->get('TestForm');
        $data['recaptcha'] = \Yii::$app->request->get('g-recaptcha-response');
        //$data = \Yii::$app->request->post();
        //if($model->load(Yii::$app->request->post()) && $model->validate())
        if($model->load( ['TestForm' => $data] ) && $model->validate())
        {

            if ($model->sendEmail(Yii::$app->params['adminEmail'])) {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Thank you for your request! We will contact you as soon as possible',
                ]);
            } else {
                echo json_encode([
                    'status' => 'fail'
                ]);
            }

            \Yii::$app->end();

        }
        else
        {
            return ActiveForm::validate($model);
        }
    }

    public function actionLogin()
    {

        \Yii::$app->response->format = Response::FORMAT_JSON;

        $model = new LoginForm();


        $data = \Yii::$app->request->get('LoginForm');
        if($model->load( ['LoginForm' => $data] ) && $model->validate())
        {

            if($model->login()) {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Thank you for your request! We will contact you as soon as possible',
                ]);
            } else {
                echo json_encode([
                    'status' => 'fail',
                    'message' => 'Фейл(((',
                ]);
            }

            \Yii::$app->end();

        }
        else
        {
            return ActiveForm::validate($model);
        }
    }



}