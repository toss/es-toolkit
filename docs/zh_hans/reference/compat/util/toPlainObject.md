# toPlainObject

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

将 `value` 转换为一个普通对象，将 `value` 的继承的可枚举字符串键属性展平到普通对象的自有属性中。

## 签名

```typescript
function toPlainObject(value: any): Record<string, any>;
```

### 参数

- `value` (`any`): 要转换的值。

### 返回值

(`Record<string, any>`): 返回转换后的普通对象。

## 示例

```typescript
function Foo() {
  this.b = 2;
}
Foo.prototype.c = 3;

toPlainObject(new Foo()); // => { 'b': 2, 'c': 3 }
```
