<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
    session_start();
    
    require_once('orm/Book.php');
    require_once('orm/Page.php');
    require_once('orm/Symbol.php');

    if(isset($_SERVER['PATH_INFO'])){
        $path_components = explode('/', $_SERVER['PATH_INFO']);
    }
    else{
        $path_components = NULL;
        exit();
    }

    if($_SERVER['REQUEST_METHOD'] == "GET"){
        echo var_dump($_GET)."<br>";
        $bookId = intval($_GET["bookId"]);
        $book = new Book($bookId);
        if($bookId == NULL){
            header("HTTP/1.0 404 NOT FOUND");
            print("Id: ".$bookId." Not Found");
            exit();
        }
        else{
            header("Content-type: application/json");
            print($book->get_json());
            exit();
        }
    }