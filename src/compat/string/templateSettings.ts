import * as esToolkit from '../index';

export const templateSettings = {
  escape: /<%-([\s\S]+?)%>/g,
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  variable: '',
  imports: {
    _: esToolkit,
  },
};
