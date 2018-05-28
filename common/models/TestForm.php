<?php

namespace common\models;

use Yii;
use yii\base\Model;

/**
 * ContactForm is the model behind the contact form.
 */
class TestForm extends Model
{
    public $name;
    public $email;
    public $phone;
    public $subject;
    public $body;
    //public $verifyCode;

    public $recaptcha;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            // name, email, subject and body are required
            [['name', 'email', 'phone', 'subject', 'body'], 'required' , 'message' => 'This field is required'],
            // email has to be a valid email address
            ['email', 'email'],
            [['name', 'phone'] , 'string' , 'min' => 5  , 'tooShort' => 'This field is too short'],
            // verifyCode needs to be entered correctly
            //['verifyCode', 'captcha'],
            ['recaptcha' , 'validCaptcha', 'skipOnEmpty' => false]
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
    public function sendEmail($email)
    {
        return Yii::$app->mailer->compose()
            ->setTo($email)
            ->setFrom([$this->email => $this->name])
            ->setSubject($this->subject)
            ->setTextBody($this->body)
            ->send();
    }

    public function validCaptcha($attribute)
    {
        return validCaptcha($this, $attribute, ['confirm'=>'а ну ка','confirm_again'=>'Еще разок']);
    }
}
