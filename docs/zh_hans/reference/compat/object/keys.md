# keys

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

创建一个包含`object`自身可枚举属性名的数组。

非对象值将被强制转换为对象。

## 签名

```typescript
function keys(object?: any): string[];
```

### 参数

- `object` (`object`): 要查询的对象。

### 返回值

(`string[]`): 返回属性名数组。

## 示例

```typescript
function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;
keys(new Foo()); // ['a', 'b'] (iteration order is not guaranteed)

keys('hi'); // ['0', '1']
keys([1, 2, 3]); // ['0', '1', '2']
keys({ a: 1, b: 2 }); // ['a', 'b']
```
