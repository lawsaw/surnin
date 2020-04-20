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
use common\models\Feedback;

class FormsController extends AppController
{

    public function beforeAction($action) {
        $this->enableCsrfValidation = false; // <-- here
        return parent::beforeAction($action);
    }



    public function actionFeedback($suka = null)
    {
        $request = Yii::$app->request;
        $method = 'unknown';
        $model = new Feedback();
        $data = null;
        if ($request->isAjax) { $method = 'Ajax'; }
        if ($request->isGet)  { $method = 'Get'; $data = $request->get(); }
        if ($request->isPost) { $method = 'Post'; $data = $request->post(); }
        if ($request->isPut)  { $method = 'Put'; }
        //$data['recaptcha'] = $request->post('g-recaptcha-response');
        if ($request) {
            if($model->load(['Feedback' => $data]) && $model->validate()) {
                $submit = $model->sendEmail();
                if($submit) {
                    return json_encode([
                        'method' => $method,
                        'data' => $data,
                        'test' => $suka,
                        'param' => ['huy' => 10],
                        'status' => 'success',
                    ]);
                } else {
                    return json_encode([
                        'status' => 'fail',
                        'error' => 'Message was not sent',
                        'data' => $data,
                    ]);
                }
            } else {
                return json_encode([
                    'status' => 'fail',
                    'errors' => ActiveForm::validate($model),
                    'data' => $data,
                ]);
            }

        }
    }










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