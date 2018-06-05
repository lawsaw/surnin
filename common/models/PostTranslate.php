<?php

namespace common\models;

use Yii;
use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * Модель для связи тэг-пост
 *
 * @property integer $tag_id идентификатор тэга
 * @property integer $post_id идентификатор поста, к которому принадлежит тэг
 *
 * @property Post $post пост
 * @property Tags $tag тэг
 */
class PostTranslate extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%post_translate}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['post_id'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('backend', 'ID'),
            'post_id' => Yii::t('backend', 'Post ID'),
            'title' => 'Title',
            'anons' => 'Anons',
            'content' => 'Content',
        ];
    }

}
