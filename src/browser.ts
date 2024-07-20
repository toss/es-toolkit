import * as toolkit from './compat/index.ts';

interface Window {
  _: typeof toolkit;
}

declare var window: Window;
window._ = toolkit;
