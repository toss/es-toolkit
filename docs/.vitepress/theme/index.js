import DefaultTheme from 'vitepress/theme';
import Sandpack from '../../components/Sandpack.vue';
import './index.css';

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.component('Sandpack', Sandpack);
  },
};
