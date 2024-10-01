import container from 'markdown-it-container';
import { defineConfig } from 'vitepress';
import { renderSandbox } from 'vitepress-plugin-sandpack';
import { en } from './en.mts';
import { ja } from './ja.mts';
import { ko } from './ko.mts';
import { shared } from './shared.mts';
import { zh_hans } from './zh_hans.mts';

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
