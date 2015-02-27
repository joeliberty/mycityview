<?php 
    // $filename = $argv[1];
    // var_dump($filename);
    // foreach ($_GET as $k => $v) {
    //    echo "$k = $v<br />";
    //  }
    // echo "SERVER_NAME : " . $_SERVER['SERVER_NAME'] . "<br />";
    // exit;
    // $server = $_SERVER['SERVER_NAME'];
    // if($server == 'localhost') {
    //     $path = 'localhost/mycityview/';
    // } else {
    //     $path = $server;
    // }


    $filename = isset($_GET['filename']) ? $_GET['filename'] : 'default';
    $path = $filename;
    // $path = $path . $filename;
    // echo 'path: ' . $path . '<br/>';
    // $path = dirname(__DIR__) . $filename;
    //echo '$path: ' . $path; 
    // echo 'path: ' . $path;
    $path_list = glob($path . '*');
    // echo 'cnt: ' . count($path_list);
    // echo implode(",",$path_list);
    // exit;
    $files = array();
    foreach ($path_list as $file_path) {
        $file = array();
        $file_path = str_replace('../','',$file_path);
        $file['file'] = $file_path;
        // var_dump('file: ' . $file_path);
        array_push($files,$file);
    }
    echo json_encode($files);
    // var_dump($files);

    // $i = 0; 
    // $dir = 'adelaide/';
    // if ($handle = opendir($dir)) {
    //     while (($file = readdir($handle)) !== false){
    //         if (!in_array($file, array('.', '..')) && !is_dir($dir.$file)) 
    //         $i++;
    //     }
    // }
    // prints out how many were in the directory
    // sort($files);

    // print_r($files);

    // rsort($files);

    // print_r($files);
?>