import { defineConfig } from 'vitepress';
import container from 'markdown-it-container';
import { renderSandbox } from 'vitepress-plugin-sandpack';
import { en } from './en.mts';
import { ko } from './ko.mts';
import { ja } from './ja.mts';
import { zh_hans } from './zh_hans.mts';
import { shared } from './shared.mts';

export default defineConfig({
  ...shared,
  locales: {
    root: { label: 'English', ...en },
    ko: { label: '한국어', ...ko },
    zh_hans: { label: '简体中文', ...zh_hans },
    ja: { label: '日本語', ...ja },
  },
  markdown: {
    config(md) {
      md.use(container, 'sandpack', {
        render(tokens: any[], idx: number) {
          return renderSandbox(tokens, idx, 'sandpack');
        },
      });
    },
  },
});
