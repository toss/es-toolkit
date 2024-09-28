# includes

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

检查给定的值是否包含在数组、对象或字符串中。

比较运算使用 SameValueZero。

## 签名

```typescript
function includes<T>(arr: T[], item: T, fromIndex?: number): boolean;
function includes<T extends Record<string, any>>(obj: T, value: T[keyof T], fromIndex?: number): boolean;
function includes(str: string, substr: string, fromIndex?: number): boolean;
```

### 参数

- `source` (`T[] | Record<string, any> | string`): 要搜索的源。可以是数组、对象或字符串。
- `target` (`T`): 要在源中搜索的值。
- `fromIndex` (`number`): 开始搜索的索引。如果为负数，则视为从源末尾的偏移量。

### 返回值

(`boolean`): `true` 如果在源中找到该值，否则 `false`。

## 示例

```typescript
includes([1, 2, 3], 2); // true
includes({ a: 1, b: 'a', c: NaN }, 'a'); // true
includes('hello world', 'world'); // true
includes('hello world', 'test'); // false
```
