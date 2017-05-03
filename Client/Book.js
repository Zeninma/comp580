var Book = function(book_json){
    // Book object, is constructed directly with 
    // the json object returned by the ajax request.

    //field pages is an array that contains Page object.
    this.pages = new Array();
    
    for (var i = 0; i < book_json.pages.length; i++){
        // initialization of field pages
        tmp = new Page(book_json.pages[i]);
        this.pages.push(tmp);
    }
}