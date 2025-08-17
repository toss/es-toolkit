# cond

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

创建一个函数，该函数按顺序检查条件并运行匹配的函数。

每个对由一个条件（谓词）和一个要运行的函数组成。
该函数按顺序检查每个条件，直到找到一个返回 `true` 的条件。
当找到一个返回 `true` 的条件时，它会运行相应的函数并返回其结果。
如果所有条件都不为真，则返回 `undefined`。

## 签名

```typescript
function cond(pairs: any[][]): (...args: any[]) => unknown;
```

### 参数

- `pairs` (`any[][]`): 成对数组。每对包含一个断言函数和一个要运行的函数。

### 返回值

(`(...args: any[]) => unknown`): 一个新的复合函数，用于检查条件并运行匹配的函数。

## 示例

```typescript
const func = cond([
  [matches({ a: 1 }), constant('matches A')],
  [conforms({ b: isNumber }), constant('matches B')],
  [stubTrue, constant('no match')],
]);

func({ a: 1, b: 2 });
// => 'matches A'

func({ a: 0, b: 1 });
// => 'matches B'

func({ a: '1', b: '2' });
// => 'no match'
```
