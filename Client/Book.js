var Book = function(book_json){
    // Book object, is constructed directly with 
    // the json object returned by the ajax request.

    //field pages is an array that contains Page object.
    this.pages = new Array();
    
    for (var page in book_json.pages){
        // initialization of field pages
        tmp = new Page(page);
        this.pages.push(tmp);
    }
}