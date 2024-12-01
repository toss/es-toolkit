# keysIn

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

此函数检索对象中字符串键属性的名称，包括从其原型继承的属性。

- 如果值不是对象，则会将其转换为对象。
- 类数组对象被视为数组。
- 稀疏数组中缺少某些索引的情况被视为密集数组。
- 如果值为 `null` 或 `undefined`，则返回一个空数组。
- 在处理原型对象时，`constructor` 属性会从结果中排除。

## 签名

```typescript
function keysIn(object?: unknown): string[];
```

### 参数

- `object` (`unknown`): 要检查其键的对象。

### 返回值

(`string[]`): 对象中的字符串键数组。

## 示例

```typescript
const obj = { a: 1, b: 2 };
console.log(keysIn(obj)); // ['a', 'b']

const arr = [1, 2, 3];
console.log(keysIn(arr)); // ['0', '1', '2']

function Foo() {}
Foo.prototype.a = 1;
console.log(keysIn(new Foo())); // ['a']
```
