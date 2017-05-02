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

function start(){
    // start the whole process
    setInterval(function(){
        // set the interval to check the current path
		var current=$('#my_iframe').get(0).contentWindow.location.pathname;
		if(current != url){
			console.log('change', current);
            isBook(current);
			url=current;
		}
        // adjust the iframe's size dynamically
        if(layout_mode == 0){
            // layout_mode == 0 indicates the horizontal layout
            var winWidth = $(window).innerWidth();
            var winHeight = $(window).innerHeight();
            var navBarHeight = $("#topNavBar").height();
            var iframeWidth = Math.floor(winWidth * 0.69);
            var iframeHeight = winHeight - navBarHeight - 1;
            $(".bodyPart").css("margin-top",navBarHeight+1);
            $("iframe").css("height",iframeHeight);
        }
        else{
            // question how to set up the table so it can become horizontal?
            return;
        }
	}, 200);

    // bound the click event with voice
     $(document).on('click','.picGrid',
    function(e){
        var clicked = $(e.target);
        var text = clicked.data("text");
        responsiveVoice.speak(text);
    });

    // bound the View click event with layout change
    $("#horizontal").on('click',function(){
        layout_mode = 0;
    });
    $("#vertical").on('click', function(){
        layout_mode = 1;
    });

    // bind the Notation click with change of the Annotation
    $(document).on('click', '#NotationDropDown',
    function(e){
        var clicked = $(e.target);
        var selected_id = clicked.data('id');
        $.ajax(url_base + '/hub.php/book/' + selected_id,
            {type: "GET",
            dataType: "json",
            success: function(book_json, status, jqXHR){
                // load the given book
                current_book = new BookList(book_json);
                // also need to update the current page
                loadNotation(current_page_num);
            }
            })
    })
}


function isBook(current){
    // take the current path of the content inside iframe;
    // if current path is a book, m will be a list of string,
    // where m[1] = the title of the book, m[2] = the current page num
    var re=/^\/\d+\/\d+\/\d+\/([^\/]+)\/(?:(\d+)\/)?(?:\?.*)?$/,
	m=current.match(re);
    if(!m){
        // not in a book page
        // Hence might be out of the book
        // clear the current_name and current_book
        current_name = '';
        current_book = null;
        current_bookList = null;
        current_page_num = null;
        return;
    }
    else if(m&&!m[2]){
        // at the first page
            // entered before, no need to reload the book
           // first time into the book, need to initialize
           // the book and load the book list 
        current_name = m[1];
        get_Notation_list(current_name);
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
    // number of symbols that are defined and can be added to the
    // page
    var limit = Math.min(curr_page.symbols.length, grid_num_max)-1;
    for(var i = 0; i < limit; i++){
        var tmp_symbol = curr_page.symbols[i];
        var pic = tmp_symbol.pic_url;
        var text = tmp_symbol.words;
        var curr_td = $('#grid'+i);
        curr_td.html('<img src = "'+pic+'" alt = "pics" style = "width: 100%">');
        var curr_img = $('#grid'+i+' img');
        curr_img.data("text",text);
        var tmp = curr_img.data();
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
            // call the BookList.fll_notation
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

$(document).ready(
    // The following function constantly check the current path
    // If path is changed, call function isBook
    start()
);