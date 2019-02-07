$(document).ready(function() {
    $("#1star").click( function (){
        $("#1star").addClass("checked");
        $("#2star").removeClass("checked");
        $("#3star").removeClass("checked");
        $("#4star").removeClass("checked");
        $("#5star").removeClass("checked");
    });

    $("#2star").click( function (){
        $("#1star").addClass("checked");
        $("#2star").addClass("checked");
        $("#3star").removeClass("checked");
        $("#4star").removeClass("checked");
        $("#5star").removeClass("checked");
    });

    $("#3star").click( function (){
        $("#1star").addClass("checked");
        $("#2star").addClass("checked");
        $("#3star").addClass("checked");
        $("#4star").removeClass("checked");
        $("#5star").removeClass("checked");
    });

    $("#4star").click( function (){
        $("#1star").addClass("checked");
        $("#2star").addClass("checked");
        $("#3star").addClass("checked");
        $("#4star").addClass("checked");
        $("#5star").removeClass("checked");
    });

    $("#5star").click( function (){
        $("#1star").addClass("checked");
        $("#2star").addClass("checked");
        $("#3star").addClass("checked");
        $("#4star").addClass("checked");
        $("#5star").addClass("checked");
    });
});
