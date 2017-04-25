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

Book.prototype.dropDownList(book_list_json) = function(){
    // take the current path of the content inside iframe;
    // if current path is a book, m will be a list of string,
    // where m[1] = the title of the book, m[2] = the current page num
    return true;
}