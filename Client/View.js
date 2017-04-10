var url = "";

function isBook(current){
    // take the current path of the content inside iframe;
    // if current path is a book, m will be a list of string,
    // where m[1] = the title of the book, m[2] = the current page num
    var re=/^\/\d+\/\d+\/\d+\/([^\/]+)\/(?:(\d+)\/)?(?:\?.*)?$/,
	m=current.match(re);
    if(!m || !m[2]){
			addGrid(m);
		}else{
			hideGrid();
		}
}

function addGrid(bookInfo){
    $('#left_grid').html(
        '<tr><th><img src="/CHAIR/PCS/00105all.png" alt="test image" style="width:304px;height:228px;"></th>'
			+ '<th><img src="/CHAIR/PCS/00105all.png" alt="test image" style="width:304px;height:228px;"></th>'
			+ '<th><img src="/CHAIR/PCS/00105all.png" alt="test image" style="width:304px;height:228px;"></th>'
			+ '<th><img src="/CHAIR/PCS/00105all.png" alt="test image" style="width:304px;height:228px;"></th>'
			+ '</tr>'
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
            isBook(current);
			url=current;
		}
	}, 200)
);