---
description: es-toolkit 开箱即用支持的浏览器范围，以及如何支持更旧的浏览器
---

# 浏览器支持

es-toolkit 在 2022 年初以后发布的所有浏览器中无需任何配置即可运行。

| 环境       | 最低版本 |
| ---------- | -------- |
| Chrome     | 98+      |
| Edge       | 98+      |
| Firefox    | 94+      |
| Safari     | 15.4+    |
| iOS Safari | 15.4+    |
| Node.js    | 18+      |

es-toolkit 积极使用现代 JavaScript,以保持代码库小巧高效。
如果要支持比上述版本更旧的浏览器,可以添加构建配置。这样即使在只支持 ES2015 的更旧浏览器(如 Chrome 51 或 Safari 10)中,es-toolkit 也能正常工作。参见下面的[支持更旧的浏览器](#支持更旧的浏览器)。

es-toolkit 每次发布新版本时,都会验证其在支持的浏览器中是否正常工作:先通过 [`eslint-plugin-es-x`](https://github.com/eslint-community/eslint-plugin-es-x) 等 ESLint 插件进行静态验证,再通过真实的基于 Playwright 的 E2E 测试进行二次验证。

## 支持更旧的浏览器

只要正确配置打包工具,es-toolkit 就能在 Chrome 51 或 Safari 10 这样旧的浏览器中正常工作。
这需要两项配置。

### 1. 将现代语法转换为旧语法(转译)

es-toolkit 以积极使用可选链(`foo?.bar`)、类字段等现代语法的状态发布。

打包工具通常不会转译依赖(`node_modules`)。
因此,请添加以下配置,将 es-toolkit 使用的现代语法转换为旧浏览器也支持的语法。

#### Vite

将 [`build.target`](https://vite.dev/config/build-options.html#build-target) 设置为你要支持的最旧浏览器:

```js
import { defineConfig } from 'vite';

export default defineConfig({
  // ... 其他配置 ...
  build: {
    target: ['chrome80', 'safari14.1'], // [!code highlight]
  },
});
```

Vite 会将 `build.target` 应用到包中的每个模块(包括 es-toolkit),因此无需其他配置。

#### Webpack + Babel

为 `babel-loader` 配置 `@babel/preset-env`,并确保 `exclude` 模式不会排除 es-toolkit:

```js
export default {
  // ... 其他配置 ...
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules[\\/](?!es-toolkit)/, // [!code highlight]
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { chrome: '80', safari: '14.1' } }], // [!code highlight]
            ],
          },
        },
      },
    ],
  },
};
```

### 2. 补充现代运行时 JavaScript API(polyfill)

es-toolkit 使用了 `Array#at`、`structuredClone` 等现代浏览器和运行时支持的现代 JavaScript API。旧浏览器没有这些函数的实现,因此要使用 es-toolkit,需要补充这些函数的实现。

请按如下方式添加 `core-js` 提供的 polyfill:

```js
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
import 'core-js/actual/aggregate-error';
import 'core-js/actual/array/at';
import 'core-js/actual/array/find-last';
import 'core-js/actual/array/find-last-index';
import 'core-js/actual/object/has-own';
import structuredCloneShim from '@ungap/structured-clone';

if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = structuredCloneShim;
}
```

这段代码必须在应用入口处、导入 es-toolkit 之前加载。

### 注意事项

#### 1. 在 Vite 中支持 Chrome 51、Safari 10 等非常旧的浏览器需要额外插件

Vite 默认使用 esbuild,但 esbuild 不支持非常旧的浏览器。
要支持它们,需要使用 [`@vitejs/plugin-legacy`](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) 插件,用 Babel 转译源代码:

```js{2,7-9}
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  // ... 其他配置 ...
  plugins: [
    legacy({
      targets: ['chrome >= 51', 'safari >= 10', 'ios_saf >= 10', 'firefox >= 54', 'edge >= 15'],
    }),
  ],
});
```

#### 2. `es-toolkit/bigint` 只能在支持 BigInt 的浏览器中使用

JavaScript 的 BigInt 是新增的值类型,既无法转译也无法 polyfill。如果使用 `es-toolkit/bigint`,则只能支持 Chrome 67 及以上、Safari 14 及以上的浏览器。
