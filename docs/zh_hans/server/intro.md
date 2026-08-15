# es-toolkit/server

`es-toolkit/server` 是面向 Node.js、Deno、Bun 等提供 Node.js 兼容 API 的服务端运行时的工具模块。它用小型 API 提供一些看起来简单、但每次手写都很繁琐的能力，例如运行进程，或为终端输出添加颜色和样式。

和其他 `es-toolkit` 模块一样，它内置 TypeScript 类型，并只保留必要能力，让接口保持小巧且可预测。

```typescript
import { colors, exec } from 'es-toolkit/server';

const result = await exec('git', ['status', '--short'], {
  throwOnNonZeroExitCode: false,
});

if (result.stdout.trim().length === 0) {
  console.log(colors.green('工作区是干净的。'));
} else {
  console.log(colors.yellow(result.stdout.trim()));
}
```

## 运行环境

与 `es-toolkit` 和 `es-toolkit/compat` 不同，`es-toolkit/server` 只能在 Node.js 兼容的服务端运行时中使用。浏览器、React Native 等无法使用 `node:child_process` 这类 Node.js API 的环境不支持它。

如果你需要能在浏览器中运行的数组、对象、字符串或 Promise 工具，请使用 [`es-toolkit`](/zh_hans/intro)。如果你正在迁移现有 Lodash 代码，并希望先保持调用代码不变，可以使用 [`es-toolkit/compat`](/zh_hans/compat/intro)。
