<?php

class Db {

    private static $db = null;
    private static $stmt;

    private static function getDb(){
        if(!isset(self::$db)){
            try{
                $dsn = 'mysql:host=localhost;dbname=pizza_db;port=3306;charset=utf8';
                $user = 'root';
                self::$db = new PDO($dsn, $user, '');
            }
            catch(PDOException $e){
                var_dump($e);
                exit();
            }
        }
        return self::$db;
    }

    private static function query($sql, $params = null){
        try{
            $stmt = self::getDb()->prepare($sql);
            $resp = $stmt->execute($params);
            self::$stmt = $stmt;
        }
        catch(PDOException $e){
            var_dump($e);
            exit();
        }
        return $resp;
    }

    public static function select($table, $params){
        $id = $params['id'];
        $pWhere = $params['where'];
        $order = $params['orderBy'];
        $where = null;
        $orderBy = null;
        $params = [];

        // Construction des conditions
        if(!empty($id)){
            $where = 'id = ?';
            $params[] = $id;
        }
        if(!empty($pWhere)){
            if(!empty($id)){
                $where .= " AND ".$pWhere['columns']." = ?";
            }
            else{
                $where = $pWhere['columns']." = ?";
            }
            $params[] = $pWhere['value'];
        }
        if(!empty($order)){
            $orderBy = "$order ASC";
        }

        // Construction de la requête
        $sql = "SELECT * FROM $table";
        if(isset($where)){
            $sql .= " WHERE $where";
        }
        if(isset($orderBy)){
            $sql .= " ORDER BY $orderBy";
        }
        $resp = self::query($sql, $params);
        $data = self::$stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($data);
    }

    public static function insert($table, $value = null){
        $columns = '';
        $val = '';
        $params = [];
        if(isset($value)){
            foreach($value as $k => $v){
                if($k != 'id'){
                    $columns .= "$k,";
                    $val .= "?,";
                    $params[] = $v;
                }
            }
            $columns = trim($columns, ',');
            $val = trim($val, ',');
            $sql = "INSERT INTO $table ($columns) VALUES ($val)";
        }
        else{
            $sql = "INSERT INTO $table (id) VALUES (null)";
        }
        // var_dump($sql);
        // var_dump($params);
        $resp = self::query($sql, $params);
        if($resp){
            $resp = self::$db->lastInsertId();
        }
        return json_encode($resp);
    }

    public static function update($table, $value){
        $set = "";
        $where = null;
        $params = [];
        $id = null;
        foreach($value as $k => $v){
            if($k == 'id'){
                $where = "$k = ?";
                $id = $v;
            }
            else{
                $set .= "$k = ?,";
                $params[] = $v;
            }
        }
        $params[] = $id;
        $set = trim($set, ',');
        $sql = "UPDATE $table SET $set WHERE $where";
        $resp = self::query($sql, $params);
        return json_encode($resp);
    }

    public static function delete($table, $id){
        $sql = "DELETE FROM $table WHERE id = ?";
        $params = [];
        $params[] = $id;
        $resp = self::query($sql, $params);
        return json_encode($resp);
    }
}