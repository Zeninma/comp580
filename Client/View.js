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
var current_name='';
// the size of the picture
var pic_size;
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
        // dynamically change the layout
        var re=/^\/\d+\/\d+\/\d+\/([^\/]+)\/(?:(\d+)\/)?(?:\?.*)?$/,
        m=current.match(re);
        if(!m){
            noBookLayout();
        }else{
            bookLayout();
        }

		if(current != url){
			console.log('change', current);
            isBook(current);
			url=current;
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
        // pics on two sides
        $(".bottom_grid td").html('');
        layout_mode = 0;
    });
    $("#vertical").on('click', function(){
        $(".left_grid td").html('');
        $(".right_grid td").html('');
        // pics at bottom
        layout_mode = 1;
    });

    // bind the Notation click with change of the Annotation
    $(document).on('click', '#NotationDropDown',
    function(e){
        var clicked = $(e.target);
        var selected_id = clicked.data('id');
        $.ajax(url_base + '/hub.php/book',
            {type: "GET",
            async: false,
            dataType: "json",
            data: {"bookId":selected_id},
            success: function(book_json, status, jqXHR){
                // load the given book
                current_book = new Book(book_json);
                // also need to update the current page
                loadNotation(current_page_num);
            }
            })
    })
}

function noBookLayout(){
    var winWidth = $(window).innerWidth();
    var winHeight = $(window).innerHeight();
    var navBarHeight = $("#topNavBar").height();
    $(".bodyPart").css({"margin-top":navBarHeight+1});
    $('iframe').css({"width":winWidth, "height": winHeight - navBarHeight -1,"margin-left":0, "margin-right":0});
    $(".horizontal_grid").css({"height":0, "width": 0});
    $(".vertical_grid").css({"height":0, "width": 0});
}


function bookLayout(){
     // adjust the iframe's size dynamically
        var winWidth = $(window).innerWidth();
        var winHeight = $(window).innerHeight();
        var navBarHeight = $("#topNavBar").height();
        var iframeWidth = 0;
        var iframeHeight = 0;
        if(layout_mode == 0){
            // layout_mode == 0 indicates the horizontal layout
            pic_size = Math.floor(winWidth * 0.15)-1;
            iframeWidth = Math.floor(winWidth * 0.59);
            iframeHeight = winHeight - navBarHeight - 1;
            $(".bodyPart").css({"margin-top":navBarHeight+1});
            $(".horizontal_grid").css({"height":pic_size*4, "width": pic_size-2});
            $(".horizontal_grid td").css({"margin-left":0, "width": pic_size-2, "height":pic_size-2});
            $("iframe").css({"height":iframeHeight,"width":iframeWidth, "margin-left": pic_size+1, "margin-right": pic_size+1});
        }
        else{
            // question how to set up the table so it can become horizontal?
            pic_size = Math.floor(winWidth * 0.25);
            $(".bodyPart").css({"margin-top":navBarHeight+1 , "margin-left": 0, "margin-right": 0});
            iframeHeight =  $(".bodyPart").height - 2*pic_size-1;
            $("iframe").css({"height": iframeHeight, "width": winWidth, "margin-top": 0});
            $(".vertical_grid").css({"height":pic_size*2, "width": pic_size*4});
            $(".vertical_grid").css({"margin-top": iframeHeight,"margin-left":0, "margin-right":0});
            $(".vertical_grid td").css({"width": pic_size-2, "height":pic_size-2});
        }
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
        $('.picGrid td').html('');
        current_name = '';
        current_book = null;
        current_bookList = null;
        current_page_num = null;
        noBookLayout();
    }
    else if(m&&!m[2]){
        bookLayout();
        if (current_name == m[1]){
            loadNotation(current_page_num);
        }
        else{
            // at the first page
            current_name = m[1];
            // get a list of annotations bound with the book title
            get_Notation_list(current_name);
            var default_book_id = current_bookList.id_array[0];
            get_book(default_book_id);
            current_page_num = 1;
            loadNotation(current_page_num);
        }
    }
    else if(m[2]){
        bookLayout();
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
    $('.picGrid td').html('');
    for(var i = 0; i < limit; i++){
        var tmp_symbol = curr_page.symbols[i];
        var pic = tmp_symbol.pic_url;
        var text = tmp_symbol.words;
        var curr_td;
        var curr_img = $("<img>");
        curr_img.attr({"src":pic,"alt":text});
        curr_img.data("text",text);
        curr_img.css({"width":pic_size-2, "height":pic_size-2});
        if (layout_mode == 0){
            curr_td = $('.horizontal_grid #grid'+i);
            
        }
        else{
            curr_td = $('.vertical_grid #grid'+i);
        }
        curr_td.append(curr_img);
    }
}

function get_Notation_list(book_name){
    // given the book name,
    // query to the server to get a list
    // of versions of Annotations
      $.ajax(url_base + "/hub.php/bookList",
        {type: "GET",
        async: false,
        dataType: "json",
        data: {"bookName": book_name},
        success: function(book_list_json, status, jqXHR){
            // book_list_json has two fields:
            // 1.book_id_array
            // 2.book_name_array
            // Should reconstruct the option list
            // for versions of books.
            current_bookList = new BookList(book_list_json);
            // call the BookList.fll_notation
            current_bookList.fill_notation();
        },
        error: function(xhr, status, error){
            alert(error);
        }
    })
}


function get_book(book_id){
    // take the book_id
    // need to retrieve all the existing versions
    // of annotations for the book
    $.ajax(url_base+ '/hub.php/book',
        {
        type: "GET",
        async: false,
        crossDomain: true,
        xhrFields:{
            withCredentials: true
        },
        dataType: "json",
        data: {"bookId": book_id},
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