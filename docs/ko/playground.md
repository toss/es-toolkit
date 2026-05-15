---
description: es-toolkit 함수를 탐색할 수 있는 인터랙티브 플레이그라운드
aside: false
pageClass: playground-page
---

<script setup>
import { defineAsyncComponent } from 'vue';

const Playground = defineAsyncComponent(() => import('../.vitepress/components/Playground.vue'));
</script>

# 플레이그라운드

인터랙티브 플레이그라운드에서 es-toolkit 함수를 탐색하고 실험해 보세요. 사이드바에서 함수를 선택하면 라이브 예제를 볼 수 있고, 직접 코드를 작성할 수도 있어요.

<Playground />
