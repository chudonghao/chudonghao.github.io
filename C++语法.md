---
title: C++语法
categories: 未分类
comments: false
date: 2019-03-28 06:15:18
tags:
- C++
- C++语法
updated:
---
C++一些基本语法问题
<!--more-->
## 模板友元
```cpp
//声明
template<typename T> class foo_t;
template<typename T> void foo();
template<typename T> void foo1();


template<typename T>
class foo_t{
    friend
    void foo<T>();


    friend
    template<typename U>
    void foo1();
}
```
## enable_if
[std::enable_if - cppreference.com](https://zh.cppreference.com/w/cpp/types/enable_if) 
[enable_if - Kiritow的学园 - CSDN博客](https://blog.csdn.net/kiritow/article/details/50932012)
## typename 的第二作用
为了消除歧义，显式地告诉编译器，T::bar是一个类型名。
## 类的缺省函数
```cpp
class Class
{
public:
    //缺省构造函数 
    Class(){}
    //拷贝构造函数
    Class(const Class&){}
    //移动构造函数(C++11)
    Class(Class&&){}
    //移动赋值函数(C++11)
    Class& operator=(Class&&){}
    //析构函数
    ~Class(){}
    //赋值运算符
    Class&operator=(const Class&){}
    //取址运算符 
    Class*operator&(){}
    //取址运算符 const
    const Class*operator&()const{}
}; 
```
## new与delete的重载
## C++默认类型与类型转换
### 默认类型
- 整数默认有符号
  - `3` int
  - `3000000000` long
  - `'3'` char
- 浮点数默认double
### 类型转换
>C++定义了算数类型之间的内置转换以尽可能防止精度损失
———《C+P》
### 隐式类型转换
#### 何时发生隐式类型转换
- 混合类型表达式，操作数转换为相同类型
- 条件表达式，转换为bool
- 赋值语句