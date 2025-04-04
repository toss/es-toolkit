# at

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

返回对象 `paths` 路径对应的值的数组。

## 签名

```typescript
function at<T>(object: T, ...paths: Array<PropertyKey | PropertyKey[] | ArrayLike<PropertyKey>>): unknown[];
```

### 参数

- `object` (`T`): 要迭代的对象。
- `...paths` (`Array<PropertyKey | PropertyKey[] | ArrayLike<PropertyKey>>`): 要获取的属性路径。每个路径可以是字符串、数字、符号，或者这些类型的数组或类数组对象。

### 返回值

(`unknown[]`): 返回与指定路径对应的值的数组。

## 示例

```js
const object = { a: [{ b: { c: 3 } }, 4] };

at(object, ['a[0].b.c', 'a[1]']);
// => [3, 4]

// 也可以直接提供路径作为参数
at(object, 'a[0].b.c', 'a[1]');
// => [3, 4]

// 也适用于数组
const array = [1, 2, 3];
at(array, 0, 2);
// => [1, 3]

// 对于不存在的路径返回 undefined
at(object, 'a.b.c');
// => [undefined]

// 如果提供了数组形式的多个路径，它们会被扁平化
at(object, ['a[0].b.c', 'a[1]']);
// => [3, 4]
```
