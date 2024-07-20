import * as toolkit from './index';

interface Window {
  _: typeof toolkit;
}

declare var window: Window;
window._ = toolkit;
