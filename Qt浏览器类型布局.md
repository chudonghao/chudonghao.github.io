---
title: Qt浏览器类型布局
categories: 未分类
comments: false
date: 2019-05-15 20:11:52
tags:
updated:
---

## 一段代码

```cpp
// QScrollArea
//   └─QWidget
//       ├─QLayout
//       ├─QLabel
//       ├─...
//       ...
delete ui_photo_list_;
ui_photo_list_ = new QWidget(this);
ui->photo_area->setWidget(ui_photo_list_);
ui_photo_list_layout_ = new QVBoxLayout(ui_photo_list_);
ui_photo_list_layout_->setSizeConstraint(QLayout::SetMaximumSize);
auto *label = new QLabel("111111",ui_photo_list_);
ui_photo_list_layout_->addWidget(label);
auto *label = new QLabel("222222",ui_photo_list_);
ui_photo_list_layout_->addWidget(label);
```



<!--more-->