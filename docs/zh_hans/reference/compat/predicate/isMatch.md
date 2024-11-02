# isMatch

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

检查目标是否与源匹配，方法是比较它们的结构和值。
此函数支持对象、数组、映射和集合的深度比较。

## 签名

```typescript
function isMatch(target: unknown, source: unknown): boolean;
```

### 参数

- `target` (`unknown`): 要匹配的目标值。
- `source` (`unknown`): 用于匹配的源值。

### 返回值

(`boolean`): 如果目标与源匹配，则返回 `true`，否则返回 `false`。

## 示例

### 基本用法

```typescript
isMatch({ a: 1, b: 2 }, { a: 1 }); // true
```

### 匹配数组

```typescript
isMatch([1, 2, 3], [1, 2, 3]); // true
isMatch([1, 2, 2, 3], [2, 2]); // true
isMatch([1, 2, 3], [2, 2]); // false
```

### 匹配映射

```typescript
const targetMap = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);
const sourceMap = new Map([['key1', 'value1']]);
isMatch(targetMap, sourceMap); // true
```

### 匹配集合

```typescript
const targetSet = new Set([1, 2, 3]);
const sourceSet = new Set([1, 2]);
isMatch(targetSet, sourceSet); // true
```
