# forOwnRight

::: info
此函数仅可从 `es-toolkit/compat` 导入，用于兼容性目的。这是因为存在可替代的原生 JavaScript API，或者尚未充分优化。

从 `es-toolkit/compat` 导入此函数时，它将[与 lodash 完全一致地工作](../../../compatibility.md)。
:::

以相反的顺序遍历对象的属性，并为每个属性调用 `iteratee` 函数。

仅遍历对象自身的属性，不包括继承的属性或带有 `Symbol` 键的属性。

如果 `iteratee` 函数返回 `false`，则可以提前终止迭代。

## 接口

```typescript
function forOwnRight<T>(
  object: T | null | undefined,
  iteratee?: (value: T[keyof T], key: string, collection: T) => any
): T | null | undefined;
```

### 参数

- `object` (`T | null | undefined`): 要迭代的对象。
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`): 每次迭代时调用的函数。如果未提供，则使用恒等函数。

### 返回值

(`T | null | undefined`): 返回对象。

## 示例

```typescript
function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

forOwnRight(new Foo(), function (value, key) {
  console.log(key);
});
// => 输出 'b' 和 'a' (顺序不保证)。
```
