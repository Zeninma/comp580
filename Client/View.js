// url_base is the a constant string,
// containing the base path
var url_base = "wwwp.cs.unc.edu/Courses/comp580-s17/users/zengao/CHAIR";
var url = "";

function change(current_path){
    // function take the changed_current,
    // determine the next phas:
    // 1. Open notation in a book;
    // 2. create new notation for the book;
    isBook(current_path);
}

function isBook(current){
    // take the current path of the content inside iframe;
    // if current path is a book, m will be a list of string,
    // where m[1] = the title of the book, m[2] = the current page num
    var re=/^\/\d+\/\d+\/\d+\/([^\/]+)\/(?:(\d+)\/)?(?:\?.*)?$/,
	m=current.match(re);
    if(!m || !m[2]){
			hideGrid();
		}else{
			addNotation(m[1]);
		}
}

function addNotation(book_title){
    // take the book_title
    // need to retrieve all the existing versions
    // of annotations for the book
    $.ajax(url_base + "/hub.php",
        {type: "GET",
        dataType: "json",
        data: {bookId : "1"},
        sucess: function(book_json, status, jqXHR){
            alert(book_json);
        }
    })
}

function addGrid(bookInfo){
    $('#right_grid').html(
         '<tr><th><img src="/CHAIR/PCS/00105all.png" alt="test image" style="width:304px;height:228px;"></th>'
			+ '<th><img src="/CHAIR/PCS/00105all.png" alt="test image" style="width:304px;height:228px;"></th>'
			+ '<th><img src="/CHAIR/PCS/00105all.png" alt="test image" style="width:304px;height:228px;"></th>'
			+ '<th><img src="/CHAIR/PCS/00105all.png" alt="test image" style="width:304px;height:228px;"></th>'
			+ '</tr>'
    )
    $('#left_grid').html(
        '<tr><th><img src="/CHAIR/PCS/00105all.png" alt="test image" style="width:304px;height:228px;"></th>'
			+ '<th><img src="/CHAIR/PCS/00105all.png" alt="test image" style="width:304px;height:228px;"></th>'
			+ '<th><img src="/CHAIR/PCS/00105all.png" alt="test image" style="width:304px;height:228px;"></th>'
			+ '<th><img src="/CHAIR/PCS/00105all.png" alt="test image" style="width:304px;height:228px;"></th>'
			+ '</tr>'
    );
    $('#click').click(
        function(){
            var readerDoc = $('#my_iframe').contents()[0];
            var text = $(readerDoc.getElementsByClassName("thr-text").item(0));
            var string_text = text.text();
            responsiveVoice.speak(string_text);
        }
    );
}

function hideGrid(){
     $('#left_grid').html('');
}

$(document).ready(
    // The following function constantly check the current path
    // If path is changed, call function isBook
    setInterval(function(){
		var current=$('#my_iframe').get(0).contentWindow.location.pathname;
		if(current != url){
			console.log('change', current);
            change(current);
			url=current;
		}
	}, 200)
);