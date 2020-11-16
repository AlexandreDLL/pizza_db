<?php

    switch($_SERVER['REQUEST_METHOD']){
        case 'GET':
            $_get = validate_request($_GET);
            echo json_encode($_get);
            break;
        case 'POST':
            $_post = validate_request($_POST);
            echo json_encode($_post);
            break;
        case 'PUT':
            $_put = json_decode(file_get_contents('php://input'), true);
            $_put = validate_request($_put);
            echo json_encode($_put);
            break;
        case 'DELETE':
            $_del = json_decode(file_get_contents('php://input'), true);
            $_del = validate_request($_del);
            echo json_encode($_del);
            break;
    }

    function validate_request($request)
    {
        foreach ($request as $k => $v) {
            if(is_array($v)){
                validate_request($v);
            }
            else{
                $request[$k] = htmlspecialchars(strip_tags(stripslashes(trim($v))));
            }
        }
        return $request;
    }