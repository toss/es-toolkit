---
description: Interactive playground to explore es-toolkit functions
aside: false
---

<script setup>
import { defineAsyncComponent } from 'vue';

const Playground = defineAsyncComponent(() => import('./.vitepress/components/Playground.vue'));
</script>

# Playground

Explore and experiment with es-toolkit functions in this interactive playground. Select a function from the sidebar to see a live example, or write your own code.

<Playground />
