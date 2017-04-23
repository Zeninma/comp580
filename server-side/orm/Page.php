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
            "select Annotation.symbolId from Annotation where ( Annotation.bookId = ".intval($bookId)
            ." AND Annotation.pageNum = ".intval($pageNum).")"
        );
        $this->symbols = array();
        // construct the symbold array
        if($symbol_table){
            while($next_row = $symbol_table->fetch_array()){
                echo var_dump($next_row)."is the next symbol <br>";
                $new_symbol = new Symbol(intval($next_row['symbolId']));
                $this->symbols[] = $new_symbol->get_array();
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