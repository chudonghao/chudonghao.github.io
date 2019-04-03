function s() {
    return "rgb(" + ~~ (128 * Math.random() + 127) + "," + ~~ (127 * Math.random()) + "," + ~~ (128 * Math.random() + 127) + ")"
}

/* 鼠标特效 */
var a_idx = 0;
jQuery(document).ready(function($) {
   $("body").click(function(e) {
       //var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善");
       //var $i = $("<span/>").text(a[a_idx]);
       var $i = $("<span/>").text("开心");
       //a_idx = (a_idx + 1) % a.length;
       var x = e.pageX,
       y = e.pageY;
       $i.css({
           "z-index": 5,
           "top": y - 25,
           "left": x - 14,
           "position": "absolute",
           "font-weight": "bold",
           "color": s()
       });
       $("body").append($i);
       $i.animate({
           "top": y - 180,
           "opacity": 0
       },
       1500,
       function() {
           $i.remove();
       });
   });
});
