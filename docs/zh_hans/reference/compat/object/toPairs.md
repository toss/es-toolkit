# toPairs

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

从对象、集合或映射创建键值对数组。

- 当提供对象时，它返回一个与对象的属性和值配对的元素数组（`[key, value]`）。
- 当提供 `Set` 时，它返回一个以 `[value, value]` 格式配对的元素数组。
- 当提供 `Map` 时，它返回一个与键和值配对的元素数组（`[key, value]`）。

## 签名

```typescript
function toPairs<T>(object: Record<string | number, T>): Array<[string, T]>;
function toPairs<T>(set: Set<T>): Array<[T, T]>;
function toPairs<K, V>(map: Map<K, V>): Array<[K, V]>;
```

### 参数

- `object` (`Record<string | number, T> | Set<T> | Map<K, V>`): 要查询的对象、集合或映射。

### 返回值

(`Array<[key: PropertyKey, value: T]>`): 返回键值对数组。

## 示例

```typescript
const object = { a: 1, b: 2 };
toPairs(object); // [['a', 1], ['b', 2]]

const set = new Set([1, 2]);
toPairs(set); // [[1, 1], [2, 2]]

const map = new Map();
map.set('a', 1);
map.set('b', 2);
toPairs(map); // [['a', 1], ['b', 2]]
```