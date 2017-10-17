<?php

error_reporting( E_ALL );

if( !empty( $_SERVER['HTTP_X_REQUESTED_WITH'] ) && strtolower( $_SERVER['HTTP_X_REQUESTED_WITH'] ) == 'xmlhttprequest' )
{
	if( !session_id() ) {
		session_start();
	}

	defined('DS') || define('DS', DIRECTORY_SEPARATOR);

	$parse_url = parse_url($_SERVER["REQUEST_URI"]);

	$path = preg_split('/\/+/', $parse_url['path'], -1, PREG_SPLIT_NO_EMPTY);
	$controller = isset($path[1]) ? $path[1] : '';

	$config = require __DIR__ . DS . 'config.php';

	require_once  __DIR__ . DS . 'helpers.php';
	require_once  __DIR__ . DS . 'mmail.class.php';

	$model = 'message';

	$empty = $config['message']['empty'];
    $empty_correct = $config['message']['empty_correct'];

    if ($controller)
    {
        $response = [];

	    switch ($controller) {

	    	case 'send':

	    		if (count($_POST)) {
			        unset($_SESSION[$model]);

			        $validate = validate($model, $config['fields'], $_POST);

			        if (!empty($_SESSION[$model]['error']))
			        {
			        	$response = [
			    			'status'	=> false,
			    			'title'		=> $config['message']['title'],
				    		'errors'	=> $_SESSION[$model]['error']
			    		];
			        }
			        else
			        {
						$body = message($config['fields'], $_POST);

						if ($body)
						{
							$mail = new mMail();

				            foreach ($config['emails'] as $email)
				            {
				            	$mail->addTo($email);
				            }

							$mail->setSubject($config['subject']);

				            $mail->setFrom($config['from']);
				            $mail->setHtmlBody(iconv('utf-8', 'windows-1251', $body));

				            if ($mail->send())
				            {
				                unset($_SESSION[$model]);

				                $response = [
					    			'status'	=> true,
						    		'title'		=> $config['message']['title'],
						    		'message'   => $config['message']['success']
					    		];
				            }
							else
				            {
				                $response = [
					    			'status'	=> false,
					    			'title'		=> $config['message']['title'],
						    		'message'   => $config['message']['failure']
					    		];
							}
						}
						else
			            {
			                $response = [
				    			'status'	=> false,
				    			'title'		=> $config['message']['title'],
					    		'message'   => $config['message']['failure']
				    		];
						}
			        }
			    }
			break;
	    }

	    exit(json_encode($response, 64 | 256));
    }

	return true ;
}
