---
layout: page
description: 探索 es-toolkit 函数的交互式演练场
sidebar: false
aside: false
outline: false
pageClass: playground-page
---

<script setup>
import { defineAsyncComponent } from 'vue';

const Playground = defineAsyncComponent(() => import('../.vitepress/components/Playground.vue'));
</script>

<div class="playground-page-shell">
  <header class="playground-page-header">
    <h1>演练场</h1>
    <p>在这个交互式演练场中探索和试验 es-toolkit 函数。从函数列表选择一个函数查看实时示例，或者编写你自己的代码。</p>
  </header>

  <Playground />
</div>
