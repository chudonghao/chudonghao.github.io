---
title: C++模板编程
categories: 未分类
comments: false
date: 2019-04-03 06:09:05
tags:
- C++
- C++语法
updated:
---

## 模板的作用
### 代码复用
### 静态反射机制
对C++的静态反射机制，只能用NM来形容我的内心的感受

## 主要名词
重载决议　SFINAE　面向对象　面向过程　enable_if　auto　decltype　显示实例化　类型别名，别名模版　重载函数的地址

- enable_if使用SFINAE可以处理ambiguous
- 重载决议可以处理TODO

## 编译过程
函数模板名称查找（可能涉及参数依赖查找）　->　模板实参推导　->　模板实参替换（可能涉及 SFINAE ）　->　重载决议

## 遇到的特殊要求：精确匹配函数，拒绝隐式转换

目前只会用类偏特化