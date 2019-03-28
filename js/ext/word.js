var a_idx = 0;
jQuery(document).ready(function($) {
    $("body").click(function(e) {
        var a = new Array
        ("开心");
        var $i = $("<span/>").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,
        y = e.pageY;
        $i.css({
            "z-index": 5,
            "top": y - 30,
            "left": x - 10,
            "position": "absolute",
            "font-weight": "bold",
            "color": s()
        });
        $("body").append($i);
        $i.animate({
            "top": y - 180,
            "opacity": 0
        },
        3000,
        function() {
        $i.remove();
        });
    });
    setTimeout('delay()', 2000);
});

function delay() {
    $(".buryit").removeAttr("onclick");
}

function s() {
    return "rgb(" + ~~ (128 * Math.random() + 127) + "," + ~~ (127 * Math.random()) + "," + ~~ (128 * Math.random() + 127) + ")"
}
