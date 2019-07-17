---
title: GitHub+Hexo+NexT搭建个人博客网站
categories: 未分类
date: 2019-03-26 11:38:04
tags: hexo
---
[Hexo 文档](https://hexo.io/zh-cn/docs/) 
[知乎 - GitHub+Hexo 搭建个人网站详细教程](https://zhuanlan.zhihu.com/p/26625249) 
[Hexo 使用攻略-添加分类及标签](https://www.jianshu.com/p/e17711e44e00) 
[Hexo Next 设置阅读全文](https://www.jianshu.com/p/78c218f9d1e7) 
<!-- more -->
## 主要文件
- ./_config.yml 网站配置文件
- ./themes/*/_config.yml 主题配置文件

## 主要命令
```bash
hexo n "<title>" # new 新建一篇文章
hexo n page "<name>" # 新建一个页面(注意在主题中设置主页菜单显示,在index.md中设置type)
hexo g -w # generate 生成网站 -w 监测笔记的改变
hexo s # server 启动服务预览
hexo d # deploy 部署网站
hexo clean # 清除缓存，若是网页正常情况下可以忽略这条命令
```

## 做的一些工作
- 添加公式支持
[第三方服务集成 - NexT 使用文档](https://theme-next.iissnan.com/third-party-services.html#mathjax)
- 添加加载进度条
[theme-next/theme-next-pace: Loading bar for NexT.](https://github.com/theme-next/theme-next-pace)
- 添加点击文字的效果
```js
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
```
- 自定义了一些style
- 添加了一些小的的脚本
  - 修改一些文字
- TODO jupyter