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

这一范围覆盖了全球约 98.7% 的浏览器流量。通过构建配置还可以进一步下探:

- **Chrome 80 / Safari 14.1**(2020 年前后,约 98.8% 覆盖): 转译 + 6 个 polyfill。参见[支持更旧的浏览器](#支持更旧的浏览器)。
- **Chrome 51 / Safari 10**(ES2015 时代,约 99.4% 覆盖): 使用 [`@vitejs/plugin-legacy`](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy),但不包含 `es-toolkit/bigint`。参见 [ES2015 时代的浏览器](#es2015-时代的浏览器-chrome-51-safari-10)。

这些支持范围都在持续验证中:每次更改都会通过静态分析([`eslint-plugin-es-x`](https://github.com/eslint-community/eslint-plugin-es-x) 和 [`eslint-plugin-compat`](https://github.com/amilajack/eslint-plugin-compat))进行检查,并且由文档中所有代码示例组成的完整测试套件会在 CI 中于真实的 Chrome 98、Chrome 80、Chrome 51、WebKit 15.4 和 WebKit 14.1 上运行。

## 为什么是这些版本?

es-toolkit 发布未经转译的现代 JavaScript,以保持包体积小、运行速度快。最低支持版本由其内部使用的最新运行时 API 决定:

| 特性                                         | 使用它的函数                                | Chrome | Safari |
| -------------------------------------------- | ------------------------------------------- | ------ | ------ |
| `??`、`?.`、`BigInt`                         | 全部                                        | 80     | 14     |
| 类字段                                       | `Semaphore`、`Mutex`                        | 72     | 14.1   |
| `AggregateError`                             | `clone`                                     | 85     | 14     |
| `Object.hasOwn`                              | `pick`、`groupBy`、`get` 等对象/数组工具    | 93     | 15.4   |
| `Error` 的 `cause` 选项                      | `clone`                                     | 93     | 15     |
| `Array.prototype.at`                         | `nthArg`                                    | 92     | 15.4   |
| `Array.prototype.findLast` / `findLastIndex` | `findLast`、`findLastKey`、`takeRightWhile` | 97     | 15.4   |
| `structuredClone`                            | `cloneDeepWith`                             | 98     | 15.4   |

仓库中的 ESLint 规则会在引入比 Chrome 98 / Safari 15.4 更新的语法或 API 时使构建失败,因此这张表不会悄悄失准。

## 支持更旧的浏览器

要在 Chrome 80 / Safari 14.1 上运行 es-toolkit,需要两件事:

1. 对包括 es-toolkit 在内的整个包进行**转译**
2. 为上表中的运行时 API 提供 **6 个 polyfill**

所需的 polyfill 非常少——不需要引入完整的 `core-js/stable`:

<<< @/../tests/browser-compat/polyfills/minimal.mjs{js}

在应用入口处、**在导入任何 es-toolkit 代码之前**导入一次这个文件。

::: warning 不要将 es-toolkit 排除在转译之外
构建工具通常会跳过对 `node_modules` 的转译。es-toolkit 以现代语法发布,因此必须**包含**在转译范围内。下面的 Vite 配置会自动处理(Vite 会转换所有打包的代码);对于 webpack + Babel,请调整 `exclude` 的范围,确保 es-toolkit 被包含在内。
:::

### Vite

将 [`build.target`](https://vite.dev/config/build-options.html#build-target) 设置为你要支持的最旧浏览器:

<<< @/../tests/browser-compat/fixtures/vite-polyfill/vite.config.mjs{js}

Vite 会将 `build.target` 应用到包中的每个模块(包括 es-toolkit),因此无需其他配置。

### webpack + Babel

为 `babel-loader` 配置 `@babel/preset-env`,并确保 `exclude` 模式不会排除 es-toolkit:

<<< @/../tests/browser-compat/fixtures/webpack/webpack.config.mjs{js}

::: danger `useBuiltIns: 'usage'` 默认不会为 es-toolkit 注入 polyfill
`@babel/preset-env` 的 `useBuiltIns: 'usage'` 只会向 Babel 自己处理过的文件注入 polyfill。在常见的 `exclude: /node_modules/` 配置下,Babel 根本看不到 es-toolkit 中的 `Object.hasOwn` 调用,因此不会注入 polyfill。请在入口处导入上面的 polyfill 文件(推荐),或将 es-toolkit 纳入 `babel-loader` 的处理范围。
:::

### 旧浏览器中已知的行为差异

- **在 Chrome 80–92 / Safari 14.1 中,`clone` 无法保留 `Error` 的 `cause`**:这些引擎会静默忽略 `Error` 构造函数的 `cause` 选项,而对其进行 polyfill 需要替换全局的 `Error` 构造函数。在这些浏览器中,克隆出的错误对象没有 `cause`。

## ES2015 时代的浏览器 (Chrome 51+ / Safari 10+)

要覆盖全球约 99.4% 的流量,请使用 [`@vitejs/plugin-legacy`](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)。它使用 Babel 转译 —— 与 esbuild 不同,它还能改写 `words`、`camelCase` 等字符串工具使用的 Unicode 属性正则表达式 —— 并自动注入所需的 core-js polyfill:

<<< @/../tests/browser-compat/fixtures/vite-legacy/vite.config.mjs{js}

请继续在入口处导入[最小 polyfill 文件](#支持更旧的浏览器):`structuredClone` 不属于 core-js,`plugin-legacy` 不会提供它。

::: warning 此层级不包含 `es-toolkit/bigint`
`BigInt` 无法用 ES2015 表达 —— 其字面量无法转译,其运行时无法 polyfill。只要你的应用不导入 `es-toolkit/bigint`(也不向 `sum` 等函数传入 `BigInt` 值),bigint 代码就不会进入你的包,legacy 构建可以正常工作。其余全部 —— 包括 `es-toolkit`、`es-toolkit/compat` 和 `es-toolkit/fp` —— 均受支持。
:::

::: info 此层级的验证范围
CI 会在真实的 Chrome 51 中运行这套配置。Safari 10–13 无法在 Linux CI 上自动化,因此此层级的 Safari 部分基于 Babel/core-js 的转译保证,而非直接的测试运行。WebKit 14.1 通道验证双包中的现代部分。
:::

## 如何验证

[`tests/browser-compat`](https://github.com/toss/es-toolkit/tree/main/tests/browser-compat) 测试套件从每个函数的 JSDoc 中提取所有 `@example`(1,300 多个用例),用上述每种配置打包发布的 `dist` 文件,并在 CI 中于真实浏览器上运行:

| 配置                      | 浏览器                 |
| ------------------------- | ---------------------- |
| 不转译、无 polyfill       | Chrome 98、WebKit 15.4 |
| 上述 Vite 配置            | Chrome 80、WebKit 14.1 |
| 上述 webpack 配置         | Chrome 80、WebKit 14.1 |
| 上述 `plugin-legacy` 配置 | Chrome 51、WebKit 14.1 |

本页展示的配置文件正是 CI 套件实际使用的文件,因此文档不会与实际测试脱节。
