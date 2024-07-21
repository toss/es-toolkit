import * as toolkit from './compat/index.ts';

interface Window {
  _: typeof toolkit;
}

declare let window: Window;
window._ = toolkit;
