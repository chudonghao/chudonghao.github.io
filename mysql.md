---
title: mysql
categories: 未分类
comments: false
date: 2019-05-26 20:27:52
tags:
- mysql
updated:
---
<!--more-->
## 认证机制问题

### 表mysql.user保存认证信息

### 修改认证插件

```sql
use mysql;
alter user 'root'@'%' identified by '密码' password expire never;
alter user 'root'@'%' identified with mysql_native_password by '密码';
flush privileges;
```

