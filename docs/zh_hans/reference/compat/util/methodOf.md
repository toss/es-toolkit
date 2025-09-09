# methodOf

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

创建一个函数，该函数使用提供的参数调用指定`object`路径上的方法。

## 签名

```typescript
function methodOf(object: object, ...args: any[]): (path: PropertyKey | PropertyKey[]) => any;
```

### 参数

- `object` (`object`): 要查询的对象。
- `args` (`...any`): 用来调用方法的参数。

### 返回值

(`(path: PropertyKey | PropertyKey[]) => any`): 返回一个新函数，该函数接受一个路径，并用`args`在`object`的`path`调用方法。

## 示例

```typescript
const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

const add = methodOf(object, 1, 2);
console.log(add('a.b')); // => 3
```
