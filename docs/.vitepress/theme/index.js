import DefaultTheme from 'vitepress/theme';
import './index.css';
import { defineAsyncComponent } from 'vue';

/** @type {import('vitepress').Theme} */
export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.component(
      'Sandpack',
      defineAsyncComponent(() => import('../../components/Sandpack.vue'))
    );
  },
};
