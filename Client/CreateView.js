var book_title;
var pageNum;
var url_base = "/CHAIR/server-side";
var currPage;
// array holds all 8 ids of the symbols added to the current page
var addedImg;
var annoName = "test";
// the book is a BookPost object that is going to be sent to the server
// book.pages is a pagePost object here
var book = new Array();

function start(){
    // set the name of the book title
    book_title = window.location.href.split('#')[1];
    // find the number of page of the book
    $.ajax('http://test.tarheelreader.org/book-as-json/',
    {type:"GET",
    dataType:"json",
    data:{"slug": book_title},
    success: function(book_json, status, jqXHR){
        pageNum = book_json.pages.length;
    }});

    // get a set of symbol
    // where each symbol contains symbolId, url, text
    $.ajax(url_base + '/hub.php/standardSymbol',
    {type: "GET",
    success: function(symbol_set_json, status, jqXHR){
        loadStandardSymbols(symbol_set_json);
    }});

    curr_page = 1;
    addedImg = new Array();


    $(document).on('click', '#standardSymbols .row div',function(e){
        if(addedImg.length<8){
            var clicked = $(e.target);
            var imgUrl = clicked.data("url");
            addedImg.push(imgUrl);
            var new_div = $('<div></div>');
            new_div.data("idx",curr_page-1);
            new_div.attr("class","class","col-lg-3 col-md-4 col-xs-6 thumb");
            var new_a = $('<a class="thumbnail"></a>');
            var new_img = $('<img class="img-responsive" src="'+imgUrl+'">');
            var new_button = $('<button type= "button">delete</button>');
            new_button.on('click',function(){
                addedImg.splice(new_div.data("idx"),1);
                new_div.remove();
            })
            new_a.append(new_img);
            new_div.append(new_a);
            $("#addedImg row").append(new_div);
        }
        else{
             $("#alertDiv").attr("class","alert alert-warning alert-dismissable")
            $(".alert-warning").html(' <a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>'+
            ' <strong>Warning</strong> You need to add 8 images per page');
        }
    })

    $("#complete").on('click',function(){
        //construct a pagePost object
        var tmp_page = new PagePost(addedImg);
        book.push(tmp_page);
        $("#alertDiv").attr("class","alert alert-success alert-dismissable");
        $(".alert-warning").html(' <a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>'+
            ' <strong>Success!</strong> Added new set of annotations for page '+currPage);
        if(currPage == pageNum){
            uploadBook();
        }
        else{
            currPage ++;
            addedImg = new Array();
            $("#addedImg row").html('');
        }
    })

    $("#submitbtn").on('click',function(e){
       if(addedImg.length<8){
         $.ajax(url_base+"/hub.php/symbol",
            {type: "GET",
            dataType: "json",
            data: $("#cusForm").serialize(),
            success: function(idJson, status, jqXHR){
                var givenId = parseInt(idJson.id);
                var url = $('input[name="url"]').val();
                var text = $('input[name="text"]').val();
                addedImg.push(url);
                var new_div = $('<div></div>');
                new_div.data("idx",curr_page-1);
                new_div.attr("class","class","col-lg-3 col-md-4 col-xs-6 thumb");
                var new_a = $('<a class="thumbnail"></a>');
                var new_img = $('<img class="img-responsive" src="'+imgUrl+'">');
                var new_button = $('<button type= "button">delete</button>');
                new_button.on('click',function(){
                    addedImg.splice(new_div.data("idx"),1);
                    new_div.remove();
                })
                new_a.append(new_img);
                new_div.append(new_a);
                $("#addedImg row").append(new_div);
            }})
       }
       else{
         $(".alert-warning").html(' <a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>'+
            ' <strong>Warning</strong> You need to add 8 images per page');
       }
    })
}

function loadStandardSymbols(symbol_set_json){
    var url, text, id;
    var container= $("#standardSymbols");
    var count = 0;
    for(var i=0; i < Math.ceil(symbol_set_json.length/4); i++){
        var new_row = $('<div class="row"></div>');
       for(var j=0; j<4; j++){
            url = symbol_set_json[count].url;
            text = symbol_set_json[count].text;
            id = symbol_set_json[count].id;
            var new_div = $("<div> <div>"); 
            new_div.attr("class","col-lg-3 col-md-4 col-xs-6 thumb");
            var new_a = $('<a class="thumbnail"></a>');
            var new_img = $('<img class="img-responsive" src="'+url+'">');
            var new_span = $('<span style = "width:100%; text-align: center;">'+text+'</span>');
            new_img.data({"url":url,"text":text,"id":id});
            new_a.append(new_img);
            new_a.append(new_span);
            new_div.append(new_a);
            new_row.append(new_div);
            count++;
            if(count == symbol_set_json.length){
                break;
            }
       }
       container.append(new_row);
    }
}

function uploadBook(){
    $.ajax(url_base + "/hub.php/newBook",
    {type: "POST",
    dataType: "json",
    data: JSON.stringify(book),
    success: function(json, status, jqXHR){
        alert("new set of annotations have been created!");
        window.close();
    }
    })
}

$(document).ready(start());