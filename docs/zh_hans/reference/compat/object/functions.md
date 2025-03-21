# functions

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

从“对象”的自身可枚举属性中创建函数属性名称数组。

## 签名

```typescript
function functions(object: any): string[];
```

### 参数

- `object` (`Object`): 要检查的对象。

### 返回值

(`Array`): 返回函数名称。

## 示例

```typescript
function Foo() {
  this.a = () => 'a'
  this.b = () => 'b'
}

Foo.prototype.c = () => 'c'

functions(new Foo)
// => ['a', 'b']
```