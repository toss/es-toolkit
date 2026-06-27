---
layout: page
description: es-toolkitの関数を試せるインタラクティブプレイグラウンド
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
    <h1>プレイグラウンド</h1>
    <p>このインタラクティブプレイグラウンドで es-toolkit の関数を探索・実験できます。関数リストから関数を選択してライブサンプルを確認するか、独自のコードを書いてみてください。</p>
  </header>

  <Playground />
</div>
