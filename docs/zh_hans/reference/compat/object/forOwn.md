# forOwn

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

遍历对象的属性并为每个属性调用 `iteratee` 函数。

它只遍历对象自身的属性，不包括继承的属性或带有 `Symbol` 键的属性。

`iteratee` 函数可以通过返回 `false` 提前结束遍历。

## 签名

```typescript
function forOwn<T>(
  object: T | null | undefined,
  iteratee?: (value: T[keyof T], key: string, collection: T) => any
): T | null | undefined;
```

### 参数

- `object` (`T | null | undefined`): 要遍历的对象。
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`): 每次迭代调用的函数。如果未提供，将使用身份函数。

### 返回值

(`T | null | undefined`): 返回对象。

## 示例

```typescript
function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

forOwn(new Foo(), function (value, key) {
  console.log(key);
});
// => Logs 'a' then 'b' (iteration order is not guaranteed).
```
