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
        tmp_li.html(name_array[i]);
        dropDown.append(tmp_li);
    }
}

//  tmp_li.on( 'click',
//             function(e){
//             // retrieve the corresponding book object
//             // change the current book to the retrieved one
//             var book_id = tmp_li.data('id');
            //  $.ajax(url_base+ '/hub.php/book/'+ book_id,
            //         {
            //         type: "GET",
            //         crossDomain: true,
            //         xhrFields:{
            //             withCredentials: true
            //         },
            //         dataType: "json",
            //         success: function(book_json, status, jqXHR){
            //             current_book = new Book(book_json);
                    //     // current_book.addNotation();
                    // }
//                 })
//             }
//         );