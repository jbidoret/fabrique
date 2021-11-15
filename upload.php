<?php
    // Takes raw data from the request
    $json = file_get_contents('php://input');

    // Converts it into a PHP object
    $data = json_decode($json);
    
    function slugify($text) {
        $text = preg_replace('~[^\pL\d]+~u', '-', $text);
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
        $text = preg_replace('~[^-\w]+~', '', $text);
        $text = trim($text, '-');
        $text = preg_replace('~-+~', '-', $text);
        $text = strtolower($text);
        if (empty($text)) {
            return 'n-a';
        }
        return $text;
    }

    $img = $data->imgBase64;
    $username = slugify($data->username);
    
    $filename = '_collages/' . $username . '-' . sha1($username . uniqid('',true)) . '.png'; // this will generate a 40-character-long random name
    
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $fileData = base64_decode($img);

    if($fileData){
        file_put_contents($filename, $fileData);
        header('Content-type: application/json');
        echo json_encode(['status_code'=>200, "message"=>$data->username]);
    } else {
        header('Content-type: application/json');
        echo json_encode(['status_code'=>500, "message"=>'I tried but it failed… Sorry ' . $data->username]);
    }
  
?>