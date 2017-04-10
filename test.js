$(document).ready(
    function(){
        var announcements = $("#my_iframe").contents().find(".announcements");
        alert(announcements.html());
    }
);