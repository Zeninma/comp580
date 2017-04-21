<?php
class Book{
    private $bookName;
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
        if($result){
            return true;
        }
        else{
            return false;
        }
    }

    public function __construct($bookName){
        // to construct a book 
        $mysqli = Book::connect();
        $result = $mysqli->query(
            "select Book.id from Book where Book.bookname='".$mysqli->real_escape_string($bookName)."'"
        );
        $result_row = $result->fetch_array();
        $id = $result_row['id'];
        if($id == null){
            return false;
        }
        else{
            //find the range of pages
            $result = $mysqli->query(
                "select max(Annotatin.pageNum) from Annotation where Annotation.bookId =".intval($id)
            );
            $result_row = $result->fetch_array();
            $max_page_num = intval($result_row['id']);
            $this->pages = array();
            for($i = 1; $i <= $max_page_num; $i++){
                // for each existing page, add the Page to the pages array
                $new_page = new Page($id, $i);
                $this->pages[] = $new_page->get_array();
            }
            return true;
        }
        // use the id to construct the pages object
    }

    public function get_json(){
        $restul_array = array(
            'name' => $this->bookName,
            'pages' => $this->pages
        );
        return json_encode($result_array);
    }
}