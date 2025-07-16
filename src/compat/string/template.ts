import { escape } from './escape.ts';
import { attempt } from '../function/attempt.ts';
import { defaults } from '../object/defaults.ts';
import { keys as keysToolkit } from '../object/keys.ts';
import { values as valuesToolkit } from '../object/values.ts';
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

interface TemplateOptions {
  escape?: RegExp | null | undefined;
  evaluate?: RegExp | null | undefined;
  interpolate?: RegExp | null | undefined;
  variable?: string | undefined;
  imports?: Record<string, any> | undefined;
  sourceURL?: string;
}

interface TemplateExecutor {
  (data?: object): string;
  source: string;
}

export function template(string?: string, options?: TemplateOptions): TemplateExecutor;

/**
 * Compiles a template string into a function that can interpolate data properties.
 *
 * This function allows you to create a template with custom delimiters for escaping,
 * evaluating, and interpolating values. It can also handle custom variable names and
 * imported functions.
 *
 * @param {string} string - The template string.
 * @param {TemplateOptions} [options] - The options object.
 * @param {RegExp | null | undefined} [options.escape] - The regular expression for "escape" delimiter.
 * @param {RegExp | null | undefined} [options.evaluate] - The regular expression for "evaluate" delimiter.
 * @param {RegExp | null | undefined} [options.interpolate] - The regular expression for "interpolate" delimiter.
 * @param {string | undefined} [options.variable] - The data object variable name.
 * @param {Record<string, any> | undefined} [options.imports] - The object of imported functions.
 * @param {string | undefined} [options.sourceURL] - The source URL of the template.
 * @param {object} [guard] - The guard to detect if the function is called with `options`.
 * @returns {TemplateExecutor} Returns the compiled template function.
 *
 * @example
 * // Use the "escape" delimiter to escape data properties.
 * const compiled = template('<%- value %>');
 * compiled({ value: '<div>' }); // returns '&lt;div&gt;'
 *
 * @example
 * // Use the "interpolate" delimiter to interpolate data properties.
 * const compiled = template('<%= value %>');
 * compiled({ value: 'Hello, World!' }); // returns 'Hello, World!'
 *
 * @example
 * // Use the "evaluate" delimiter to evaluate JavaScript code.
 * const compiled = template('<% if (value) { %>Yes<% } else { %>No<% } %>');
 * compiled({ value: true }); // returns 'Yes'
 *
 * @example
 * // Use the "variable" option to specify the data object variable name.
 * const compiled = template('<%= data.value %>', { variable: 'data' });
 * compiled({ value: 'Hello, World!' }); // returns 'Hello, World!'
 *
 * @example
 * // Use the "imports" option to import functions.
 * const compiled = template('<%= _.toUpper(value) %>', { imports: { _: { toUpper } } });
 * compiled({ value: 'hello, world!' }); // returns 'HELLO, WORLD!'
 *
 * @example
 * // Use the custom "escape" delimiter.
 * const compiled = template('<@ value @>', { escape: /<@([\s\S]+?)@>/g });
 * compiled({ value: '<div>' }); // returns '&lt;div&gt;'
 *
 * @example
 * // Use the custom "evaluate" delimiter.
 * const compiled = template('<# if (value) { #>Yes<# } else { #>No<# } #>', { evaluate: /<#([\s\S]+?)#>/g });
 * compiled({ value: true }); // returns 'Yes'
 *
 * @example
 * // Use the custom "interpolate" delimiter.
 * const compiled = template('<$ value $>', { interpolate: /<\$([\s\S]+?)\$>/g });
 * compiled({ value: 'Hello, World!' }); // returns 'Hello, World!'
 *
 * @example
 * // Use the "sourceURL" option to specify the source URL of the template.
 * const compiled = template('hello <%= user %>!', { sourceURL: 'template.js' });
 */
export function template(string?: string, options?: TemplateOptions, guard?: object): TemplateExecutor {
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

  string.replace(
    delimitersRegExp,
    (fullMatch, escapeValue, interpolateValue, esTemplateValue, evaluateValue, index) => {
      source += ` + '${string.slice(lastIndex, index).replace(unEscapedRegExp, escapeString)}'`;

      if (escapeValue) {
        source += ` + _.escape(${escapeValue})`;
      }

      if (interpolateValue) {
        source += ` + ((${interpolateValue}) == null ? '' : ${interpolateValue})`;
      } else if (esTemplateValue) {
        source += ` + ((${esTemplateValue}) == null ? '' : ${esTemplateValue})`;
      }

      if (evaluateValue) {
        source += `;\n${evaluateValue};\n __p += ''`;
        isEvaluated = true;
      }

      lastIndex = index + fullMatch.length;

      return fullMatch;
    }
  );

  const imports = defaults({ ...options.imports }, templateSettings.imports);
  const importsKeys = keysToolkit(imports);
  const importValues = valuesToolkit(imports);

  const sourceURL = `//# sourceURL=${
    options.sourceURL ? String(options.sourceURL).replace(/[\r\n]/g, ' ') : `es-toolkit.templateSource[${Date.now()}]`
  }\n`;

  const compiledFunction = `function(${options.variable || 'obj'}) {
    let __p = '';
    ${options.variable ? '' : 'if (obj == null) { obj = {}; }'}
    ${isEvaluated ? `function print() { __p += Array.prototype.join.call(arguments, ''); }` : ''}
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
