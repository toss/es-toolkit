---
description: es-toolkitの関数を試せるインタラクティブプレイグラウンド
aside: false
---

<script setup>
import { defineAsyncComponent } from 'vue';

const Playground = defineAsyncComponent(() => import('../.vitepress/components/Playground.vue'));
</script>

# プレイグラウンド

このインタラクティブプレイグラウンドで es-toolkit の関数を探索・実験できます。サイドバーから関数を選択してライブサンプルを確認するか、独自のコードを書いてみてください。

<Playground />
