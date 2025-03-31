# functions

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

创建一个数组，由对象中那些值为函数的属性名称组成。

只检查对象自身拥有的、具有字符串键的属性。继承的属性或带有`Symbol`键的属性不包括在内。

## 签名

```typescript
function functions(object: unknown): string[];
```

### 参数

- `object` (`unknown`): 要检查的对象。

### 返回值

(`string[]`): 返回函数名称。

## 示例

```typescript
function Foo() {
  this.a = () => 'a';
  this.b = () => 'b';
}

Foo.prototype.c = () => 'c';

functions(new Foo());
// => ['a', 'b']
```
