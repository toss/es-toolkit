# matches

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

创建一个函数来对给定的目标对象和源对象进行深度比较。

这个函数产生与[isMatch](./isMatch.md)函数相同的结果，但提供了不同的调用方式。

## 签名

```typescript
function matches(source: unknown): (target: unknown) => boolean;
```

## 参数

- `source` (`unknown`): 用于创建匹配器的源对象。

## 返回值

- (`(target: unknown) => boolean`): 返回一个函数，该函数接收一个目标对象，如果目标对象与源对象匹配则返回`true`，否则返回`false`。

## 示例

### 基本用法

```typescript
const matcher = matches({ a: 1, b: 2 });
matcher({ a: 1, b: 2, c: 3 }); // true
matcher({ a: 1, c: 3 }); // false
```

### 匹配数组

```typescript
const arrayMatcher = matches([1, 2, 3]);
arrayMatcher([1, 2, 3, 4]); // true
arrayMatcher([4, 5, 6]); // false
```

### 匹配嵌套结构

```typescript
// Matching objects with nested structures
const nestedMatcher = matches({ a: { b: 2 } });
nestedMatcher({ a: { b: 2, c: 3 } }); // true
nestedMatcher({ a: { c: 3 } }); // false
```
