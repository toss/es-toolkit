import * as esToolkit from '../index';

const reEscape = /<%-([\s\S]+?)%>/g;
const reEvaluate = /<%([\s\S]+?)%>/g;
const reInterpolate = /<%=([\s\S]+?)%>/g;

export const templateSettings = {
  escape: reEscape,
  evaluate: reEvaluate,
  interpolate: reInterpolate,
  variable: '',
  imports: {
    _: esToolkit,
  },
};
