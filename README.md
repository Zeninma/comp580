# Develop Log
* 4/10:
	* to get the document object of the page inside the iframe, and to check whether or not the current page is a book use:
'''javascript
	var readerDoc = $('#iframe_id').contents()[0];
	$($(readerDoc.getElementsByClassName("thr-book-page")));
'''
