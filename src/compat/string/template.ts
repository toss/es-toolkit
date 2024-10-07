import { templateSettings } from './templateSettings.ts';
import { defaults } from '../object/defaults.ts';
import { toString } from '../util/toString.ts';

const esTemplateRegExp = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
const unEscapedRegExp = /['\n\r\u2028\u2029\\]/g;

const escapeMap = new Map([
  ['\\', '\\'],
  ["'", "'"],
  ['\n', 'n'],
  ['\r', 'r'],
  ['\u2028', 'u2028'],
  ['\u2029', 'u2029'],
]);

function escapeString(match: string): string {
  return `\\${escapeMap.get(match)}`;
}

export function template(
  string: string,
  options?: {
    escape?: RegExp;
    evaluate?: RegExp;
    interpolate?: RegExp;
    variable?: string;
    sourceURL?: string;
    imports?: object;
  },
  guard?: unknown
): ((...args: unknown[]) => string) & { source: string } {
  string = toString(string);

  if (guard) {
    options = templateSettings;
  }

  options = defaults(options || {}, templateSettings);

  const availableDelimiters = [
    options.escape?.source,
    options.interpolate?.source,
    options.interpolate ? esTemplateRegExp.source : undefined,
    options.evaluate?.source,
    '$',
  ].filter(Boolean);
  const delimitersRegExp = new RegExp(availableDelimiters.join('|'), 'g');

  let index = 0;
  let isEvaluated = false;
  const functionBody = [`__p += ''`];

  string.replace(delimitersRegExp, (match, esacape, interpolate, esTemplate, evaluate, offset) => {
    functionBody.push(`+ '${string.slice(index, offset).replace(unEscapedRegExp, escapeString)}'`);

    if (!interpolate) {
      interpolate = esTemplate;
    }

    if (esacape) {
      functionBody.push(`+ _.escape(${esacape})`);
    }

    if (interpolate) {
      functionBody.push(`+ (${interpolate} ?? '')`);
    }

    if (evaluate) {
      functionBody.push(`; ${evaluate};\n __p += ''`);
      isEvaluated = true;
    }

    index = offset + match.length;

    return match;
  });

  const source = options.variable ? functionBody.join('\n') : `with(obj) {\n${functionBody.join('\n')}\n}`;
  const functionString = `function(${options.variable || 'obj'}) {
  let __p = '';
  ${options.variable ? '' : 'obj || (obj = {});'}
  ${isEvaluated ? `function print() { __p += Array.prototype.join.call(arguments, ''); }` : ''}
  ${source};
  return __p;
}`;

  const imports = defaults(options.imports || {}, templateSettings.imports);
  const importsKeys = Object.keys(imports);
  const importValues = Object.values(imports);

  const newFunction = new Function(...importsKeys, `return ${functionString}`)(...importValues);

  newFunction.source = functionString;

  return newFunction;
}
