import DefaultTheme from 'vitepress/theme';
import { defineAsyncComponent } from 'vue';
import './index.css';
import CompatibilityStatus from '../components/CompatibilityStatus.vue';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component(
      // eslint-disable-next-line vue/multi-word-component-names
      'Sandpack',
      defineAsyncComponent(() => import('../components/Sandpack.vue'))
    );
    app.component('CompatibilityStatus', CompatibilityStatus);
  },
};
