var url_base = "/CHAIR/server-side";
$(function(){$('button').on('click',
   function(e){
       console.log('change', "we cjamged tje ");
        $.ajax(url_base + "/hub.php/book",
        {
        type: "GET",
        crossDomain: true,
        xhrFields:{
            withCredentials: true
        },
        dataType: "json",
        data: {"bookId": 1},
        success: function(book, status, jqXHR){
            // book_list_json has two fields:
            // 1.book_id_array
            // 2.book_name_array
            // Should reconstruct the option list
            // for versions of books.
            alert(book);
        }
    })
   }
)}
)