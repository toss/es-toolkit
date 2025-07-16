![](./docs/public/og.png)

# es-toolkit &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/toss/slash/blob/main/LICENSE) [![codecov](https://codecov.io/gh/toss/es-toolkit/graph/badge.svg?token=8N5S3AR3C7)](https://codecov.io/gh/toss/es-toolkit) [![NPM badge](https://img.shields.io/npm/v/es-toolkit?logo=npm)](https://www.npmjs.com/package/es-toolkit) [![JSR badge](https://jsr.io/badges/@es-toolkit/es-toolkit)](https://jsr.io/@es-toolkit/es-toolkit) [![Discord Badge](https://discord.com/api/guilds/1281071127052943361/widget.png?style=shield)](https://discord.gg/vGXbVjP2nY)

[English](https://github.com/toss/es-toolkit/blob/main/README.md) | [한국어](https://github.com/toss/es-toolkit/blob/main/README-ko_kr.md) | [日本語](https://github.com/toss/es-toolkit/blob/main/README-ja_jp.md) | 简体中文

es-toolkit 是一个先进的、高性能的 JavaScript 实用工具库，具有小的捆绑包大小和强大的类型注解。

- es-toolkit 提供多种现代实现的日常实用函数，如 [debounce](https://es-toolkit.dev/reference/function/debounce.html)、[delay](https://es-toolkit.dev/reference/promise/delay.html)、[chunk](https://es-toolkit.dev/reference/array/chunk.html)、[sum](https://es-toolkit.dev/reference/math/sum.html) 和 [pick](https://es-toolkit.dev/reference/object/pick.html)。
- 设计时考虑了性能，es-toolkit 在现代 JavaScript 环境中实现了 [2-3 倍的性能提升](https://es-toolkit.dev/zh_hans/performance.html)。
- es-toolkit 支持开箱即用，并且与其他库相比，可以将 JavaScript 代码减少高达 [97%](https://es-toolkit.dev/zh_hans/bundle-size.html)。
- es-toolkit 提供了一个完整的兼容层 [es-toolkit/compat](https://es-toolkit.dev/compatibility.html)，可以轻松替代 lodash。
- es-toolkit 包含内置的 TypeScript 支持，提供直观且强大的类型。它还提供诸如 [isNotNil](https://es-toolkit.dev/zh_hans/reference/predicate/isNotNil.html) 等有用的类型保护。
- es-toolkit 被多个流行的开源库所使用，例如 [Storybook](https://github.com/storybookjs/storybook/blob/9d862798d666678cc4822e857c00bbd744169ced/code/core/package.json#L358) 和 [ink](https://github.com/vadimdemedes/ink/blob/2090ad9779be59dea71d173eb49785b7bd4495d0/package.json#L55)。
- es-toolkit 经过了百分之百的测试覆盖率的实战检验，确保其可靠性和稳健性。

## 示例

```tsx
// import from '@es-toolkit/es-toolkit' in jsr.
import { chunk, debounce } from 'es-toolkit';

const debouncedLog = debounce(message => {
  console.log(message);
}, 300);

// 这个调用将会被防抖处理
debouncedLog('Hello, world!');

const array = [1, 2, 3, 4, 5, 6];
const chunkedArray = chunk(array, 2);

console.log(chunkedArray);
// 输出: [[1, 2], [3, 4], [5, 6]]
```

## 贡献

我们欢迎社区中的每个人贡献。请阅读下面的详细贡献指南。

[CONTRIBUTING](https://github.com/toss/es-toolkit/blob/main/.github/CONTRIBUTING.md)

## 许可证

MIT © Viva Republica, Inc. 详细信息请参阅 [LICENSE](./LICENSE)。

<a title="Toss" href="https://toss.im">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://static.toss.im/logos/png/4x/logo-toss-reverse.png">
    <img alt="Toss" src="https://static.toss.im/logos/png/4x/logo-toss.png" width="100">
  </picture>
</a>
