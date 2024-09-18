# matchesProperty

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

创建一个函数，用于检查给定的源对象是否匹配特定的属性值。

返回的函数接受一个源对象，并确定源对象中指定路径的属性是否等于给定的值。

## 签名

```typescript
function matchesProperty(property: PropertyKey | PropertyKey[], source: unknown): (target?: unknown) => boolean;
```

### 参数

- `property` (`number | string | symbol | Array<number | string | symbol>`): 需要检查的目标对象中的属性路径。可以是单个属性键、属性键数组，或表示深层路径的字符串。
- `source` (`unknown`): 要与目标对象中属性值进行比较的值。

### 返回值

(`(target: unknown) => boolean`): 一个函数，接受一个目标对象，如果目标对象中指定路径的属性值与提供的值匹配，则返回 `true`，否则返回 `false`。

## 示例

```typescript
// 使用单个属性键
const checkName = matchesProperty('name', 'Alice');
console.log(checkName({ name: 'Alice' })); // true
console.log(checkName({ name: 'Bob' })); // false

// 使用属性键数组
const checkNested = matchesProperty(['address', 'city'], 'New York');
console.log(checkNested({ address: { city: 'New York' } })); // true
console.log(checkNested({ address: { city: 'Los Angeles' } })); // false

// 使用深层路径
const checkNested = matchesProperty('address.city', 'New York');
console.log(checkNested({ address: { city: 'New York' } })); // true
console.log(checkNested({ address: { city: 'Los Angeles' } })); // false
```
