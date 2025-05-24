import DefaultTheme from 'vitepress/theme';
import { defineAsyncComponent, h } from 'vue';
import './index.css';
import { BUNDLE_PATH } from '../../../configs/bundlePath.js';
import Banner from '../components/Banner.vue';
import CompatibilityStatus from '../components/CompatibilityStatus.vue';

const loadToolkitScripts = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const loadScript = src => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
  };

  loadScript(BUNDLE_PATH.ES_TOOLKIT);
  loadScript(BUNDLE_PATH.ES_TOOLKIT_COMPAT);

  setTimeout(() => {
    console.log(
      '%cTry es-toolkit in the console! 😃',
      'background: #0064FF; color: white; padding: 2px 4px; border-radius: 3px;'
    );
  }, 1000);
};

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component(
      'Sandpack',
      defineAsyncComponent(() => import('../components/Sandpack.vue'))
    );
    app.component('CompatibilityStatus', CompatibilityStatus);
    app.component('Banner', Banner);
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(Banner),
    });
  },
  setup() {
    loadToolkitScripts();
  },
};
