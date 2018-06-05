<?php

namespace common\models;

use Yii;
use yii\data\ActiveDataProvider;
use yii\db\ActiveRecord;
use yii\web\NotFoundHttpException;

use omgdef\multilingual\MultilingualQuery;
use omgdef\multilingual\MultilingualBehavior;
use lawsaw\models\Lang;

/**
 * Модель категорий.
 *
 * @property string $id
 * @property string $title заголовок
 * @property Post[] $posts посты, относящиеся к категории
 */
class Category extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%category}}';
    }

    public static function tableNameTranslate()
    {
        return '{{%category_translate}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['title'], 'required'],
            [['title'], 'string', 'max' => 255]
        ];
    }


    public function behaviors()
    {
        return[
            /**
             * Multilanguage behavior
             * @see https://github.com/OmgDef/yii2-multilingual-behavior
             **/
            'ml' =>
                [
                    'class' => MultilingualBehavior::className(),
                    'languages' => Lang::getLangList(),
                    'defaultLanguage' => Lang::getDefaultLang()->url,
                    'tableName' => Category::tableNameTranslate(),
                    'langForeignKey' => 'category_id',
                    'attributes' =>
                        [
                            'title'
                        ]
                ]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('backend', 'ID'),
            'title' => Yii::t('backend', 'Title'),
        ];
    }

    /**
     * Возвращает список постов принадлежащих категории.
     * @return ActiveDataProvider
     */
    public function getPosts()
    {
        return new ActiveDataProvider([
            'query' => Post::find()
                ->where([
                    'category_id' => $this->id,
                    'publish_status' => Post::STATUS_PUBLISH
                ])
        ]);
    }

    /**
     * Возвращает список категорий
     * @return ActiveDataProvider
     */
    public function getCategories()
    {
        return new ActiveDataProvider([
            'query' => Category::find(),
            'pagination' => false
        ]);
    }

    /**
     * Возвращает модель категории.
     * @param int $id идентификатор категории
     * @throws NotFoundHttpException в случае, когда категория не найдена
     * @return Category
     */
    public function getCategory($id)
    {
        if (($model = Category::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested post does not exist.');
        }
    }

    public static function find()
    {
        return new MultilingualQuery(get_called_class());
    }
}
