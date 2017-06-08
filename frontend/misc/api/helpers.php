<?php

function validate($model = 'message', $fields = [], $data = [])
{
    $_status = true;

    if (!empty($data))
    {
        foreach ($data as $name => $value) {
            if (!isset($fields[$name]) || (!$value && $fields[$name]['require'] === true))
            {
                $_status = false;
                $_SESSION[$model]['error'][$name] = true;
            }
        }
    }

    return $_status;
}

function message($fields = [], $data = [])
{
    $html = "";

    if (!empty($data))
    {
        $m = '';

        foreach ($data as $name => $value)
        {
            if (isset($fields[$name]) && $value)
            {
                $m .= '<p><strong>' . $fields[$name]['title'] . ':</strong> '. stripslashes($value).'</p>';
            }
        }

        if ($m)
        {
            $html .= '<html><body>';
            $html .= '<table width="100%" cellspacing="0" cellpadding="0" border="0">';
            $html .= '<tr>';
            $html .= '<td align="center">';
            $html .= '<table width="600" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">';
            $html .= '<tr>';
            $html .= '<td colspan="3"><img src="/images/logo.png" width="215" height="59" /></td>';
            $html .= '</tr>';
            $html .= '<tr>';
            $html .= '<td colspan="3" height="15"></td>';
            $html .= '</tr>';
            $html .= '<tr>';
            $html .= '<td colspan="3" align="center">';
            $html .= '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; line-height: 17px; font-family: sans-serif;">';
            $html .= '<tr>';
            $html .= '<td>';

            $html .= '<p>Здравствуйте!</p>';
            $html .= '<p>Новое сообщение с сайта</p>';
            $html .= '<p>Дата отправки: <b>'. date( 'd.m.Y H:i:s' ) .'</b></p>';

            $html .= $m;

            $html .= '</td>';
            $html .= '</tr>';
            $html .= '</table>';
            $html .= '</td>';
            $html .= '</tr>';
            $html .= '</table>';
            $html .= '</td>';
            $html .= '</tr>';
            $html .= '</table>';
            $html .= '</body></html>';
        }
    }

    return $html;
}