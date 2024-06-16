---
title: V3-第三次重构博客
lang: zh
pubDate: 2024-03-06 14:25
description: "                                                  "
pin: true
tags:
  - Astro
---

```
2024.03.26
增加样式块, 增加图片描述.
2024.03.12
添加随机博客; 添加内嵌音乐模块(暂不启用)
2024.03.09
添加博客评论功能, 灵感来源于竹子:https://zhuzi.dev/. 修改/about, 添加google map作为足迹历史.
2024.03.08
更新字体/about/::selection元素/header和footer图标
2024.03.06
更新tags搜索和显示功能. 更新友链页面.
```
## 前言
:::note{title="灵感来源"}
本主题配色灵感来源于`TRON: Legacy`. 唯一一个让我无脑热爱的电影.
:::

前段时间对博客有了一些新的需求, 需要增加本地化(i18n). 之前使用的`cactus`主题有点冗杂了, 计划在过年前后从0开始写一个带本地化功能的博客. Astro对于blog类型没有一个明确的规范, 这也导致了几乎每个主题的可扩展性都很差. 但是很容易上手, 我在跟着官网的demo过了一遍后就开始了这个项目. 

> 完成度高之后打包发布.
## 已实现
- remarkplugin修改md渲染
- 指定范围和i18n的pagefind搜索
- index页面输出最新文章/文章置顶
- 样式块:
:::warn
本主题配色灵感来源于`TRON: Legacy`. 唯一一个让我无脑热爱的电影.
:::

:::tip
本主题配色灵感来源于`TRON: Legacy`. 唯一一个让我无脑热爱的电影.
:::

:::danger
本主题配色灵感来源于`TRON: Legacy`. 唯一一个让我无脑热爱的电影.
:::

:::success
本主题配色灵感来源于`TRON: Legacy`. 唯一一个让我无脑热爱的电影.
:::

![一路摸索下来的思维导图](https://r2.asyncx.top/images/202402281206521.png)

其中`astro-pagefind`和`ViewTransition`这两个bug让我头疼了很长时间. `astro-pagefind`在build页面时候似乎会传递错误的参数, 会让`getstatic()`读取到`astro-pagefind`的信息. 时间问题没有仔细看`astro-pagefind`的代码, 有空我会提一个pr. 

关于`ViewTransition`, V2er的评价是仿原生, 兼容性问题很大. 我在转为使用`pagefind`后由于需要对/zh和/en双语索引, 发现如果不刷新全部页面就无法加载`pagefind.js`. 我在看了几篇文章[^1][^2]后, 发现他们的blog都没有开启ViewTransiton, 于是解决了问题.

[^1]: https://www.lirantal.com/blog/http-webhooks-firebase-functions-fastify-practical-case-study-lemon-squeezy

[^2]: https://chrispennington.blog/blog/pagefind-static-search-for-astro-sites/
