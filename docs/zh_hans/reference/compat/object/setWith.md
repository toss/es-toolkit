# setWith

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

使用定制器函数在指定的路径上设置对象的值。此方法类似于 `set`，不同之处在于它接受一个用于创建嵌套对象的定制器。

如果定制器返回 `undefined`，路径创建将由该方法处理。定制器会被调用并传入三个参数：(nsValue, key, nsObject)。

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
