<?php

return [
    'fields' => [
        'name'  => [ 'title' => 'Имя', 'require' => true ],
        'phone'  => [ 'title' => 'Телефон', 'require' => true ],
        'email'  => [ 'title' => 'Электронная почта', 'require' => false ],
        'message'  => [ 'title' => 'Сообщение', 'require' => false ],
        'question'  => [ 'title' => 'Вопрос', 'require' => false ]
    ],

    'subject' => 'Новое сообщение с сайта',

    'message' => [
        'title' => 'Отправка заявки',
        'success' => 'Сообщение отправлено!',
        'failure' => 'Сообщение не отправлено, произошла ошибка!',
        'empty' => 'Заполните поле',
        'empty_correct' => 'Заполните поле, корректно',
    ],

    'from' => 'ekostroi-yg@mail.ru',

    'emails' => [
        'info@newtime.biz',
        'ed.proff@gmail.com'
    ]
];
