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

    public function __construct($annoId, $pageNum){
        $mysqli = Page::connect();
        $symbol_table = $mysqli->query(
            "select Annotation.symbolId from Annotation where ( Annotation.id = ".intval($annoId)
            ."AND Annotation.pageNum = ".intval($pageNum).")"
        );

        $this->symbols = array();
        // construct the symbold array
        if($symbol_table){
            while($next_row = $message_table->fetch_array()){
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