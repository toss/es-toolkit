---
layout: page
description: Interactive playground to explore es-toolkit functions
sidebar: false
aside: false
outline: false
pageClass: playground-page
---

<script setup>
import { defineAsyncComponent } from 'vue';

const Playground = defineAsyncComponent(() => import('./.vitepress/components/Playground.vue'));
</script>

<div class="playground-page-shell">
  <header class="playground-page-header">
    <h1>Playground</h1>
    <p>Explore and experiment with es-toolkit functions in this interactive playground. Select a function from the function list to see a live example, or write your own code.</p>
  </header>

  <Playground />
</div>
