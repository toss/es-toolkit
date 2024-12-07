# invoke

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

使用给定的参数在`object`的`path`处调用方法。

## 签名

```typescript
function invoke(object: unknown, path: PropertyKey | PropertyKey[], args: any[]): any;
```

### 参数

- `object` (`unknown`): 要查询的对象。
- `path` (`PropertyKey | PropertyKey[]`): 要调用的方法的路径。
- `args` (`any[]`): 调用该方法的参数。

### 返回值

(`any`): 返回被调用方法的结果。

## 示例

```typescript
const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

invoke(object, 'a.b', [1, 2]); // => 3
invoke(object, ['a', 'b'], [1, 2]); // => 3
```
