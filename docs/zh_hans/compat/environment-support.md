---
description: es-toolkit/compat 无需转译或 polyfill、按发布原样即可支持的浏览器和 Node.js 版本
---

# 浏览器和 Node.js 支持

`es-toolkit/compat` 在所有支持 ES2015 的环境中均可按发布原样运行。

| 环境       | 最低版本 |
| ---------- | -------- |
| Chrome     | 51+      |
| Edge       | 15+      |
| Firefox    | 54+      |
| Safari     | 10+      |
| iOS Safari | 10+      |
| Node.js    | 6+       |

无需转译,也无需 polyfill。无需添加任何打包工具配置,即可直接使用 `es-toolkit/compat`。

这一点与主库 `es-toolkit` 不同,主库在无需配置的情况下需要 Chrome 98、Safari 15.4 或 Node.js 20.12 及更高版本。详情请参见[浏览器支持](/zh_hans/browser-support)。

这仅适用于 `es-toolkit/compat` 及其按函数划分的入口(`es-toolkit/compat/*`)。其他入口(如 `es-toolkit`、`es-toolkit/array`)遵循主库的要求。

## 为什么 compat 支持旧环境

`es-toolkit/compat` 的存在是为了帮助你从 lodash 迁移。使用 lodash 的代码往往仍运行在旧环境中,例如旧版 Node.js 服务器或旧浏览器。
为了让你无需修改构建配置就能从 lodash 切换到 `es-toolkit/compat`,`es-toolkit/compat` 发布后即可直接在这些旧环境中运行。

## 验证方式

每次变更都会通过两种方式验证对这些环境的支持。

- **通过 ESLint 进行静态验证**:使用 [`eslint-plugin-es-x`](https://github.com/eslint-community/eslint-plugin-es-x) 将 `es-toolkit/compat` 的代码限制为 ES2015 语法和内置功能(可选链和 `??` 会在构建时转换为旧语法,因此允许使用),并使用 [`eslint-plugin-compat`](https://github.com/amilajack/eslint-plugin-compat) 以 Node.js 6 为目标进行检查。
- **在 CI 中使用真实的 Node.js 6 进行验证**:加载构建后包的每个 `es-toolkit/compat/*` 入口,并执行 compat 函数的每个 `@example`。

## 注意事项

### 1. 在不支持 Unicode 属性转义的引擎中,`words` 和大小写转换函数使用 lodash 的模式

一些旧引擎无法解析正则表达式中的 Unicode 属性转义(`\p{…}`),例如 Node.js 6–9、Chrome 64 以下以及 Safari 11.1 以下。
在这些引擎中,[`words`](/zh_hans/compat/reference/string/words) 和大小写转换函数(`camelCase`、`kebabCase`、`snakeCase`、`startCase`、`lowerCase`、`upperCase`)会回退到 lodash 自身的 ES5 单词模式,因此结果与 lodash 完全一致。
现代引擎则使用支持 Unicode 的模式。
