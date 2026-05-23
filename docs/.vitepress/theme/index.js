import DefaultTheme from 'vitepress/theme';
import { defineAsyncComponent, h } from 'vue';
import './index.css';
import Banner from '../components/Banner.vue';
import BundleSizeChart from '../components/BundleSizeChart.vue';
import BundleSizeTable from '../components/BundleSizeTable.vue';
import CompatibilityStatus from '../components/CompatibilityStatus.vue';
import FlavorDropdown from '../components/FlavorDropdown.vue';

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
    app.component('BundleSizeChart', BundleSizeChart);
    app.component('BundleSizeTable', BundleSizeTable);
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'sidebar-nav-before': () => h(FlavorDropdown),
      'layout-bottom': () => h(Banner),
    });
  },
};
