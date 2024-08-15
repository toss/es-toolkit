<template>
  <Sandbox
    :rtl="rtl"
    template="vanilla-ts"
    :light-theme="lightTheme"
    :dark-theme="darkTheme"
    :options="{
      ...props,
      showLineNumbers: true,
      showConsole: true,
      showTabs: false,
    }"
    :custom-setup="{
      ...props,
      deps: {
        'es-toolkit': 'latest',
      },
    }"
    :code-options="codeOptions"
  >
    <slot />
  </Sandbox>
</template>

<script setup>
import { Sandbox, sandboxProps } from 'vitepress-plugin-sandpack';

const props = defineProps(sandboxProps);
</script>

<style>
.sp-preview {
  display: none !important;
}
</style>
