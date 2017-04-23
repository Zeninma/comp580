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
            echo "the result row for max pagenum is".var_dump($result_row)."<br>";
            $max_page_num = intval($result_row['max(Annotation.pagenum)']);
            $this->pages = array();
            // all pages should start with 1
            echo "max page num is : ".var_dump($max_page_num)."<br>";
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
}