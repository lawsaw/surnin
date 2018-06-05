<?php
return [
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            'viewPath' => "@common/mail",
            'transport' => [
                'class' => 'Swift_SmtpTransport',
                'host' => 'smtp.gmail.com',
                'username' => 'team@dicomaas.com',
                'password' => 'Qazxsw123',
                'port' => 465,
                'encryption' => 'ssl'
            ]
        ],
        'authManager' => [
            'class' => 'yii\rbac\PhpManager',
            'defaultRoles' => ['user', 'admin'],
            'itemFile' => '@common/config/rbac/items.php',
            'assignmentFile' => '@common/config/rbac/assignments.php',
            'ruleFile' => '@common/config/rbac/rules.php'
        ],
        'i18n' => [
            'translations' => [
                'backend' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                    'basePath' => '@common/messages',
                    'sourceLanguage' => 'en-US',
                    'fileMap' => [
                        'backend' => 'backend.php'
                    ],
                ],
                'frontend' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                    'basePath' => '@common/messages',
                    'sourceLanguage' => 'en-US',
                    'fileMap' => [
                        'frontend' => 'frontend.php'
                    ],
                ],
            ],
        ],
    ],
];
