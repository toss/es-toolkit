# noop (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 `noop`

`es-toolkit` 也有相同行为的 [noop](../../function/noop.md) 函数。

:::

什么都不做的空函数。

```typescript
noop();
```

## 参考

### `noop(...args)`

当您需要一个什么都不做的占位符函数时,使用 `noop`。它通常用作默认值或回调函数。

```typescript
import { noop } from 'es-toolkit/compat';

// 基本用法
noop(); // 什么都不做
noop(1, 2, 3); // 接受参数但什么都不做

// 用作默认回调
function processData(data, callback = noop) {
  // 处理数据
  console.log('处理数据中...', data);

  // 调用回调(如果未提供则为 noop)
  callback(data);
}

processData('测试'); // 即使未提供回调也能正常工作

// 现代替代方案(推荐)
function modernProcessData(data, callback = () => {}) {
  console.log('处理数据中...', data);
  callback(data);
}

// 或使用可选回调
function processDataOptional(data, callback) {
  console.log('处理数据中...', data);
  callback?.(data); // 仅在提供回调时调用
}
```

在需要默认值或占位符的情况下很有用,但在现代 JavaScript 中,使用可选链(`?.`)或默认参数更常见。

#### 参数

- `...args` (`any[]`): 可以接受任何参数,但都会被忽略。

#### 返回值

(`void`): 不返回任何内容。
