# cond

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

返回一个函数，该函数迭代“pairs”并调用第一个谓词返回真值的对应函数。谓词函数对是用创建函数的“this”绑定和参数调用的。

## 签名

```typescript
function cond(pairs: any[][]): (...args: any[]) => unknown;
```

### 参数

- `pairs` (`Array`): 谓词函数对。

### 返回值

(`(...args: any[]) => unknown`): 返回新的复合函数。

## 示例

```typescript
var func = cond([
  [matches({ 'a': 1 }),           constant('matches A')],
  [conforms({ 'b': isNumber }), constant('matches B')],
  [stubTrue,                      constant('no match')]
]);

func({ 'a': 1, 'b': 2 });
// => 'matches A'

func({ 'a': 0, 'b': 1 });
// => 'matches B'

func({ 'a': '1', 'b': '2' });
// => 'no match'
```