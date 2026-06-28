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
import FlavorDropdown from '../components/FlavorDropdown.vue';
import FpBenchmarkChart from '../components/FpBenchmarkChart.vue';
import FpBenchmarkEnvironment from '../components/FpBenchmarkEnvironment.vue';
import FpBenchmarkTable from '../components/FpBenchmarkTable.vue';
import FpBundleSizeChart from '../components/FpBundleSizeChart.vue';
import FpBundleSizeTable from '../components/FpBundleSizeTable.vue';

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
    app.component('FpBundleSizeChart', FpBundleSizeChart);
    app.component('FpBundleSizeTable', FpBundleSizeTable);
    app.component('FpBenchmarkChart', FpBenchmarkChart);
    app.component('FpBenchmarkTable', FpBenchmarkTable);
    app.component('FpBenchmarkEnvironment', FpBenchmarkEnvironment);
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'sidebar-nav-before': () => h(FlavorDropdown),
      'layout-bottom': () => h(Banner),
    });
  },
};
