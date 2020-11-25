<?php

include('Db.php');

switch($_SERVER['REQUEST_METHOD']){
    case 'GET':
        $_get = validate_request($_GET);
        $table = isset($_get['table']) ? $_get['table'] : null;
        if(!isset($table)){
            echo json_encode(false);
            break;
        }
        echo Db::select($table, $_get['params']);
        break;
    case 'POST':
        $_post = validate_request($_POST);
        // var_dump($_post);
        $table = isset($_post['table']) ? $_post['table'] : null;
        if(!isset($table)){
            echo json_encode(false);
            break;
        }
        echo Db::insert($table, $_post['params']);
        break;
    case 'PUT':
        $_put = json_decode(file_get_contents('php://input'), true);
        $_put = validate_request($_put);
        $table = isset($_put['table']) ? $_put['table'] : null;
        $id = isset($_put['params']['id']) ? $_put['params']['id'] : null;
        if(!isset($table) || !isset($id)){
            echo json_encode(false);
            break;
        }
        echo Db::update($table, $_put['params']);
        break;
    case 'DELETE':
        $_del = json_decode(file_get_contents('php://input'), true);
        $_del = validate_request($_del);
        $table = isset($_del['table']) ? $_del['table'] : null;
        $id = isset($_del['id']) ? $_del['id'] : null;
        if(!isset($table) || !isset($id)){
            echo json_encode(false);
            break;
        }
        echo Db::delete($table, $id);
        break;
}
