$(function() {
    $('#button').click(function() {
        var heading=$(".title > h1");
        heading.animate({fontSize:"+=1em"},3000);
        heading.animate({color:"#FFD700"},"slow");
        heading.animate({fontSize:"-=1em"},3000);
        heading.animate({color:"#3A3A3A"}, "fast");

        $('.about > img').css("border", "3px solid gold");   
    });
});
