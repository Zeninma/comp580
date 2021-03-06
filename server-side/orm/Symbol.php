<?php
class Symbol{
    // a string represents the url for the picture
    private $url;
    // a string represents the words to say when 
    // the picture is clicked
    private $words_to_say;

    public static function connect(){
        return new mysqli( "classroom.cs.unc.edu",
        "zengao",
        "zengao",
        "zengaodb"
        );
    } 

    public function __construct($id){
        $mysqli = Symbol::connect();
        $result = $mysqli->query(
            "select Symbol.url, Symbol.wordstosay from Symbol where Symbol.id = ".intval($id)
        );
        if($result){
            $result_row = $result->fetch_array();
            $this->url = $result_row['url'];
            $this->words_to_say = $result_row['wordstosay'];
        }
        else{
            return false;
        }
    }

    public function getStandardSet(){
        $mysqli = Symbol::connect();
        $result = $mysqli->query(
            "select * from Symbol where Symbol.id <=".intval(36)
        );
        $standardSet = array();
        if($result){
            while($next_row = $result->fetch_array()){
                $tmp_id = intval($next_row['id']);
                $tmp_word = $next_row['wordstosay'];
                $tmp_url = $next_row['url'];
                $tmp_symbol = array(
                    'id'=>$tmp_id,
                    'text'=>$tmp_word,
                    'url'=>$tmp_url
                );
                $standardSet[] = $tmp_symbol;
            }
            return $standardSet;
        }
        else{
            return false;
        }
    }

    public function addSymbol($url, $text){
        $mysqli = Symbol::connect();
         $result = $mysqli->query(
            'insert into Symbol (url, wordstosay) values ("'.$url.'","'.$text.'")'
        );
        if($result){
            $id = $mysqli->insert_id;
            return $id;
        }
        else{
            return false;
        }
    }

    public function get_array(){
        $result_array = array(
            'url' => $this->url,
            'words_to_say' => $this->words_to_say
        );
        return $result_array;
    }
}