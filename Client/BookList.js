var BookList = function(bookList_json){
    // BookList wraps the bookList_json object retrieves
    // by get_Notation_List
    this.id_array = bookList_json.id_array;
    this.name_array = bookList_json.annoName_array;
    this.len = this.id_array.length;
}

BookList.prototype.fill_notation = function(){
    // fill the Notation dropdown on the navbar
    // with all the notation it gets
    var id_array = this.id_array;
    var name_array = this.name_array;
    var dropDown = $("#NotationDropDown");
    // clear the previous elements in the nav
    dropDown.html("");
    for(var i=0; i<this.len; i++){
        var tmp_li = $('<li></li>');
        // bind the book id with the li
        tmp_li.data("id",id_array[i]);
        tmp_li.html('<a>'+name_array[i]+'</a>');
        dropDown.append(tmp_li);
    }
}