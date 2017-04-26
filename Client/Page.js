var Page = function(page_json){

    this.symbols = new Array();

    for(var i = 0; i < page_json.symbols.length; i++){
        tmp = new Symbol(page_json.symbols[i]);
        this.symbols.push(tmp);
    }
}

