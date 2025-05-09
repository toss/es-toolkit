# setWith

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

使用 `customizer` 函数在指定对象的特定路径上设置值。
如果路径的某部分不存在，将根据 `customizer` 的结果创建它。

这个方法与 [set](./set.md) 类似，但不同之处在于它接受一个 `customizer` 来创建嵌套对象。

`customizer` 被调用来生成路径的对象。
如果 `customizer` 返回一个值，该值将用于当前路径段。
如果 `customizer` 返回 `undefined`，该方法将根据路径创建适当的对象。
如果下一个路径段是有效的数组索引，则创建数组，否则创建对象。

## 签名

```typescript
function setWith<T extends object | null | undefined>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  value: unknown,
  customizer?: (value: unknown) => unknown
): T;
```

### 参数

- `obj` (`T`): 要修改的对象。
- `path` (`PropertyKey | readonly PropertyKey[]`): 要设置的属性路径。
- `value` (`unknown`): 要设置的值。
- `customizer` (`(value: unknown) => unknown`): 用于自定义路径创建的函数。

### 返回值

(`T`): 返回修改后的对象。

## 示例

```typescript
import { setWith } from 'es-toolkit/compat';
import { isObject } from 'es-toolkit/compat';

// 使用定制器在嵌套数组中设置值
const object = {};
setWith(object, '[0][1][2]', 3, value => (isObject(value) ? undefined : {}));
console.log(object); // => { '0': { '1': { '2': 3 } } }

// 使用 Object 作为定制器为数组创建对象
const obj2 = {};
setWith(obj2, 'a[0].b.c', 4, Object);
console.log(obj2); // => { a: [{ b: { c: 4 } }] }

// 不使用定制器创建路径（与使用 set 相同）
const obj3 = {};
setWith(obj3, 'a.b.c', 4);
console.log(obj3); // => { a: { b: { c: 4 } } }
```
