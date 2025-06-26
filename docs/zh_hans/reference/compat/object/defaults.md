# defaults

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

为一个 `object` 分配默认值，确保某些属性不会保持 `undefined`。它为那些 `undefined` 或从 `Object.prototype` 继承的属性设置默认值。

您可以传入多个对象来定义这些默认值，它们将按从左到右的顺序应用。一旦某个属性被赋值，任何后续的该属性的值将被忽略。

注意：此函数会修改第一个参数 `object`。如果您希望保持 `object` 不变，请考虑使用 [toDefaulted](./toDefaulted.md)。

## 签名

```typescript
function defaults<T extends object>(object: T): NonNullable<T>;
function defaults<T extends object, S extends object>(object: T, source: S): NonNullable<T & S>;
function defaults<T extends object, S1 extends object, S2 extends object>(
  object: T,
  source1: S1,
  source2: S2
): NonNullable<T & S1 & S2>;
function defaults<T extends object, S1 extends object, S2 extends object, S3 extends object>(
  object: T,
  source1: S1,
  source2: S2,
  source3: S3
): NonNullable<T & S1 & S2 & S3>;
function defaults<T extends object, S1 extends object, S2 extends object, S3 extends object, S4 extends object>(
  object: T,
  source1: S1,
  source2: S2,
  source3: S3,
  source4: S4
): NonNullable<T & S1 & S2 & S3 & S4>;
function defaults<T extends object, S extends object>(object: T, ...sources: S[]): object;
```

### 参数

- `object` (`T`): 目标对象。
- `sources` (`S[]`): 表示 `object` 默认值的源对象。

### 返回值

(`object`): 返回合并后的对象，确保目标对象不是 `null` 或 `undefined`。

## 示例

```typescript
defaults({ a: 1 }, { a: 2, b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
defaults({ a: 1, b: 2 }, { b: 3 }, { c: 3 }); // { a: 1, b: 2, c: 3 }
defaults({ a: null }, { a: 1 }); // { a: null }
defaults({ a: undefined }, { a: 1 }); // { a: 1 }
defaults({ a: 1 }, undefined); // { a: 1 }
defaults({ a: 1 }, null); // { a: 1 }
```
