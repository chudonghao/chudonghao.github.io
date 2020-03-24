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

- Windowing System 窗口系统：Linux下的X11等
- Graphics Context 图形上下文：描述一个绘图区域（或窗口）上下文
- Window 窗口，窗口系统中的一个窗口
- Scene 场景

## 类型

osg::Referenced 负责内存安全策略（同侵入式shared_ptr）

osg::Object 负责对象安全策略，如IO操作、复制操作

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

osgViewer::ViewerBase 

## 分页管理

## 拣选

用于生成渲染台：剪裁、渲染顺序的管理（深度顺序、指定顺序）、OpenGL操作的优化（osg::State）

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

例如：

```c++
_texture = new osg::Texture2D;
_texture->setTextureSize(_textureSize.x(), _textureSize.y());
_texture->setInternalFormat(GL_DEPTH_COMPONENT);
_texture->setShadowComparison(true);
_texture->setShadowTextureMode(osg::Texture2D::LUMINANCE);
_texture->setFilter(osg::Texture2D::MIN_FILTER,osg::Texture2D::LINEAR);
_texture->setFilter(osg::Texture2D::MAG_FILTER,osg::Texture2D::LINEAR);
// the shadow comparison should fail if object is outside the texture
_texture->setWrap(osg::Texture2D::WRAP_S,osg::Texture2D::CLAMP_TO_BORDER);
_texture->setWrap(osg::Texture2D::WRAP_T,osg::Texture2D::CLAMP_TO_BORDER);
_texture->setBorderColor(osg::Vec4(1.0f,1.0f,1.0f,1.0f));
// create the camera
_camera = new osg::Camera;
_camera->setReferenceFrame(osg::Camera::ABSOLUTE_RF_INHERIT_VIEWPOINT);
_camera->setClearMask(GL_DEPTH_BUFFER_BIT);
//_camera->setClearMask(GL_DEPTH_BUFFER_BIT | GL_COLOR_BUFFER_BIT);
_camera->setClearColor(osg::Vec4(1.0f,1.0f,1.0f,1.0f));
_camera->setComputeNearFarMode(osg::Camera::DO_NOT_COMPUTE_NEAR_FAR);
// set viewport
_camera->setViewport(0,0,_textureSize.x(), _textureSize.y());
// set the camera to render before the main camera.
_camera->setRenderOrder(osg::Camera::PRE_RENDER);
// tell the camera to use OpenGL frame buffer object where supported.
_camera->setRenderTargetImplementation(osg::Camera::FRAME_BUFFER_OBJECT);
//_camera->setRenderTargetImplementation(osg::Camera::SEPERATE_WINDOW);
// attach the texture and use it as the color buffer.
_camera->setProjectionMatrixAsPerspective(fov, 1.0, 0.1, 1000.0);
_camera->setViewMatrixAsLookAt(position,position+lightDir,computeOrthogonalVector(lightDir));
_camera->attach(osg::Camera::DEPTH_BUFFER, _texture.get());
```

## 着色器

### 启用osg矩阵、启用osg顶点属性绑定

```c++
osg::GraphicsContext::getState
osg::State::setUseModelViewAndProjectionUniforms
osg::State::getUseVertexAttributeAliasing
```

| location(默认) | var(osg user use)            | replace(auto)                            |
| :------------- | ---------------------------- | ---------------------------------------- |
|                | osg_FrameNumber              |                                          |
|                | osg_FrameTime                |                                          |
|                | osg_DeltaFrameTime           |                                          |
|                | osg_SimulationTime           |                                          |
|                | osg_DeltaSimulationTime      |                                          |
|                | osg_ViewMatrix               |                                          |
|                | osg_ViewMatrixInverse        |                                          |
|                | ftransform()                 | gl_ModelViewProjectionMatrix * gl_Vertex |
|                | gl_ModelViewMatrix           | osg_ModelViewMatrix                      |
|                | gl_ModelViewProjectionMatrix | osg_ModelViewProjectionMatrix            |
|                | gl_ProjectionMatrix          | osg_ProjectionMatrix                     |
|                | gl_NormalMatrix              | osg_NormalMatrix                         |
| 0              | gl_Vertex                    | osg_Vertex                               |
| 1              | gl_Normal                    | osg_Normal                               |
| 2              | gl_Color                     | osg_Color                                |
| 3              | gl_MultiTexCoord0            | osg_MultiTexCoord0                       |
| 4              | gl_MultiTexCoord1            | osg_MultiTexCoord1                       |
| 5              | gl_MultiTexCoord2            | osg_MultiTexCoord2                       |
| 6              | gl_MultiTexCoord3            | osg_MultiTexCoord3                       |
| 7              | gl_MultiTexCoord4            | osg_MultiTexCoord4                       |
| 8              | gl_MultiTexCoord5            | osg_MultiTexCoord5                       |
| 9              | gl_MultiTexCoord6            | osg_MultiTexCoord6                       |
| 10             | gl_MultiTexCoord7            | osg_MultiTexCoord7                       |
| 11             | gl_SecondaryColor            | osg_SecondaryColor                       |
| 12             | gl_FogCoord                  | osg_FogCoord                             |

## 粒子

## 动画

## 多个Pass

## StateSet

- RenderBinDetail
  - RenderBin
  - DepthSortedBin
- RenderingHint
  - DEFAULT_BIN  INHERIT_RENDERBIN_DETAILS 0 ""
  - OPAQUE_BIN USE_RENDERBIN_DETAILS 0 "RenderBIn"
  - TRANSPARENT_BIN USE_RENDERBIN_DETAILS 10 "DepthSortedBin"

## 问题

1. 为什么camera near far 不起作用？
   
   存在自动计算机制
```c++
_camera>setComputeNearFarMode(osg::Camera::DO_NOT_COMPUTE_NEAR_FAR);
```
2. 为什么子相机接受了Viewport resize事件
   
   附属相机（slave）会接受resize事件

