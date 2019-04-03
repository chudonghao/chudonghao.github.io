/**
 * 楚栋浩
 */

jQuery(document).ready(function($) {
  var poetrys = ["溪涧岂能留得住 终归大海作波涛","未觉池塘春草梦 阶前梧叶已秋声","少年易学老难成 一寸光阴不可轻",
                 "时人不识凌云木 直待凌云始道高","三更灯火五更鸡 正是男儿读书时"]
  var id = parseInt(Math.random() * poetrys.length);
  $("div.site-description").text(poetrys[id]);
});
