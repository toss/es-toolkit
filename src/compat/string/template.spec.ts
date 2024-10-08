import { describe, expect, it } from 'vitest';
import { template } from './template';
import { templateSettings } from './templateSettings';
import { numberTag } from '../_internal/numberTag';
import { stubFalse } from '../_internal/stubFalse';
import { stubString } from '../_internal/stubString';
import { stubTrue } from '../_internal/stubTrue';
import * as esToolkit from '../index';

describe('template', () => {
  it('should escape values in "escape" delimiters', () => {
    const strings = ['<p><%- value %></p>', '<p><%-value%></p>', '<p><%-\nvalue\n%></p>'];
    const expected = strings.map(esToolkit.constant('<p>&amp;&lt;&gt;&quot;&#39;/</p>'));
    const data = { value: '&<>"\'/' };

    const actual = strings.map(string => template(string)(data));

    expect(actual).toEqual(expected);
  });

  it('should not reference `_.escape` when "escape" delimiters are not used', () => {
    const compiled = template('<%= typeof __e %>');
    expect(compiled({})).toBe('undefined');
  });

  it('should evaluate JavaScript in "evaluate" delimiters', () => {
    const compiled = template(
      '<ul><%\
      for (var key in collection) {\
        %><li><%= collection[key] %></li><%\
      } %></ul>'
    );

    const data = { collection: { a: 'A', b: 'B' } };
    const actual = compiled(data);

    expect(actual).toBe('<ul><li>A</li><li>B</li></ul>');
  });

  it('should support "evaluate" delimiters with single line comments (test production builds)', () => {
    const compiled = template('<% // A code comment. %><% if (value) { %>yap<% } else { %>nope<% } %>');
    const data = { value: true };

    expect(compiled(data)).toBe('yap');
  });

  it('should support referencing variables declared in "evaluate" delimiters from other delimiters', () => {
    const compiled = template('<% var b = a; %><%= b.value %>');
    const data = { a: { value: 1 } };

    expect(compiled(data)).toBe('1');
  });

  it('should interpolate data properties in "interpolate" delimiters', () => {
    const strings = ['<%= a %>BC', '<%=a%>BC', '<%=\na\n%>BC'];
    const expected = strings.map(esToolkit.constant('ABC'));
    const data = { a: 'A' };

    const actual = strings.map(string => template(string)(data));

    expect(actual).toEqual(expected);
  });

  it('should support "interpolate" delimiters with escaped values', () => {
    const compiled = template('<%= a ? "a=\\"A\\"" : "" %>');
    const data = { a: true };

    expect(compiled(data)).toBe('a="A"');
  });

  it('should support "interpolate" delimiters containing ternary operators', () => {
    const compiled = template('<%= value ? value : "b" %>');
    const data = { value: 'a' };

    expect(compiled(data)).toBe('a');
  });

  it('should support "interpolate" delimiters containing global values', () => {
    const compiled = template('<%= typeof Math.abs %>');

    const actual = compiled();

    expect(actual).toBe('function');
  });

  it('should support complex "interpolate" delimiters', () => {
    Object.entries({
      '<%= a + b %>': '3',
      '<%= b - a %>': '1',
      '<%= a = b %>': '2',
      '<%= !a %>': 'false',
      '<%= ~a %>': '-2',
      '<%= a * b %>': '2',
      '<%= a / b %>': '0.5',
      '<%= a % b %>': '1',
      '<%= a >> b %>': '0',
      '<%= a << b %>': '4',
      '<%= a & b %>': '0',
      '<%= a ^ b %>': '3',
      '<%= a | b %>': '3',
      '<%= {}.toString.call(0) %>': numberTag,
      '<%= a.toFixed(2) %>': '1.00',
      '<%= obj["a"] %>': '1',
      '<%= delete a %>': 'true',
      '<%= "a" in obj %>': 'true',
      '<%= obj instanceof Object %>': 'true',
      '<%= new Boolean %>': 'false',
      '<%= typeof a %>': 'number',
      '<%= void a %>': '',
    }).forEach(([key, value]) => {
      const compiled = template(key);
      const data = { a: 1, b: 2 };

      expect(compiled(data)).toBe(value);
    });
  });

  it('should support ES6 template delimiters', () => {
    const data = { value: 2 };
    expect(template('1${value}3')(data)).toBe('123');
    expect(template('${"{" + value + "\\}"}')(data)).toBe('{2}');
  });

  it('should support the "imports" option', () => {
    const compiled = template('<%= a %>', { imports: { a: 1 } });
    expect(compiled({})).toBe('1');
  });

  it('should support the "variable" options', () => {
    // We don't have `each` function.
    // const compiled = template('<% _.each( data.a, function( value ) { %>' + '<%= value.valueOf() %>' + '<% }) %>', {
    //   variable: 'data',
    // });
    // const data = { a: [1, 2, 3] };
    // expect(compiled(data)).toBe('123');

    const compiled = template('<%= data.a %>', { variable: 'data' });
    const data = { a: [1, 2, 3] };
    expect(compiled(data)).toBe('1,2,3');
  });

  it('should support custom delimiters', () => {
    esToolkit.times(2, index => {
      const settingsClone = esToolkit.clone(templateSettings);

      const settings = Object.assign(index ? templateSettings : {}, {
        escape: /\{\{-([\s\S]+?)\}\}/g,
        evaluate: /\{\{([\s\S]+?)\}\}/g,
        interpolate: /\{\{=([\s\S]+?)\}\}/g,
      });

      const expected = '<ul><li>0: a &amp; A</li><li>1: b &amp; B</li></ul>';
      // We don't have `each` function.
      // const compiled = template(
      //   '<ul>{{ _.each(collection, function(value, index) {}}<li>{{= index }}: {{- value }}</li>{{}); }}</ul>',
      //   index ? null : settings
      // );
      const compiled = template(
        '<ul>{{ collection.forEach((value, index) => {}}<li>{{= index }}: {{- value }}</li>{{}); }}</ul>',
        index ? (null as any) : settings
      );
      const data = { collection: ['a & A', 'b & B'] };

      expect(compiled(data)).toBe(expected);
      Object.assign(templateSettings, settingsClone);
    });
  });

  it('should support custom delimiters containing special characters', () => {
    esToolkit.times(2, index => {
      const settingsClone = esToolkit.clone(templateSettings);

      const settings = Object.assign(index ? templateSettings : {}, {
        escape: /<\?-([\s\S]+?)\?>/g,
        evaluate: /<\?([\s\S]+?)\?>/g,
        interpolate: /<\?=([\s\S]+?)\?>/g,
      });

      const expected = '<ul><li>0: a &amp; A</li><li>1: b &amp; B</li></ul>';
      // We don't have `each` function.
      // const compiled = template(
      //   '<ul><? _.each(collection, function(value, index) { ?><li><?= index ?>: <?- value ?></li><? }); ?></ul>',
      //   index ? null : settings
      // );
      const compiled = template(
        '<ul><? collection.forEach((value, index) => { ?><li><?= index ?>: <?- value ?></li><? }); ?></ul>',
        index ? (null as any) : settings
      );
      const data = { collection: ['a & A', 'b & B'] };

      expect(compiled(data)).toBe(expected);
      Object.assign(templateSettings, settingsClone);
    });
  });

  it('should use a `with` statement by default', () => {
    // We don't have `each` function.
    // const compiled = template(
    //   '<%= index %><%= collection[index] %><% _.each(collection, function(value, index) { %><%= index %><% }); %>'
    // );
    const compiled = template(
      '<%= index %><%= collection[index] %><% collection.forEach((value, index) => { %><%= index %><% }); %>'
    );
    const actual = compiled({ index: 1, collection: ['a', 'b', 'c'] });
    expect(actual).toBe('1b012');
  });

  // We couldn't change imported modules because of bundling settings.

  // it('should use `_.templateSettings.imports._.templateSettings`', () => {
  //   const toolkit = templateSettings.imports._;
  //   const settingsClone = esToolkit.clone(toolkit.templateSettings);

  //   toolkit.templateSettings = Object.assign(toolkit.templateSettings, {
  //     interpolate: /\{\{=([\s\S]+?)\}\}/g,
  //   });

  //   const compiled = template('{{= a }}');
  //   expect(compiled({ a: 1 })).toBe('1');

  //   Object.assign(toolkit.templateSettings, settingsClone);
  // });

  it('should fallback to `_.templateSettings`', () => {
    const esToolkit = templateSettings.imports._;
    const delimiter = templateSettings.interpolate;

    templateSettings.imports._ = { escape: esToolkit.escape } as any;
    templateSettings.interpolate = /\{\{=([\s\S]+?)\}\}/g;

    const compiled = template('{{= a }}');
    expect(compiled({ a: 1 })).toBe('1');

    templateSettings.imports._ = esToolkit;
    templateSettings.interpolate = delimiter;
  });

  it('should ignore `null` delimiters', () => {
    const delimiter = {
      escape: /\{\{-([\s\S]+?)\}\}/g,
      evaluate: /\{\{([\s\S]+?)\}\}/g,
      interpolate: /\{\{=([\s\S]+?)\}\}/g,
    };

    (
      [
        ['escape', '{{- a }}'],
        ['evaluate', '{{ print(a) }}'],
        ['interpolate', '{{= a }}'],
      ] as const
    ).forEach(([key, value]) => {
      const settings: any = { escape: null, evaluate: null, interpolate: null };
      settings[key] = delimiter[key];

      try {
        const expected = '1 <%- a %> <% print(a) %> <%= a %>';
        const compiled = template(`${value} <%- a %> <% print(a) %> <%= a %>`, settings);
        const data = { a: 1 };

        expect(compiled(data)).toBe(expected);
      } catch (e) {
        console.log(e);
      }
    });
  });

  it('should work without delimiters', () => {
    const expected = 'abc';
    expect(template(expected)({})).toBe(expected);
  });

  it('should work with `this` references', () => {
    const compiled = template('a<%= this.String("b") %>c');
    expect(compiled()).toBe('abc');

    const object: any = { b: 'B' };
    object.compiled = template('A<%= this.b %>C', { variable: 'obj' });
    expect(object.compiled()).toBe('ABC');
  });

  it('should work with backslashes', () => {
    const compiled = template('<%= a %> \\b');
    const data = { a: 'A' };

    expect(compiled(data)).toBe('A \\b');
  });

  it('should work with escaped characters in string literals', () => {
    let compiled = template('<% print("\'\\n\\r\\t\\u2028\\u2029\\\\") %>');
    expect(compiled()).toBe("'\n\r\t\u2028\u2029\\");

    const data = { a: 'A' };
    compiled = template('\'\n\r\t<%= a %>\u2028\u2029\\"');
    expect(compiled(data)).toBe('\'\n\r\tA\u2028\u2029\\"');
  });

  it('should handle \\u2028 & \\u2029 characters', () => {
    const compiled = template('\u2028<%= "\\u2028\\u2029" %>\u2029');
    expect(compiled()).toBe('\u2028\u2028\u2029\u2029');
  });

  it('should work with statements containing quotes', () => {
    const compiled = template(
      '<%\
      if (a === \'A\' || a === "a") {\
        %>\'a\',"A"<%\
      } %>'
    );

    const data = { a: 'A' };
    expect(compiled(data), '\'a\').toBe("A"');
  });

  it('should work with templates containing newlines and comments', () => {
    const compiled = template(
      '<%\n\
      // A code comment.\n\
      if (value) { value += 3; }\n\
      %><p><%= value %></p>'
    );

    expect(compiled({ value: 3 })).toBe('<p>6</p>');
  });

  it('should tokenize delimiters', () => {
    const compiled = template('<span class="icon-<%= type %>2"></span>');
    const data = { type: 1 };

    expect(compiled(data)).toBe('<span class="icon-12"></span>');
  });

  it('should evaluate delimiters once', () => {
    const actual: any[] = [];
    const compiled = template('<%= func("a") %><%- func("b") %><% func("c") %>');
    const data = {
      func: function (value: any) {
        actual.push(value);
      },
    };

    compiled(data);
    expect(actual).toEqual(['a', 'b', 'c']);
  });

  it('should match delimiters before escaping text', () => {
    const compiled = template('<<\n a \n>>', { evaluate: /<<(.*?)>>/g });
    expect(compiled()).toBe('<<\n a \n>>');
  });

  it('should resolve nullish values to an empty string', () => {
    let compiled = template('<%= a %><%- a %>');
    let data: any = { a: null };

    expect(compiled(data)).toBe('');

    data = { a: undefined };
    expect(compiled(data)).toBe('');

    data = { a: {} };
    compiled = template('<%= a.b %><%- a.b %>');
    expect(compiled(data)).toBe('');
  });

  it('should return an empty string for empty values', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined, ''];
    const expected = values.map(stubString);
    const data = { a: 1 };

    const actual = values.map((value, index) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const compiled = index ? template(value) : template();
      return compiled(data);
    });

    expect(actual).toEqual(expected);
  });

  it('should parse delimiters without newlines', () => {
    const expected = '<<\nprint("<p>" + (value ? "yes" : "no") + "</p>")\n>>';
    const compiled = template(expected, { evaluate: /<<(.+?)>>/g });
    const data = { value: true };

    expect(compiled(data)).toBe(expected);
  });

  it('should support recursive calls', () => {
    const compiled = template('<%= a %><% a = _.template(c)(obj) %><%= a %>');
    const data = { a: 'A', b: 'B', c: '<%= b %>' };

    expect(compiled(data)).toBe('AB');
  });

  it('should coerce `text` to a string', () => {
    const object = { toString: esToolkit.constant('<%= a %>') };
    const data = { a: 1 };

    expect(template(object as string)(data)).toBe('1');
  });

  it('should not modify the `options` object', () => {
    const options = {};
    template('', options);
    expect(options).toEqual({});
  });

  it('should not modify `_.templateSettings` when `options` are given', () => {
    const data = { a: 1 };

    expect('a' in templateSettings).toBe(false);
    template('', {}, data);
    expect('a' in templateSettings).toBe(false);

    delete templateSettings.a;
  });

  it('should not error for non-object `data` and `options` values', () => {
    template('')(1 as any);
    expect(true, '`data` value');

    template('', 1 as any)(1 as any);
    expect(true, '`options` value');
  });

  it('should expose the source on compiled templates', () => {
    const compiled = template('x');
    const values = [String(compiled), compiled.source];
    const expected = values.map(stubTrue);

    const actual = values.map(value => esToolkit.includes(value, '__p'));

    expect(actual).toEqual(expected);
  });

  it('should expose the source on SyntaxErrors', () => {
    try {
      template('<% if x %>');
    } catch (e: any) {
      if (e instanceof SyntaxError) {
        expect(esToolkit.includes((e as any).source, '__p')).toBe(true);
      }
    }
  });

  it('should not include sourceURLs in the source', () => {
    const options = { sourceURL: '/a/b/c' };
    const compiled = template('x', options);
    const values = [compiled.source, undefined];

    try {
      template('<% if x %>', options);
    } catch (e: any) {
      values[1] = e.source;
    }
    const expected = values.map(stubFalse);

    const actual = values.map(value => esToolkit.includes(value as any, 'sourceURL'));

    expect(actual).toEqual(expected);
  });

  it('should work as an iteratee for methods like `_.map`', () => {
    const array = ['<%= a %>', '<%- b %>', '<% print(c) %>'];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const compiles = array.map(template);
    const data = { a: 'one', b: '"two"', c: 'three' };

    const actual = compiles.map(compiled => compiled(data));

    expect(actual).toEqual(['one', '&quot;two&quot;', 'three']);
  });
});
