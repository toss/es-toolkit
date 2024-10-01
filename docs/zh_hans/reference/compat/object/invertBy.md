# invertBy

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

给定对象的键和值会像 [invert](../../object/invert.md) 函数一样被反转，生成一个新的对象。

如何将值反转为键由 `iteratee` 函数指定。如果未提供 `iteratee` 函数，则值将直接用作键。

新对象的值是 `iteratee` 函数返回的值对应的键的数组。

## 签名

```typescript
function invertBy<K extends PropertyKey, V>(object: Record<K, V>, iteratee?: (value: V) => string): Record<string, K[]>;
```

### 参数

- `object` (`Record<K, V>`): 需要反转的对象。
- `iteratee` (`(value: V) => string`): 指定如何将对象的值转换为其他字符串的函数。如果未提供，则值将直接用作键。

### 返回值

(`Record<string, K[]>`): 反转后的对象。键是通过 `iteratee` 函数转换的值，值是与这些值相同的键的数组。

## 示例

```typescript
const obj = { a: 1, b: 2, c: 1 };
const result = invertBy(obj);
// result => { '1': ['a', 'c'], '2': ['b'] }

const obj = { a: 1, b: 2, c: 1 };
const result = invertBy(obj, value => `group${value}`);
// result => { 'group1': ['a', 'c'], 'group2': ['b'] }
```
