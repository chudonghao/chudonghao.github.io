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

## 引用折叠
- `T & &` `T & &&` `T && &`都被折叠为`T &`
- `T && &&`折叠为`T &&`

## 模板实参推导表

|             | int &                  | const int &                   | int &&                  | const int &&                  |
| ----------- | -------------------    | ---------------------------   | --------------------    | -----------------------       |
| T / const T | (int) [T = int]        | (int) [T = int]               | (int) [T = int]         | (int) [T = int]               |
| T &         | (int&) [T = int]       | (int const&) [T = int const]  | ERROR                   | (int const&) [T = int const]  |
| const T &   | (int const&) [T = int] | (int const&) [T = int]        | (int const&) [T = int]  | (int const&) [T = int]        |
| T &&        | (int&) [T = int&]      | (int const&) [T = int const&] | (int&&) [T = int]       | (int const&&) [T = int const] |
| const T &&  | ERROR                  | ERROR                         | (int const&&) [T = int] | (int const&&) [T = int]       |

<!--more-->
```cpp
#include <iostream>
using namespace std;
class A2{};
template<typename T>
void fooT(T t) {
  cout << __PRETTY_FUNCTION__ << endl;
}
template<typename T>
void foocT(const T t) {
  cout << __PRETTY_FUNCTION__ << endl;
}
template<typename T>
void fooTR(T &t) {
  cout << __PRETTY_FUNCTION__ << endl;
}
template<typename T>
void foocTR(const T &t) {
  cout << __PRETTY_FUNCTION__ << endl;
}
template<typename T>
void fooTr(T &&t) {
  cout << __PRETTY_FUNCTION__ << endl;
}
template<typename T>
void foocTr(const T &&t) {
  cout << __PRETTY_FUNCTION__ << endl;
}
void func() {
  int i = 0;
  const int ci = 0;
  A2 a;
  const A2 ca = A2();
  cout << "int:" <<endl;
  fooT(i);
  foocT(i);
  fooTR(i);
  foocTR(i);
  fooTr(i);
  // ERROR
  //foocTr(i);
  cout << "void foocTr(const T &&) ERROR" <<endl;
  cout << "const int:" <<endl;
  fooT(ci);
  foocT(ci);
  fooTR(ci);
  foocTR(ci);
  fooTr(ci);
  // ERROR
  //foocTr(ci);
  cout << "void foocTr(const T &&) ERROR" <<endl;
  cout << "int &&:" <<endl;
  fooT(move(i));
  foocT(move(i));
  // ERROR
  //fooTR(move(i));
  cout << "void fooTR(T &) ERROR" <<endl;
  foocTR(move(i));
  fooTr(move(i));
  foocTr(move(i));
  cout << "const int &&:" <<endl;
  fooT(move(ci));
  foocT(move(ci));
  fooTR(move(ci));
  foocTR(move(ci));
  fooTr(move(ci));
  foocTr(move(ci));
  cout << "A:" << endl;
  fooT(a);
  foocT(a);
  fooTR(a);
  foocTR(a);
  fooTr(a);
  // ERROR
  //foocTr(a);
  cout << "void fooTr(const T &&) ERROR" << endl;
  cout << "const A:" << endl;
  fooT(ca);
  foocT(ca);
  fooTR(ca);
  foocTR(ca);
  fooTr(ca);
  // ERROR
  //foocTr(ca);
  cout << "void fooTr(const T &&) ERROR" << endl;
  cout << "A &&:" << endl;
  fooT(move(a));
  foocT(move(a));
  // ERROR
  //fooTR(move(a));
  cout << "void fooTR(T &) ERROR" << endl;
  foocTR(move(a));
  fooTr(move(a));
  foocTr(move(a));

  cout << "const A &&:" << endl;
  fooT(move(ca));
  foocT(move(ca));
  fooTR(move(ca));
  foocTR(move(ca));
  fooTr(move(ca));
  foocTr(move(ca));
}
```
```bash
int:
void fooT(T) [T = int]
void foocT(const T) [T = int]
void fooTR(T &) [T = int]
void foocTR(const T &) [T = int]
void fooTr(T &&) [T = int &]
void foocTr(const T &&) ERROR
const int:
void fooT(T) [T = int]
void foocT(const T) [T = int]
void fooTR(T &) [T = const int]
void foocTR(const T &) [T = int]
void fooTr(T &&) [T = const int &]
void foocTr(const T &&) ERROR
int &&:
void fooT(T) [T = int]
void foocT(const T) [T = int]
void fooTR(T &) ERROR
void foocTR(const T &) [T = int]
void fooTr(T &&) [T = int]
void foocTr(const T &&) [T = int]
const int &&:
void fooT(T) [T = int]
void foocT(const T) [T = int]
void fooTR(T &) [T = const int]
void foocTR(const T &) [T = int]
void fooTr(T &&) [T = const int]
void foocTr(const T &&) [T = int]
A:
void fooT(T) [T = A2]
void foocT(const T) [T = A2]
void fooTR(T &) [T = A2]
void foocTR(const T &) [T = A2]
void fooTr(T &&) [T = A2 &]
void fooTr(const T &&) ERROR
const A:
void fooT(T) [T = A2]
void foocT(const T) [T = A2]
void fooTR(T &) [T = const A2]
void foocTR(const T &) [T = A2]
void fooTr(T &&) [T = const A2 &]
void fooTr(const T &&) ERROR
A &&:
void fooT(T) [T = A2]
void foocT(const T) [T = A2]
void fooTR(T &) ERROR
void foocTR(const T &) [T = A2]
void fooTr(T &&) [T = A2]
void foocTr(const T &&) [T = A2]
const A &&:
void fooT(T) [T = A2]
void foocT(const T) [T = A2]
void fooTR(T &) [T = const A2]
void foocTR(const T &) [T = A2]
void fooTr(T &&) [T = const A2]
void foocTr(const T &&) [T = A2]
```
