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
        parse_str($_SERVER['QUERY_STRING'], $_GET);
        echo var_dump($path_components)." is the path components <br>";
        echo var_dump($_SERVER['QUERY_STRING'])." is the query string <br>";
        echo var_dump($_REQUEST)." is the REQUEST <br>";
        echo var_dump($_GET);
       if((count($path_components)==2)&&($path_components[1]== "book")){
           $bookId = intval($_GET['bookId']);
           if(is_null($bookId)){
                header("HTTP/1.0 404 NOT FOUND");
                print("Book Not Found");
                exit();
            }
            else{
                $book = new Book($bookId);
                header("Content-type: application/json");
                print($book->get_json());
                exit();
            }
       }
    }
    else if((count($path_components)==2)&&($path_components[1]== "bookList")){
        $bookName = $_GET['bookName'];
        if(is_null($bookName)){
            header("HTTP/1.0 404 NOT FOUND");
            print("Book Name Not Found");
            exit();
        }
        else{
            $bookList = Book::getBookList($bookName);
            header("Content-type: application/json");
            print(json_encode($bookList));
        }
    }
    else{
        // Need to fill with extra Post method
        exit();
    }
     