$(document).ready(function() {
    var name;
    var bookId;
    var bookTitle;
    if(window.sessionStorage.getItem('user') == null){
        $("#loggedIn").hide();
        $("#extra").hide();
    }
    else{
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/users/' + window.sessionStorage.getItem('user'),
            dataType: "text",
            success: function (data) {
                var json = $.parseJSON(data);
                name = json.username;
                $("#navbardrop").html(name);
            },
            error: function(error){
                window.alert(error);
            }
        });
        $("#logIn").hide();
        $("#signUp").hide();
    }
    $("#logout").click(function(){
        window.sessionStorage.removeItem('user');
        window.location.reload();
    });
    $("#searchbutton").click( function() {
        var searchval = $("#searchbar").val();
        if(searchval.length === 0){
            window.alert("Please enter a search term");
            return;
        }
        $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/books/v1/volumes?q=' + searchval + '&key=AIzaSyChbo_NuspApxtoFq2lcA3S7sMMyKVxsyo',
            dataType: "text",
            success: function (data) {
                var json = $.parseJSON(data);
                $("#searchlist").empty();
                $("#searchlist").append("<ul>");
                for(var i=0;i<json.items.length;i++){
                    var item = "<li id='" + json.items[i].id + "'class='listitem'>" +
                        "<img src='https://books.google.com/books?id=" + json.items[i].id + "&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\'/><p>"
                        + json.items[i].volumeInfo.title + " by: " +
                        json.items[i].volumeInfo.authors[0] + "</p></li>";
                    $("#searchlist").append(item);
                }
                $("#searchlist").append("</ul>");
            },
            error: function(error){
                window.alert(error);
            }
        })
    });
    $(document).on("click", ".listitem", function() {
        var id = $(this).attr('id');
        var wishListFlag = false;
        var readListFlag = false;
        var rating = 0;
        $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/books/v1/volumes/' + id +'?key=AIzaSyChbo_NuspApxtoFq2lcA3S7sMMyKVxsyo',
            dataType: "text",
            success: function (data) {

                var json = $.parseJSON(data);
                bookTitle = json.volumeInfo.title;
                bookId = json.id;
                if(window.sessionStorage.getItem('user') != null){
                    $.ajax({
                        type: 'GET',
                        url: 'http://localhost:3000/users/' + window.sessionStorage.getItem('user') + '/unreadbooks',
                        dataType: "text",
                        success: function (data) {
                            var json = $.parseJSON(data);
                            for(var i = 0; i < json.length; i++){
                                if(json[i].id === bookId){

                                    wishListFlag = true;
                                }
                            }
                            if(wishListFlag){
                                $('#wishlist').hide();
                            }
                            else{
                                $('#wishlist').show();
                            }
                        },
                        error: function (error) {
                            window.alert(error);
                        }
                    })
                    $.ajax({
                        type: 'GET',
                        url: 'http://localhost:3000/users/' + window.sessionStorage.getItem('user') + '/readbooks',
                        dataType: "text",
                        success: function (data) {
                            var json = $.parseJSON(data);
                            for(var i = 0; i < json.length; i++){
                                if(json[i].id === bookId){
                                    rating = json[i].rating;
                                    readListFlag = true;
                                    for (i = 1; i <= 5; i++){
                                        if (rating >= i && rating !== 0){
                                            $("#" + i + "star").addClass("checked");
                                        }else{
                                            $("#" + i + "star").removeClass("checked");
                                        }
                                    }
                                }
                            }
                            if(readListFlag){
                                $('#read').hide();
                            }
                            else{
                                $('#read').show();
                            }
                        },
                        error: function (error) {
                            window.alert(error);
                        }
                    })
                }
                $("#image").html("<img src='" + json.volumeInfo.imageLinks.small + "'hspace='10px' align='left' />");
                $("#title").html(json.volumeInfo.title);
                $("#author").html(json.volumeInfo.authors[0]);
                $("#info").html("<h2>Description</h2><p>" + json.volumeInfo.description + "</p>" +
                    "<h2>Publisher</h2><p>" + json.volumeInfo.publisher + "; " + json.volumeInfo.publishedDate + "</p>");
                if(window.sessionStorage.getItem('user') != null){
                    document.getElementById("extra").style.display = "inline";
                    for (i = 1; i <= 5; i++){
                        if (rating >= i && rating !== 0){
                            $("#" + i + "star").addClass("checked");
                        }else{
                            $("#" + i + "star").removeClass("checked");
                        }
                    }
                }
            },
            error: function(error){
                window.alert(error);
            }
        })
    });
    $("#wishlist").click(function() {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/unreadbooks',
            data: {
                id: bookId,
                title: bookTitle,
                userId: window.sessionStorage.getItem('user')
            },
            success: function(){
                $("#wishlist").hide();
            }
        })
    })
    $("#read").click(function() {
        for(var i = 0; i < 5;){
            if(!$('#' + (i + 1) + 'star').hasClass('checked')){
                break
            }
            else{
                i++;
            }
        }
        var rating = i;
        if(rating > 1){
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/readbooks',
                data: {
                    id: bookId,
                    rating: rating,
                    title: bookTitle,
                    userId: window.sessionStorage.getItem('user')
                },
                success: function(){
                    $('#read').hide();
                },
                error: function(error){
                    console.log('error');
                }
            })
        }
    })
});
