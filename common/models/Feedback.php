<?php

namespace common\models;

use Yii;
use yii\base\Model;

/**
 * ContactForm is the model behind the contact form.
 */
class Feedback extends Model
{
    public $name;
    public $email;
    public $message;

    //public $verifyCode;

    //public $recaptcha;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            // name, email, subject and body are required
            [['name', 'email', 'message'], 'required' , 'message' => 'invalid_empty'],
            ['email', 'email', 'message' => 'invalid_email_format'],
            // verifyCode needs to be entered correctly
            //['verifyCode', 'captcha'],
            //['recaptcha' , 'validCaptcha', 'skipOnEmpty' => false]
        ];
    }

    /**
     * @inheritdoc
     */
//    public function attributeLabels()
//    {
//        return [
//            'verifyCode' => 'Verification Code',
//        ];
//    }

    /**
     * Sends an email to the specified email address using the information collected by this model.
     *
     * @param string $email the target email address
     * @return bool whether the email was sent
     */
    public function sendEmail()
    {
        return Yii::$app->mailer->compose(['html' => 'feedback'],[
            'name' => $this->name,
            'email' => $this->email,
            'message' => $this->message,
        ])
            ->setTo(Yii::$app->params['managerEmail'])
            ->setFrom(Yii::$app->params['managerEmail'])
            ->setSubject('Сообщение с формы обратной связи на сайте')
            //->setTextBody($this->body)
            ->send();
    }

    public function validCaptcha($attribute)
    {
        return validCaptcha($this, $attribute, ['confirm'=>'invalid_recaptcha_empty','confirm_again'=>'invalid_recaptcha_repeat']);
    }
}
