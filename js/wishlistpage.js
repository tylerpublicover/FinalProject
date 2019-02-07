$(document).ready( function() {
    if(window.sessionStorage.getItem("user") === null){
        window.location.replace("mainpage.html");
    }
    $("#logout").click(function(){
        window.sessionStorage.removeItem('user');
        window.location.replace('mainpage.html')
    });
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/users/' + window.sessionStorage.getItem('user'),
        dataType: "text",
        success: function (data) {
            var json = $.parseJSON(data);
            var name = json.username;
            $("#navbardrop").html(name);
        },
        error: function(error){
            window.alert(error);
        }
    });
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/users/' + window.sessionStorage.getItem('user') + '/unreadbooks',
        dataType: "text",
        success: function (data) {
            var json = $.parseJSON(data);
            for(var i = 0; i < json.length; i++){
                var bookId = json[i].id;
                var bookTitle = json[i].title;
                $('#wishlist').append("<li id='" + bookId + "'><p>"
                    + bookTitle + "</p>" +
                    "<input value='delete' type='button' class='delete'/></li>")
            }
        },
        error: function(error){
            window.alert(error);
        }
    });
    $(document).on("click", ".delete", function(eventObj) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3000/unreadbooks/' + $(eventObj.target).closest('li').attr('id'),
            success: function () {
                location.reload();
            }
        })
    });
});
