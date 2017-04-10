var url = "";
$(document).ready(
    setInterval(function(){
		var current=$('#my_iframe').get(0).contentWindow.location.pathname;
		if(current != url){
			console.log('change', current);
            alert("changed");
			url=current;
		}
	}, 200)

);