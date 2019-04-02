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
