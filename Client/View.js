// url_base is the a constant string,
// containing the base path
var full_url_base = "http://wwwp.cs.unc.edu/Courses/comp580-s17/users/zengao/CHAIR/server-side";
var url_base = "/CHAIR/server-side";
var url;
// total number of max value of pics allowd on the side bars
var grid_num_max = 8;
// current_book is a global variable
// which holds the Book object of the
// book annotation of the current page
// NOTE: remeber to unset it after the
// user quit the reading process.
var current_book;
var current_bookList;
var current_name;
// current_page_num is int, which holds
// the current page number of the book
// start from 1
var current_page_num;
// layout_mode is int, which holds
// the current mode to display the annotations:
// 0: the annotations are on the left and right sides;
// 1: the annotations are all placed on the bottom;
// default to be 0
var layout_mode = 0;

function isBook(current){
    // take the current path of the content inside iframe;
    // if current path is a book, m will be a list of string,
    // where m[1] = the title of the book, m[2] = the current page num
    var re=/^\/\d+\/\d+\/\d+\/([^\/]+)\/(?:(\d+)\/)?(?:\?.*)?$/,
	m=current.match(re);
    if(!m){
        // not in a book page
        return;
    }
    else if(m&&!m[2]){
        // at the first page
        // initialize the dropdown list
        // retrieve default book
        var book_title = m[1];
        get_Notation_list(book_title);
        var default_book_id = current_bookList.id_array[0];
        get_book(default_book_id);
        current_page_num = 1;
        loadNotation(current_page_num);
    }
    else if(m[2]){
        // at later pages
        current_page_num = m[2];
        loadNotation(current_page_num);
    }
    else{
        return;
    }
}

function loadNotation(page_num){
    // find the Page object corresponding to the current
    // page, and load all the symbols
    var curr_page = current_book.pages[page_num-1];
    var limit = Math.min(curr_page.symbols.length, grid_num_max)-1;
    for(var i = 0; i < limit; i++){
        var tmp_symbol = curr_page.symbols[i];
        var pic = tmp_symbol.pic_url;
        var text = tmp_symbol.words;
        var curr_td = $('#grid'+i);
        curr_td.html('<img src = "'+pic+'" alt = "pics" style = "width: 100%">');
        var curr_img = $('#grid'+i+' img');
        jQuery.data(curr_img ,"text",text);
    }
}

function get_Notation_list(book_title){
    // given the book name,
    // query to the server to get a list
    // of versions of Annotations
      $.ajax(url_base + "/hub.php/bookList/"+book_title,
        {type: "GET",
        dataType: "json",
        success: function(book_list_json, status, jqXHR){
            // book_list_json has two fields:
            // 1.book_id_array
            // 2.book_name_array
            // Should reconstruct the option list
            // for versions of books.
            current_bookList = new BookList(book_list_json);
            current_bookList.fill_notation();
        }
    })
}


function get_book(book_id){
    // take the book_id
    // need to retrieve all the existing versions
    // of annotations for the book
    $.ajax(url_base+ '/hub.php/book/'+book_id,
        {
        type: "GET",
        crossDomain: true,
        xhrFields:{
            withCredentials: true
        },
        dataType: "json",
        success: function(book_json, status, jqXHR){
            current_book = new Book(book_json);
        }
    })
}

function hideGrid(){
     $('#left_grid').html('');
}

 $(document).on('click','.picGrid',
    function(e){
        var clicked = e.target;
        var text = jQuery.data(clicked, "text")
        responsiveVoice.speak(text);
    })

$(document).ready(
    // The following function constantly check the current path
    // If path is changed, call function isBook
    setInterval(function(){
		var current=$('#my_iframe').get(0).contentWindow.location.pathname;
		if(current != url){
			console.log('change', current);
            isBook(current);
			url=current;
		}
	}, 200),
);