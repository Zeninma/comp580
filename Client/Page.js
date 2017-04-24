var Page = function(page_json){

    this.symbols = new Array();

    for(var symbol in page_json.symbols){
        tmp = new Symbol(symbol);
        this.symbols.push(tmp);
    }
}

