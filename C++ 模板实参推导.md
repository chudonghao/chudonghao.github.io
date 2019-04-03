---
title: C++模板实参推导
categories: 未分类
comments: false
date: 2019-04-03 06:09:05
tags:
- C++
- C++语法
updated:
---
[模板实参推导 - cppreference.com](https://zh.cppreference.com/w/cpp/language/template_argument_deduction) 

|             | int &               | const int &                 | int &&               | const int &&            |
| ----------- | ------------------- | --------------------------- | -------------------- | ----------------------- |
| T / const T | (int):T=int         | (int):T=int                 | (int):T=int          | (int):T=int             |
| T &         | (int &):T=int       | (const int &):T=const int   | (int &):T=int        | (const P &):T=const P   |
| const T &   | (const int &):T=int | (const int &):T=int         | (const int &):T=int  | (const int &):T=int     |
| T &&        | (int &):T=int &     | (const int &):T=const int & | (int &):T=int &      | (const P &):T=const P & |
<!--more-->
```cpp
class A{};
template<typename T>
void fooT(T t) {}
template<typename T>
void foocT(const T t) {}
template<typename T>
void fooTR(T &t) {}
template<typename T>
void foocTR(const T &t) {}
template<typename T>
void fooTr(T &&t) {}
template<typename T>
void foocTr(const T &&t) {}
void func14() {
  int i = 0;
  const int ci = 0;
  int &&ir = move(i);
  const int &&cir = move(i);
  A a;
  const A ca = A();
  A &&ar = move(a);
  const A &&car = move(a);
  //<int>(int)
  fooT(i);
  //<int>(int)
  foocT(i);
  //<int>(int&)
  fooTR(i);
  //<int>(int const&)
  foocTR(i);
  //<int&>(int&)
  fooTr(i);
  // ERROR
  //foocTr(i);
  //<int>(int)
  fooT(ci);
  //<int>(int)
  foocT(ci);
  //<int const>(int const&)
  fooTR(ci);
  //<int>(int const&)
  foocTR(ci);
  //<int const&>(int const&)
  fooTr(ci);
  // ERROR
  //foocTr(ci);
  //<int>(int)
  fooT(ir);
  //<int>(int)
  foocT(ir);
  //<int>(int&)
  fooTR(ir);
  //<int>(int const&)
  foocTR(ir);
  //<int&>(int&)
  fooTr(ir);
  // ERROR
  //foocTr(ir);
  //<int>(int)
  fooT(cir);
  //<int>(int)
  foocT(cir);
  //<int const>(int const&)
  fooTR(cir);
  //<int>(int const&)
  foocTR(cir);
  //<int const&>(int const&)
  fooTr(cir);
  // ERROR
  //foocTr(cir);

  //<A>(A)
  fooT(a);
  //<A>(A)
  foocT(a);
  //<A>(A&)
  fooTR(a);
  //<A>(A const&)
  foocTR(a);
  //<A&>(A&)
  fooTr(a);
  // ERROR
  //foocTr(a);
  //<A>(A)
  fooT(ca);
  //<A>(A)
  foocT(ca);
  //<A const>(A const&)
  fooTR(ca);
  //<A>(A const&)
  foocTR(ca);
  //<A const&>(A const&)
  fooTr(ca);
  // ERROR
  //foocTr(ca);
  //<A>(A)
  fooT(ar);
  //<A>(A)
  foocT(ar);
  //<A>(A&)
  fooTR(ar);
  //<A>(A const&)
  foocTR(ar);
  //<A&>(A&)
  fooTr(ar);
  // ERROR
  //foocTr(ar);
  //<A>(A)
  fooT(car);
  //<A>(A)
  foocT(car);
  //<A const>(A const&)
  fooTR(car);
  //<A>(A const&)
  foocTR(car);
  //<A const&>(A const&)
  fooTr(car);
  // ERROR
  //foocTr(car);
}
```
