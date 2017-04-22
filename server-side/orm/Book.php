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
        $id = intval($bookId);
        if($id == null){
            return false;
        }
        else{
            // get the annoId for the book
            $result = $mysqli->query(
                "select Book.annoId from Book where Book.id =".intval($id)
            );
            $result_row = $result->fetch_array();
            $annoId = $result_row['annoId'];
            //find the range of pages
            $result = $mysqli->query(
                "select max(Annotation.pagenum) from Annotation where Annotation.id =".intval($annoId)
            );
            $result_row = $result->fetch_array();
            echo var_dump($result_row)." is the result row"."<br>";
            $max_page_num = intval($result_row['pagenum']);
            $this->pages = array();
            // all pages should start with 1
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
        $result_array = array(
            'pages' => $this->pages
        );
        return json_encode($result_array);
    }
}