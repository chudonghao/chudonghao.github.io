---
title: OSG学习笔记
categories: 未分类
comments: false
date: 2019-07-17 09:16:26
tags:
- OSG
updated:
---

## 名词理解

Windowing System 窗口系统，如Linux下的X11

Graphics Context 图形上下文，描述一个绘图区域（或窗口）上下文

Window 窗口，窗口系统中的一个窗口

Scene 场景

## 类型

![继承关系]()

osg::Referenced 负责内存安全策略

osg::Object 负责对象安全策略，如IO操作

osg::View 负责状态与相机

- 灯光模式

osgViewer::ViewerBase 负责渲染线程

- 线程模型
- 线程同步点
- 要求重绘
- 帧率
- frame()
  - 事件遍历
  - 更新遍历
  - 绘制遍历

osgViewer::View 负责场景的数据加载和事件处理

osgGA::GUIActionAdapter 负责与操作系统UI的交互



## osgViewer::ViewerBase 

## 分页管理

## 拣选

sort mode ，和RenderingHint有关联

## 相机

### HUD(head up display)相机

设置为渲染顺序为后渲染

设置为不清除颜色缓冲

设置为不接受事件

设置为始终显示，

设置参考帧（Frame可以翻译为框架吗？）为绝对参考帧（框架）

关闭灯光

### RTT(render to texture)相机，渲染到纹理

相机渲染缓冲附加纹理Camera::attach

## 着色器

## 粒子

## 动画

## 多个Pass

## 问题

1. 为什么Ortho near far 不起作用？
   - 存在自动计算机制

2. 为什么子相机接受了Viewport resize事件

