---
title: Opencv处理图像笔记
categories: 未分类
comments: false
date: 2019-05-15 20:28:40
tags:
updated:
---

<!--more-->

## 图像处理中的一类

### 步骤

1. 灰度化
1. 高斯模糊
1. Canny边缘检测
1. 不规则ROI区域截取
1. 霍夫直线检测

### 具体函数

```cpp
// 颜色变换，如灰度化
cvtColor()

threshold()
// 高斯模糊
GaussianBlur()
// Canny边缘检测
Canny()
// ROI区域保留

// 霍夫直线提取
HoughLinesP()
```

## 绘制

```cpp
// 画线
line()
// 矩形
rectangle()
// 圆
circle()
// 椭圆
ellipse()
// 文字
putText()
// 填充
fillPoly()
```

