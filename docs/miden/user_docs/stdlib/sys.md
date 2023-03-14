---
id: sys
title: System Procedures
sidebar_label: System Procedures
description: Sys module contains a set of system-level utility procedures.
keywords:
  - docs
  - polygon
  - wiki
  - miden
  - system
image: https://wiki.polygon.technology/img/thumbnail/polygon-miden.png
---

Module `std::sys` contains a set of system-level utility procedures.

| Procedure      | Description   |
| -------------- | ------------- |
| finalize_stack | Removes elements deep in the stack until the depth of the stack is exactly 16. The elements are removed in such a way that the top 16 elements of the stack remain unchanged.<br/>Input: Stack with 16 or more elements.<br/> Output: Stack with only the original top 16 elements. |