---
title: V3-第三次重构博客
lang: "zh"
pubDate: 2024-02-21 14:25
description: "                                                  "
pin: true
mathjax: true
---



前段时间对博客有了一些新的需求, 需要增加本地化(i18n). 之前使用的`cactus`主题有点冗杂了, 计划在过年前后从0开始写一个带本地化功能的博客. Astro对于blog类型没有一个明确的规范, 这也导致了几乎每个主题的可扩展性都很差. 但是很容易上手, 我在跟着官网的demo过了一遍后就开始了这个项目. 

> 完成度高之后打包发布.

# TODO

- tags页面(已经有更方便的pagefind了)
- [废除]starlight文档页的i18n(没内容,低优先)

# 已实现功能

- i18n
- 指定范围和i18n的pagefind搜索
- 文章置顶
- index页面输出5最新文章
- [废除]starlight文档页
- blog汇总页

# 调节点

- i18n
- mobileheader
- 定向说明
- [废除]starlight