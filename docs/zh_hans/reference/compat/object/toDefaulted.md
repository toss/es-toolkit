# toDefaulted

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

根据提供的`object`创建一个新对象，从`sources`中应用默认值以确保没有属性被留作`undefined`。
它为`undefined`或者来自`Object.prototype`的属性分配默认值。

您可以提供多个源对象来设置这些默认值，
它们将按照给定的顺序从左到右应用。
一旦属性被设置，任何后来的属性值将被忽略。

## 签名

```typescript
function toDefaulted<T extends object>(object: T): NonNullable<T>;
function toDefaulted<T extends object, S extends object>(object: T, source: S): NonNullable<T & S>;
function toDefaulted<T extends object, S1 extends object, S2 extends object>(
  object: T,
  source1: S1,
  source2: S2
): NonNullable<T & S1 & S2>;
function toDefaulted<T extends object, S1 extends object, S2 extends object, S3 extends object>(
  object: T,
  source1: S1,
  source2: S2,
  source3: S3
): NonNullable<T & S1 & S2 & S3>;
function toDefaulted<T extends object, S1 extends object, S2 extends object, S3 extends object, S4 extends object>(
  object: T,
  source1: S1,
  source2: S2,
  source3: S3,
  source4: S4
): NonNullable<T & S1 & S2 & S3 & S4>;
function toDefaulted<T extends object, S extends object>(object: T, ...sources: S[]): object;
function toDefaulted<T extends object, S extends object>(object: T, ...sources: S[]): object;
```

### 参数

- `object` (`T`): 目标对象，将接收默认值。
- `sources` (`S[]`): 指定要应用的默认值的对象。

### 返回值

(`object`): 一个新对象，结合了目标值和默认值，确保没有属性留作未定义。

## 示例

```typescript
toDefaulted({ a: 1 }, { a: 2, b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
toDefaulted({ a: 1, b: 2 }, { b: 3 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
toDefaulted({ a: null }, { a: 1 }); // { a: null }
toDefaulted({ a: undefined }, { a: 1 }); // { a: 1 }
```
