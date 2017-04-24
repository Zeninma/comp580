<?php
class Book{
    private $bookId;
    // an array of page
    private $pages;

    public static function connect(){
        return new mysqli( "classroom.cs.unc.edu",
        "zengao",
        "zengao",
        "zengaodb"
        );
    }

    public static function addNewBook($bookName){
        // To add new book
       $mysqli = Book::connect();
       $result = $mysqli -> query(
            "insert into Book (bookName) values('".$mysqli->real_escape_string($bookName)."')"
        );
        // NOTE that, $resut also contain id for the new book object
        if($result){
            return true;
        }
        else{
            return false;
        }
    }

    public function __construct($bookId){
        // to construct a book 
        $mysqli = Book::connect();
        $bookId = intval($bookId);
        if($bookId == null){
            return false;
        }
        else{
            //find the range of pages
            $result = $mysqli->query(
                "select max(Annotation.pagenum) from Annotation where Annotation.bookId =".intval($bookId)
            );
            $result_row = $result->fetch_array();
            $max_page_num = intval($result_row['max(Annotation.pagenum)']);
            $this->pages = array();
            // all pages should start with 1
            for($i = 1; $i <= $max_page_num; $i++){
                // for each existing page, add the Page to the pages array
                $new_page = new Page($bookId, $i);
                $this->pages[] = $new_page->get_array();
            }
            return true;
        }
        // use the id to construct the pages object
    }

    public function get_json(){
        $result_array = array(
            'pages' => $this->pages
        );
        return json_encode($result_array);
    }

    public static function getBookList($bookName){
        // given a string, which contains the book name
        // return an array of corresponding book ids.
        $mysqli = Book::connect();
        $result = $mysqli->query(
            "select Book.id from Book where Book.bookName = '".
            $mysqli->real_escape_string($bookName)."'"
        );
        $book_id_list = array();
        if($result){
           while($next_row = $result->fetch_array()){
               $new_id = intval(next_row['id']);
               $book_id_list[] = $new_id;
           }
        return $book_id_list;
        }
        else{
            header("HTTP/1.0 404 NOT FOUND");
            print("Book: ".$bookName." Not Found");
            exit();
 
        }
    }
}