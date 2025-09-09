# method

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

创建一个函数，该函数使用提供的参数调用给定对象的路径`path`方法。

## 签名

```typescript
function method(path: PropertyKey | PropertyKey[], ...args: any[]): (object?: unknown) => any;
```

### 参数

- `path` (`PropertyKey | PropertyKey[]`): 要调用的方法的路径。
- `args` (`...any`): 用来调用方法的参数。

### 返回值

(`(object?: unknown) => any`): 返回一个新函数，该函数接受一个对象，并用`args`在`path`调用方法。

## 示例

```typescript
const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

const add = method('a.b', 1, 2);
console.log(add(object)); // => 3
```
