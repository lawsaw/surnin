<?php

use common\models\Category;
use common\models\Post;
use common\models\User;
use common\models\TagPost;
use common\models\Tags;
use common\models\Comment;

use yii\db\Migration;
use yii\db\pgsql\Schema;


class m180601_080225_blog extends Migration
{
    public function up()
    {

        $tableOptions = null;
        if ($this->db->driverName === 'mysql') {
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_general_ci ENGINE=InnoDB';
        }


        /* Category START */


        $this->createTable(Category::tableName(), [
            'id' => $this->primaryKey(),
            //'title' => $this->string()->notNull(),
        ], $tableOptions);


        $this->createTable(Category::tableNameTranslate(), [
            'id' => $this->primaryKey(),
            'category_id' => $this->integer(),
            'language' => $this->string()->notNull(),
            'title' => $this->string()->notNull(),
        ], $tableOptions);


        $this->createIndex('FK_category', Category::tableNameTranslate(), 'category_id');
        $this->addForeignKey(
            'FK_category_post', Category::tableNameTranslate(), 'category_id', Category::tableName(), 'id', 'SET NULL', 'CASCADE'
        );


        /* Category END */


        /* Post START */


        $this->createTable(Post::tableName(), [
            'id' => $this->primaryKey(),
//            'title' => $this->string()->notNull(),
//            'anons' => $this->text()->notNull(),
//            'content' => $this->text()->notNull(),
            'image' => $this->string()->notNull(),
            'category_id' => $this->integer(),
            'author_id' => $this->integer(),
            //'publish_status' => "enum('" . Post::STATUS_DRAFT . "','" . Post::STATUS_PUBLISH . "') NOT NULL DEFAULT '" . Post::STATUS_DRAFT . "'",
            'publish_date' => $this->timestamp()->notNull(),
        ], $tableOptions);


        $this->createIndex('FK_post_author', Post::tableName(), 'author_id');
        $this->addForeignKey(
            'FK_post_author', Post::tableName(), 'author_id', User::tableName(), 'id', 'SET NULL', 'CASCADE'
        );


        $this->createIndex('FK_post_category', Post::tableName(), 'category_id');
        $this->addForeignKey(
            'FK_post_category', Post::tableName(), 'category_id', Category::tableName(), 'id', 'SET NULL', 'CASCADE'
        );


        //$this->execute("ALTER TYPE post_publish_status OWNER TO root;");
        $this->execute("DROP TYPE IF EXISTS post_publish_status;");
        $this->execute("CREATE TYPE post_publish_status AS enum('draft', 'publish');");
        $this->addColumn(Post::tableName() , 'publish_status' , "post_publish_status NOT NULL DEFAULT 'draft'");


        $this->createTable(Post::tableNameTranslate(), [
            'id' => $this->primaryKey(),
            'post_id' => $this->integer(),
            'language' => $this->string()->notNull(),
            'title' => $this->string()->notNull(),
            'description' => $this->text()->notNull(),
            'anons' => $this->text()->notNull(),
            'content' => $this->text()->notNull(),
        ], $tableOptions);


        $this->createIndex('FK_translate', Post::tableNameTranslate(), 'post_id');
        $this->addForeignKey(
            'FK_translate_post', Post::tableNameTranslate(), 'post_id', Post::tableName(), 'id', 'SET NULL', 'CASCADE'
        );


        /* Post END */


        /* TAGS START */


        $this->createTable(Tags::tableName(), [
            'id' => $this->primaryKey(),
            //'title' => $this->string()->notNull(),
        ], $tableOptions);


        $this->createIndex('FK_tag', TagPost::tableName(), 'tag_id');
        $this->addForeignKey(
            'FK_tag_post', TagPost::tableName(), 'tag_id', Tags::tableName(), 'id', 'SET NULL', 'CASCADE'
        );


        $this->createTable(TagPost::tableName(), [
            'id' => $this->primaryKey(),
            'tag_id' => $this->integer(),
            'post_id' => $this->integer()
        ], $tableOptions);


        $this->createIndex('FK_post', TagPost::tableName(), 'post_id');
        $this->addForeignKey(
            'FK_post_tag', TagPost::tableName(), 'post_id', Post::tableName(), 'id', 'SET NULL', 'CASCADE'
        );


        $this->createTable(Tags::tableNameTranslate(), [
            'id' => $this->primaryKey(),
            'tag_id' => $this->integer(),
            'language' => $this->string()->notNull(),
            'title' => $this->string()->notNull(),
        ], $tableOptions);


        $this->createIndex('FK_text', Tags::tableNameTranslate(), 'tag_id');
        $this->addForeignKey(
            'FK_text_tag', Tags::tableNameTranslate(), 'tag_id', Tags::tableName(), 'id', 'SET NULL', 'CASCADE'
        );


        /* TAGS END */


        /* COMMENT START */


        $this->createTable(Comment::tableName(), [
            'id' => $this->primaryKey(),
            'pid' => $this->integer(),
            'title' => $this->string()->notNull(),
            'content' => $this->string()->notNull(),
            //'publish_status' => "enum('" . Comment::STATUS_MODERATE . "','" . Comment::STATUS_PUBLISH . "') NOT NULL DEFAULT '" . Comment::STATUS_MODERATE . "'",
            'post_id' => $this->integer(),
            'author_id' => $this->integer()
        ], $tableOptions);


        //$this->execute("ALTER TYPE comment_publish_status OWNER TO root;");
        $this->execute("DROP TYPE IF EXISTS comment_publish_status;");
        $this->execute("CREATE TYPE comment_publish_status AS enum('moderate', 'publish');");
        $this->addColumn(Comment::tableName() , 'publish_status' , "comment_publish_status NOT NULL DEFAULT 'moderate'");


        $this->createIndex('FK_comment_author', Comment::tableName(), 'author_id');
        $this->addForeignKey(
            'FK_comment_author', Comment::tableName(), 'author_id', User::tableName(), 'id', 'SET NULL', 'CASCADE'
        );


        $this->createIndex('FK_comment_post', Comment::tableName(), 'post_id');
        $this->addForeignKey(
            'FK_comment_post', Comment::tableName(), 'post_id', Post::tableName(), 'id', 'SET NULL', 'CASCADE'
        );


        /* COMMENT END */

    }

    public function down()
    {

        $this->dropForeignKey('FK_category_post', Category::tableNameTranslate());
        $this->dropForeignKey('FK_translate_post', Post::tableNameTranslate());
        $this->dropForeignKey('FK_tag_post', TagPost::tableName());
        $this->dropForeignKey('FK_post_tag', TagPost::tableName());
        $this->dropForeignKey('FK_text_tag', Tags::tableNameTranslate());

        $this->dropTable(Post::tableName());
        $this->dropTable(Post::tableNameTranslate());
        $this->dropTable(Category::tableName());
        $this->dropTable(Category::tableNameTranslate());
        $this->dropTable(Tags::tableName());
        $this->dropTable(TagPost::tableName());
        $this->dropTable(Comment::tableName());

        return false;
    }

    /*
    // Use safeUp/safeDown to run migration code within a transaction
    public function safeUp()
    {
    }

    public function safeDown()
    {
    }
    */
}
