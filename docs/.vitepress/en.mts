import { type DefaultTheme, defineConfig } from 'vitepress';

export const en = defineConfig({
  lang: 'en',
  description:
    'A state-of-the-art, high-performance JavaScript utility library with a small bundle size and strong type annotations.',

  themeConfig: {
    nav: nav(),

    sidebar: sidebar(),

    editLink: {
      pattern: 'https://github.com/toss/es-toolkit/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()} Viva Republica, Inc.`,
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Home', link: '/' },
    { text: 'Introduction', link: '/intro' },
    { text: 'Reference', link: '/reference/array/chunk' },
  ];
}

function sidebar(): DefaultTheme.Sidebar {
  return [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/intro' },
        { text: 'Installation & Usage', link: '/usage' },
        { text: 'Impact on Bundle Size', link: '/bundle-size' },
        { text: 'Performance', link: '/performance' },
        { text: 'Compatibility with Lodash', link: '/compatibility' },
      ],
    },
    {
      text: 'Reference',
      items: [
        {
          text: 'Array Utilities',
          items: [
            { text: 'chunk', link: '/reference/array/chunk' },
            { text: 'concat (compat)', link: '/reference/compat/array/concat' },
            { text: 'countBy', link: '/reference/array/countBy' },
            { text: 'compact', link: '/reference/array/compact' },
            { text: 'difference', link: '/reference/array/difference' },
            { text: 'differenceBy', link: '/reference/array/differenceBy' },
            { text: 'differenceWith', link: '/reference/array/differenceWith' },
            { text: 'drop', link: '/reference/array/drop' },
            { text: 'dropWhile', link: '/reference/array/dropWhile' },
            { text: 'dropRight', link: '/reference/array/dropRight' },
            { text: 'dropRightWhile', link: '/reference/array/dropRightWhile' },
            { text: 'fill', link: '/reference/array/fill' },
            { text: 'toFilled', link: '/reference/array/toFilled' },
            { text: 'flatMap', link: '/reference/array/flatMap' },
            { text: 'flatten', link: '/reference/array/flatten' },
            { text: 'flattenDeep', link: '/reference/array/flattenDeep' },
            { text: 'forEachRight', link: '/reference/array/forEachRight' },
            { text: 'groupBy', link: '/reference/array/groupBy' },
            { text: 'intersection', link: '/reference/array/intersection' },
            { text: 'intersectionBy', link: '/reference/array/intersectionBy' },
            {
              text: 'intersectionWith',
              link: '/reference/array/intersectionWith',
            },
            { text: 'isSubset', link: '/reference/array/isSubset' },
            { text: 'keyBy', link: '/reference/array/keyBy' },
            { text: 'minBy', link: '/reference/array/minBy' },
            { text: 'maxBy', link: '/reference/array/maxBy' },
            { text: 'min (compat)', link: '/reference/compat/array/min' },
            { text: 'max (compat)', link: '/reference/compat/array/max' },
            { text: 'orderBy', link: '/reference/array/orderBy' },
            { text: 'partition', link: '/reference/array/partition' },
            { text: 'sample', link: '/reference/array/sample' },
            { text: 'sampleSize', link: '/reference/array/sampleSize' },
            { text: 'shuffle', link: '/reference/array/shuffle' },
            { text: 'size', link: '/reference/array/size' },
            { text: 'take', link: '/reference/array/take' },
            { text: 'takeWhile', link: '/reference/array/takeWhile' },
            { text: 'takeRight', link: '/reference/array/takeRight' },
            { text: 'takeRightWhile', link: '/reference/array/takeRightWhile' },
            { text: 'union', link: '/reference/array/union' },
            { text: 'unionBy', link: '/reference/array/unionBy' },
            { text: 'unionWith', link: '/reference/array/unionWith' },
            { text: 'uniq', link: '/reference/array/uniq' },
            { text: 'uniqBy', link: '/reference/array/uniqBy' },
            { text: 'uniqWith', link: '/reference/array/uniqWith' },
            { text: 'unzip', link: '/reference/array/unzip' },
            { text: 'unzipWith', link: '/reference/array/unzipWith' },
            { text: 'without', link: '/reference/array/without' },
            { text: 'xor', link: '/reference/array/xor' },
            { text: 'xorBy', link: '/reference/array/xorBy' },
            { text: 'xorWith', link: '/reference/array/xorWith' },
            { text: 'zip', link: '/reference/array/zip' },
            { text: 'zipObject', link: '/reference/array/zipObject' },
            { text: 'zipObjectDeep (compat)', link: '/reference/compat/array/zipObjectDeep' },
            { text: 'zipWith', link: '/reference/array/zipWith' },
            { text: 'head', link: '/reference/array/head' },
            { text: 'tail', link: '/reference/array/tail' },
            { text: 'last', link: '/reference/array/last' },
            { text: 'initial', link: '/reference/array/initial' },
          ],
        },
        {
          text: 'Function Utilities',
          items: [
            { text: 'before', link: '/reference/function/before' },
            { text: 'after', link: '/reference/function/after' },
            { text: 'debounce', link: '/reference/function/debounce' },
            { text: 'throttle', link: '/reference/function/throttle' },
            { text: 'negate', link: '/reference/function/negate' },
            { text: 'once', link: '/reference/function/once' },
            { text: 'noop', link: '/reference/function/noop' },
            { text: 'ary', link: '/reference/function/ary' },
            { text: 'unary', link: '/reference/function/unary' },
            { text: 'bind', link: '/reference/function/bind' },
          ],
        },
        {
          text: 'Math Utilities',
          items: [
            { text: 'clamp', link: '/reference/math/clamp' },
            { text: 'inRange', link: '/reference/math/inRange' },
            { text: 'mean', link: '/reference/math/mean' },
            { text: 'meanBy', link: '/reference/math/meanBy' },
            { text: 'random', link: '/reference/math/random' },
            { text: 'randomInt', link: '/reference/math/randomInt' },
            { text: 'range', link: '/reference/math/range' },
            { text: 'round', link: '/reference/math/round' },
            { text: 'sum', link: '/reference/math/sum' },
            { text: 'sumBy', link: '/reference/math/sumBy' },
          ],
        },
        {
          text: 'Object Utilities',
          items: [
            { text: 'clone', link: '/reference/object/clone' },
            { text: 'cloneDeep', link: '/reference/object/cloneDeep' },
            { text: 'invert', link: '/reference/object/invert' },
            { text: 'flattenObject', link: '/reference/object/flattenObject' },
            { text: 'mapKeys', link: '/reference/object/mapKeys' },
            { text: 'mapValues', link: '/reference/object/mapValues' },
            { text: 'omit', link: '/reference/object/omit' },
            { text: 'omitBy', link: '/reference/object/omitBy' },
            { text: 'pick', link: '/reference/object/pick' },
            { text: 'pickBy', link: '/reference/object/pickBy' },
            { text: 'get (compat)', link: '/reference/compat/object/get' },
            { text: 'set (compat)', link: '/reference/compat/object/set' },
            { text: 'property (compat)', link: '/reference/compat/object/property' },
          ],
        },
        {
          text: 'Predicates',
          items: [
            { text: 'isArguments', link: '/reference/predicate/isArguments' },
            { text: 'isArray (compat)', link: '/reference/compat/predicate/isArray' },
            { text: 'isArrayLike', link: '/reference/predicate/isArrayLike' },
            { text: 'isBoolean', link: '/reference/predicate/isBoolean' },
            { text: 'isEqual', link: '/reference/predicate/isEqual' },
            { text: 'isFunction', link: '/reference/predicate/isFunction' },
            { text: 'isLength', link: '/reference/predicate/isLength' },
            { text: 'isPlainObject', link: '/reference/predicate/isPlainObject' },
            { text: 'isPrimitive', link: '/reference/predicate/isPrimitive' },
            { text: 'isMatch (compat)', link: '/reference/compat/predicate/isMatch' },
            { text: 'matches (compat)', link: '/reference/compat/predicate/matches' },
            { text: 'isNil', link: '/reference/predicate/isNil' },
            { text: 'isNotNil', link: '/reference/predicate/isNotNil' },
            { text: 'isNull', link: '/reference/predicate/isNull' },
            { text: 'isObjectLike', link: '/reference/predicate/isObjectLike' },
            { text: 'isTypedArray', link: '/reference/predicate/isTypedArray' },
            { text: 'isUndefined', link: '/reference/predicate/isUndefined' },
          ],
        },
        {
          text: 'Promise Utilities',
          items: [
            { text: 'delay', link: '/reference/promise/delay' },
            { text: 'timeout', link: '/reference/promise/timeout' },
            { text: 'withTimeout', link: '/reference/promise/withTimeout' },
          ],
        },
        {
          text: 'String Utilities',
          items: [
            { text: 'camelCase', link: '/reference/string/camelCase' },
            { text: 'snakeCase', link: '/reference/string/snakeCase' },
            { text: 'kebabCase', link: '/reference/string/kebabCase' },
            { text: 'lowerCase', link: '/reference/string/lowerCase' },
            { text: 'startCase', link: '/reference/string/startCase' },
            { text: 'capitalize', link: '/reference/string/capitalize' },
            { text: 'startsWith (compat)', link: '/reference/compat/string/startsWith' },
            { text: 'endsWith (compat)', link: '/reference/compat/string/endsWith' },
            { text: 'padStart', link: '/reference/string/padStart' },
          ],
        },
      ],
    },
  ];
}
