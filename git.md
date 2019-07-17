---
title: git
categories: 未分类
comments: false
date: 2019-03-28 08:13:29
tags:
- git
updated:
---
## config
credential.helper=store 保存登录远端仓库时使用的账号密码
http.proxy="" 设置代理

## 常用操作或命令

配置git

```bash
git cofig [--global] <1>.<2> <3>
```

```bash
git clone <remote>
```

```bash
git fetch [<origin_name> <origin_branch_name>[:<branch_name>]]
```

获取空分支，即创建

```bash
git fetch [<origin_name> :<branch_name>]
```

```bash
git pull [--rebase]
```

```bash
git push [<origin_name> <branch_name>[:<origin_branch_name>]]
```

推送控分支，即删除

```bash
git push [<origin_name> :<origin_branch_name>]
```

创建一个分支并追踪一个远程分支

```bash
git checkout -b <branch_name> <origin_name>/<branch_name>
```

```bash
git branch <>
```

使一个本地分支追踪一个远程分支

```bash
git branch -u <origin_name>/<branch_name> <branch_name>
```

```bash
git reset <>
```

```bash
git revert <>
```

```bash
git rebase [-i] <>
```

```bash
git merge <>
```

