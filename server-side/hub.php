<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
    session_start();
    
    require_once('orm/Book.php');
    require_once('orm/Page.php');
    require_once('orm/Symbol.php');

    echo var_dump($_GET)." this is var_dump <br>";
    if(isset($_SERVER['PATH_INFO'])){
        $path_components = explode('/', $_SERVER['PATH_INFO']);
    }
    else{
        $path_components = NULL;
        exit();
    }

    if($_SERVER['REQUEST_METHOD'] == "GET"){
        if ((count($path_components)==3)&&($path_components[1] == "book")){
            $bookId = intval($path_components[2]);
           if(is_null($bookId)){
                header("HTTP/1.0 404 NOT FOUND");
                print("Missing Parameter bookId");
                exit();
            }
            else{
                $book = new Book($bookId);
                header("Content-type: application/json");
                print($book->get_json());
                exit();
            }
        }
        else if ((count($path_components)==3)&&($path_components[1] == "bookList")){
            $bookName = trim($path_components[2]);
            if(is_null($bookName)){
                header("HTTP/1.0 404 NOT FOUND");
                print("Missing Parameter bookName");
                exit();
            }
            else{
                $bookList = Book::getBookList($bookName);
                $bookListJson = json_encode($bookList);
                header("Content-type: application/json");
                print($bookListJson);
                exit();
            }
        }
        // The following may need to be deleted
        else{
            exit();
        }
    }
    else{
        // Need to fill with extra Post method
        exit();
    }
     