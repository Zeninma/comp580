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
    var dropDown = $("#NotationDropDown li");
    // clear the previous elements in the nav
    dropDown.html('');
    for(var i=0; i<this.len; i++){
        var tmp_li = $('<li><a></a></li>');
        // bind the book id with the li
        tmp_li.data("id", this.id_array[i]);
        tmp_li.html(this.name_array[i]);
        dropDown.append(tmp_li);
    }
}