# cloneWith

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](mdc:../../../compatibility.md)。
:::

创建给定对象的浅拷贝，并允许通过自定义函数来定制克隆过程。这个方法类似于 `clone`，但它接受一个自定义函数来生成克隆值。如果自定义函数返回 undefined，则会使用默认的克隆方法。

如果没有提供自定义函数，它的行为与 `clone` 完全相同。

## 签名

```typescript
function cloneWith<T>(value: T, customizer?: (value: any) => any): T;
```

### 参数

- `value` (`T`): 要克隆的值。
- `customizer` (`Function`): 可选。用于自定义克隆过程的函数。

### 返回值

(`T`): 返回给定对象的浅拷贝。

## 示例

```typescript
const num = 29;
const clonedNum = cloneWith(num);
console.log(clonedNum); // 29
console.log(clonedNum === num); // true

const arr = [1, 2, 3];
const clonedArr = cloneWith(arr);
console.log(clonedArr); // [1, 2, 3]
console.log(clonedArr === arr); // false

const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
const clonedObj = cloneWith(obj);
console.log(clonedObj); // { a: 1, b: 'es-toolkit', c: [1, 2, 3] }
console.log(clonedObj === obj); // false

const obj2 = { a: 1, b: 2 };
const clonedObjWithCustomizer = cloneWith(obj2, value => {
  if (typeof value === 'number') {
    return value * 2; // 将数字值翻倍
  }
  // 返回 undefined 时使用默认克隆方法
});
console.log(clonedObj2); // { a: 2, b: 4 }
```
