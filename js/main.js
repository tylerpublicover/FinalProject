$( document).ready(function() {
    /*

            SIGN UP CODE

     */
    var dialogSignUp, formSignUp,

        name = $( "#name" ),
        password = $( "#password" ),
        allFieldsSignUp = $( [] ).add( name ).add( password ),
        tips = $( ".validateTips" );

    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
            o.addClass( "ui-state-error" );
            updateTips( "Length of " + n + " must be between " +
                min + " and " + max + "." );
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp( o, regexp, n ) {
        if ( !( regexp.test( o.val() ) ) ) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }

    function addUser() {
        var valid = true;
        allFieldsSignUp.removeClass( "ui-state-error" );

        valid = valid && checkLength( name, "username", 3, 16 );
        valid = valid && checkLength( password, "password", 5, 16 );

        valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
        valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );

        if ( valid ) {
            var data = {
                username : $("#name").val(),
                password : $("#password").val()
            }
            var userId;
            $.post("http://localhost:3000/users", data, function(){
            }, 'json')
            $.ajax({
                type: 'GET',
                url: 'http://localhost:3000/users',
                dataType: "text",
                success: function (data) {
                    var json = $.parseJSON(data);
                    userId = json[json.length - 1].id
                    sessionStorage.setItem('user', userId);
                    dialogSignUp.dialog( "close" );
                    window.location.reload();
                },
                error: function(error){
                    window.alert(error);
                }
            });

        }
        return valid;
    }

    dialogSignUp = $( "#dialog-form-sign-up" ).dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Create an account": addUser,
            Cancel: function() {
                dialogSignUp.dialog( "close" );
            }
        },
        close: function() {
            formSignUp[ 0 ].reset();
            allFieldsSignUp.removeClass( "ui-state-error" );
            updateTips("All form fields are required.")
        }
    });

    formSignUp = dialogSignUp.find( "#sign-up" ).on( "submit", function( event ) {
        event.preventDefault();
        addUser();
    });

    $( "#signUp" ).button().on( "click", function() {
        dialogSignUp.dialog( "open" );
    });

    /*


            LOG IN CODE


     */

    var dialogLogIn, formLogIn,
        validateLog = $("#validateLog")


    function checkLogin(username, password) {
        var valid = false;

    }

    function updateValidateLog(t){
        validateLog
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function logIn() {
        var username = $( "#username" ).val(),
            pword = $( "#pword" ).val()
        var valid = false;
        var userId;
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/users',
            dataType: "text",
            success: function (data) {
                var users = $.parseJSON(data);
                for(var i = 0; i < users.length; i++){
                    if(users[i].username === username){
                        if(users[i].password === pword){
                            userId = users[i].id;
                            valid = true;
                        }
                    }
                }
                if(valid === false) {
                    updateValidateLog("The username/password you entered was incorrect.")
                }
                else{
                    dialogLogIn.dialog( "close" );
                    window.sessionStorage.setItem('user', userId);
                    window.location.reload();
                }
            },
            error: function(error){
                window.alert(error);
            }
        })
    }

    dialogLogIn = $( "#dialog-form-log-in" ).dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Continue": logIn,
            Cancel: function() {
                dialogLogIn.dialog( "close" );
            }
        },
        close: function() {
            formLogIn[ 0 ].reset();
        }
    });

    formLogIn = dialogLogIn.find( "#log-in" ).on( "submit", function( event ) {
        event.preventDefault();
        logIn();
    });

    $( "#logIn" ).button().on( "click", function() {
        dialogLogIn.dialog( "open" );
    });
} );
