import { escape } from './escape.ts';
import { attempt } from '../function/attempt.ts';
import { defaults } from '../object/defaults.ts';
import { toString } from '../util/toString.ts';

// A regular expression for matching literal string in ES template string.
const esTemplateRegExp = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

// A regular expression for matching unescaped characters in string.
const unEscapedRegExp = /['\n\r\u2028\u2029\\]/g;

// A regular expression for matching no match.
const noMatchExp = /($^)/;

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

// Only import the necessary functions for preventing circular dependencies.(lodash-es also does this)
export const templateSettings = {
  escape: /<%-([\s\S]+?)%>/g,
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  variable: '',
  imports: {
    _: {
      escape,
      template,
    },
  },
};

/**
 * Creates a compiled template function that can interpolate data properties in "interpolate" delimiters, evaluate JavaScript code in "evaluate" delimiters, and escape data properties in "escape" delimiters.
 *
 * If `options` is provided, it takes precedence over `templateSettings` values.
 * In the development build, you can utilize the `sourceURL` option.
 *
 * @param {string} string - The template string.
 * @param {{ escape?: RegExp, evaluate?: RegExp, interpolate?: RegExp, variable?: string, imports?: Record<string, unknown>, sourceURL?: string }} [options] - The options object.
 * @param {RegExp} [options.escape] - The regular expression for "escape" delimiter.
 * @param {RegExp} [options.evaluate] - The regular expression for "evaluate" delimiter.
 * @param {RegExp} [options.interpolate] - The regular expression for "interpolate" delimiter.
 * @param {string} [options.variable] - The data object variable name.
 * @param {Record<string, unknown>} [options.imports] - The object of imported functions.
 * @param {string} [options.sourceURL] - The source URL of the template.
 * @param {unknown} [guard] - The guard to detect if the function is called with `options`.
 * @returns {(data?: object) => string} Returns the compiled template function.
 *
 * @example
 * // Use the "escape" delimiter to escape data properties.
 * const compiled = template('<%- value %>');
 * compiled({ value: '<div>' }); // returns '&lt;div&gt;'
 *
 * // Use the "interpolate" delimiter to interpolate data properties.
 * const compiled = template('<%= value %>');
 * compiled({ value: 'Hello, World!' }); // returns 'Hello, World!'
 *
 * // Use the "evaluate" delimiter to evaluate JavaScript code.
 * const compiled = template('<% if (value) { %>Yes<% } else { %>No<% } %>');
 * compiled({ value: true }); // returns 'Yes'
 *
 * // Use the "variable" option to specify the data object variable name.
 * const compiled = template('<%= data.value %>', { variable: 'data' });
 * compiled({ value: 'Hello, World!' }); // returns 'Hello, World!'
 *
 * // Use the "imports" option to import functions.
 * const compiled = template('<%= _.toUpper(value) %>', { imports: { _: { toUpper } } });
 * compiled({ value: 'hello, world!' }); // returns 'HELLO, WORLD!'
 *
 * // Use the custom "escape" delimiter.
 * const compiled = template('<@ value @>', { escape: /<@([\s\S]+?)@>/g });
 * compiled({ value: '<div>' }); // returns '&lt;div&gt;'
 *
 * // Use the custom "evaluate" delimiter.
 * const compiled = template('<# if (value) { #>Yes<# } else { #>No<# } #>', { evaluate: /<#([\s\S]+?)#>/g });
 * compiled({ value: true }); // returns 'Yes'
 *
 * // Use the custom "interpolate" delimiter.
 * const compiled = template('<$ value $>', { interpolate: /<\$([\s\S]+?)\$>/g });
 * compiled({ value: 'Hello, World!' }); // returns 'Hello, World!'
 *
 * // Use the "sourceURL" option to specify the source URL of the template.
 * const compiled = template('hello <%= user %>!', { sourceURL: 'template.js' });
 */
export function template(
  string: string,
  options?: {
    escape?: RegExp;
    evaluate?: RegExp;
    interpolate?: RegExp;
    variable?: string;
    imports?: Record<string, unknown>;
    sourceURL?: string;
  },
  guard?: unknown
): ((data?: object) => string) & { source: string } {
  string = toString(string);

  if (guard) {
    options = templateSettings;
  }

  options = defaults({ ...options }, templateSettings);

  const delimitersRegExp = new RegExp(
    [
      options.escape?.source ?? noMatchExp.source,
      options.interpolate?.source ?? noMatchExp.source,
      options.interpolate ? esTemplateRegExp.source : noMatchExp.source,
      options.evaluate?.source ?? noMatchExp.source,
      '$',
    ].join('|'),
    'g'
  );

  let lastIndex = 0;
  let isEvaluated = false;
  let source = `__p += ''`;

  for (const match of string.matchAll(delimitersRegExp)) {
    const [fullMatch, escapeValue, interpolateValue, esTemplateValue, evaluateValue] = match;
    const { index } = match;

    source += ` + '${string.slice(lastIndex, index).replace(unEscapedRegExp, escapeString)}'`;

    if (escapeValue) {
      source += ` + _.escape(${escapeValue})`;
    }

    if (interpolateValue) {
      source += ` + (${interpolateValue} ?? '')`;
    } else if (esTemplateValue) {
      source += ` + (${esTemplateValue} ?? '')`;
    }

    if (evaluateValue) {
      source += `;\n${evaluateValue};\n __p += ''`;
      isEvaluated = true;
    }

    lastIndex = index + fullMatch.length;
  }

  const imports = defaults({ ...options.imports }, templateSettings.imports);
  const importsKeys = Object.keys(imports);
  const importValues = Object.values(imports);

  const sourceURL = `//# sourceURL=${
    options.sourceURL ? String(options.sourceURL).replace(/[\r\n]/g, ' ') : `es-toolkit.templateSource[${Date.now()}]`
  }\n`;

  const compiledFunction = `function(${options.variable || 'obj'}) {
    let __p = '';
    ${options.variable ? '' : 'if (obj == null) { obj = {}; }'}
    ${isEvaluated ? `function print(...args) { __p += args.join(''); }` : ''}
    ${options.variable ? source : `with(obj) {\n${source}\n}`}
    return __p;
  }`;

  const result = attempt(() => new Function(...importsKeys, `${sourceURL}return ${compiledFunction}`)(...importValues));

  result.source = compiledFunction;

  if (result instanceof Error) {
    throw result;
  }

  return result;
}
