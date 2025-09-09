# overSome

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

创建一个函数，用于检查给定的谓词是否有任何一个为所提供的值返回 truthy。

此函数接受多个谓词，可以是单个谓词函数或谓词数组，并返回一个新函数，该新函数检查谓词在调用提供的值时是否有任何为 truthy 返回。

## 签名

```typescript
function overSome<T, U extends T, V extends T>(
  predicate1: (value: T) => value is U,
  predicate2: (value: T) => value is V
): (value: T) => value is U | V;
function overSome<T>(
  ...predicates: Array<((...values: T[]) => boolean) | ReadonlyArray<(...values: T[]) => boolean>>
): (...values: T[]) => boolean;
```

### 参数

- `predicates` (`...Array<((...values: T[]) => boolean) | ReadonlyArray<(...values: T[]) => boolean>>`): -
  谓词或谓词数组的列表。每个谓词都是一个函数，它接受一个或多个 `T` 类型的值，并返回一个布尔值指示这些值是否满足条件。

### 返回值

(`(...values: T[]) => boolean`): 一个函数，该函数接受一个值列表，如果谓词对提供的值返回 truthy，则返回 `true`，否则返回 `false`。

## 示例

```typescript
const func = overSome(
  (value) => typeof value === 'string',
  (value) => typeof value === 'number',
  (value) => typeof value === 'symbol'
);

func("hello"); // true
func(42); // true
func(Symbol()); // true
func([]); // false

const func = overSome([
  (value) => value.a > 0,
  (value) => value.b > 0
]);

func({ a: 0, b: 2 }); // true
func({ a: 0, b: 0 }); // false

const func = overSome(
  (a, b) => typeof a === 'string' && typeof b === 'string',
  (a, b) => a > 0 && b > 0
);

func("hello", "world"); // true
func(1, 10); // true
func(0, 2); // false
```
