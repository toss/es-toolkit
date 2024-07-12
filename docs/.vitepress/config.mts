import { defineConfig } from 'vitepress';
import { en } from './en.mts';
import { ko } from './ko.mts';
import { zh_hans } from './zh_hans.mts';
import { shared } from './shared.mts';

export default defineConfig({
  ...shared,
  locales: {
    root: { label: 'English', ...en },
    ko: { label: '한국어', ...ko },
    zh_hans: { label: '简体中文', ...zh_hans },
  },
});
