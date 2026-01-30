import DefaultTheme from 'vitepress/theme';
import { defineAsyncComponent, h } from 'vue';
import './index.css';
import Banner from '../components/Banner.vue';
import BenchmarkChart from '../components/BenchmarkChart.vue';
import BenchmarkEnvironment from '../components/BenchmarkEnvironment.vue';
import BenchmarkTable from '../components/BenchmarkTable.vue';
import BundleSizeChart from '../components/BundleSizeChart.vue';
import BundleSizeTable from '../components/BundleSizeTable.vue';
import CompatibilityStatus from '../components/CompatibilityStatus.vue';

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
    app.component('BenchmarkChart', BenchmarkChart);
    app.component('BenchmarkTable', BenchmarkTable);
    app.component('BenchmarkEnvironment', BenchmarkEnvironment);
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(Banner),
    });
  },
};
