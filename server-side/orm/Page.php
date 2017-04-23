 <?php
 class Page{
    // a list of all the Symbol objects that are in this page
    private $symbols;

    public static function connect(){
        return new mysqli( "classroom.cs.unc.edu",
        "zengao",
        "zengao",
        "zengaodb"
        );
    } 

    public function __construct($bookId, $pageNum){
        $mysqli = Page::connect();
        $symbol_table = $mysqli->query(
            "select Annotation.id from Annotation where ( Annotation.bookId = ".intval($bookId)
            ."AND Annotation.pageNum = ".intval($pageNum).")"
        );
        echo "select Annotation.id from Annotation where ( Annotation.bookId = ".intval($bookId)
            ."AND Annotation.pageNum = ".intval($pageNum).")".' is the query<br>';
        echo var_dump($symbol_table)." is the symbol table <br>";
        $this->symbols = array();
        // construct the symbold array
        if($symbol_table){
            while($next_row = $symbol_table->fetch_array()){
                $new_symbol = new Symbol($next_row['symbolId']);
                $this->symbold[] = $new_symbol->get_array();
            }
        }
        else{
            return false;
        }
    }

    public function get_array(){
        $result_array = array(
            'symbols' => $this->symbols
        );
        return $result_array;
    }
}