<?php
class Book{
    private $bookId;
    // an array of page
    private $pages;
    // String reprents the name of the annotation
    private $annoName;

    public static function connect(){
        return new mysqli( "classroom.cs.unc.edu",
        "zengao",
        "zengao",
        "zengaodb"
        );
    }

    public static function addNewBook($bookName, $annoName, $annotations){
        // To add new book
       $mysqli = Book::connect();
       echo var_dump($bookName).",".var_dump($annoName)."<br>";
       $result = $mysqli -> query(
            'insert into Book (bookName, annoName) values ("'.$bookName.'","'.'"'.$annoName.'")'
        );
        // NOTE that, $resut also contain id for the new book object
        if($result){
            $bookId = $result->insert_id;
            foreach($annotations as $annotation){
                $pageNum = intval($annotation["pagenum"]);
                $symbolId = intval($annotation["symbolID"]);
                $mysqli->query(
                    'insert into Annotation (bookId, pagenum, symbolID) values ('.$bookId.','.$pageNum.','.$symbolId.')'
                );
            }
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
            // find the name of the book
            $result = $mysqli->query(
                "select Book.annoName from Book where Book.id = ".intval($bookId)
            );
            if($result){
                $result_row = $result->fetch_array();
                $this->annoName = $result_row['annoName'];
            }
            else{
                header("HTTP/1.0 404 NOT FOUND");
                print("No Book with ID ".$bookId." exists");
                exit();
            }
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
            "select Book.id, Book.annoName from Book where Book.bookName = '".
            $mysqli->real_escape_string($bookName)."'"
        );
        $book_id_list = array();
        $book_annoName_list = array();
        if($result){
           while($next_row = $result->fetch_array()){
               $new_id = intval($next_row['id']);
               $new_annoName = $next_row['annoName'];
               $book_id_list[] = $new_id;
               $book_annoName_list[] = $new_annoName;
           }
        $result_array = array(
            'id_array' => $book_id_list,
            'annoName_array' => $book_annoName_list
        );
        return $result_array;
        }
        else{
            header("HTTP/1.0 404 NOT FOUND");
            print("Book: ".$bookName." Not Found");
            exit();
 
        }
    }
}