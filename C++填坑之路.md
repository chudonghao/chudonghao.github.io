---
title: C++填坑之路
categories: 未分类
comments: false
date: 2019-03-28 22:43:25
tags:
- C++
- C++语法
updated:
---
## 数组变量加减操作
```cpp
#include<iostream>
using namespace std;
void main(){
  int a[] = {0,1,2};
  cout << *(a+1) << endl;//NOTE a可视为元素指针
  //cout << *++a << endl;//编译错误
}
```
```
1
```
<!--more-->
## 标准库迭代器
```cpp
#include<vector>
#include<list>
void main(){
  vector<int> v = {1,2,3,4};
  auto i = v.begin();
  v.erase(i);
  cout << *i << endl;
  list<int> l = {1,2,3,4};
  auto j = l.begin();
  l.erase(j);
  //NOTE 这里的j已经失效,虽然输出了1
  cout << *j << endl;
}
```
```
2
1 #这个输出看似正确,但没有意义
```
迭代器是否失效请看[这里](https://zh.cppreference.com/w/cpp/container#迭代器非法化)
使用时可以考虑erase函数的返回值 其为指向被删除元素的下一个元素的迭代器
## 虚函数与成员函数调用行为与成员指针
```cpp
class A {
 public:
  int i;
  A() { foo(); }
  ~A() { foo(); }
  void func() { cout << "A::func()" << endl; }
  virtual void f() { cout << "A::f()" << endl; }
  virtual void foo() { cout << "A::foo()" << endl; }
  virtual void foooo() {
    cout << "A::foooo()" << endl;
    f();
    A::f();
  }
};
class B : public A {
 public:
  B() { foo(); }
  ~B() { foo(); }
  void f() { cout << "B::f()" << endl; }
  void foo() { cout << "B::foo()" << endl; }
  void foooo() {
    cout << "B::foooo()" << endl;
    f();
    A::f();
  }
};
void main() {
  B b;
  B *bp = &b;
  A *ap = &b;
  ap->foo();
  ap->A::foo();
  void (A::*Afoop)() = &A::foo;
  (ap->*Afoop)();
  //void (A::*Afuncp)() = &A::func;
  //(bp->*Afuncp)();
  printf("%08x\n", &B::f);
  printf("%08x\n", &B::func);
  //cout << &B::func << endl;
  ap->foooo();
  ap->A::foooo();
}
```
```bash
A::foo()
B::foo()
B::foo()
A::foo()
B::foo()
00000001
00402010
B::foooo()
B::f()
A::f()
A::foooo()
B::f()
A::f()
B::foo()
A::foo()
```
总结
- 构造函数与析构函数一个重要的职能或特点是类型确定，即进入函数时，先修改虚表指针，所以在其中对虚函数的调用不是运行时确定的（编译器的实现是直接调用，即不通过虚表）
- 成员函数指针形式的调用是动态的（TODO 成员函数指针的实现）
- 带域的调用形式是编译期确定的

## 非法delete问题
### delete*2问题
>“自由存储区可能会被破坏”
———《C+P》
### delete\[](new[]+1)问题
cplusplus.com上说：
- delete[]的参数ptr，应该是new[]返回的ptr
- 如果delete的参数ptr无效，将产生未定义的结果
### A *a = new B[2];delete []a;
经过测试，也是未定义的。
### 总结
这应该牵扯到C++堆内存管理问题，以上行为都将产生未定义结果，特别的，第二种情况下程序直接崩溃的可能性巨大。
## new[] delete[] 顺序问题
先构后析
## 对合法但无效的栈内存进行访问
将会产生未定义的结果
## 操作符的操作数的求值顺序
>“除逻辑操作符，“?:”操作符，“,”操作符外，其他操作符并未指定其操作数的求职顺序”
———《C+P》

比如`expr1*expr2`，`expr1`与`expr2`的求值顺序无法得知
比如表达式`if (ia[id++] < ia[id] )`的行为没有明确定义
特别是在`expr1`与`expr2`操作涉及并修改同一对象时，求解顺序相当重要

个人：以上（《C+P》）的内容是我不经意间看见的，以前一直按照结合性方向使用上述类似表达式，比如自左向右结合就先计算左边，也没出现过严重问题，在这里记录以防不测。
## 数组变量的使用
除`&`与`sizeof`，对数组变量的使用将使数组变量提升为成员指针
例如：
```cpp
//10被忽略，即arr的类型被视为int *
void foo(int arr[10]);
//arr_p被视为指向大小为10的数组的指针
void foo(int(*arr_p)[10]);
```