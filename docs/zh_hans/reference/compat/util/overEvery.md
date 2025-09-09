# overEvery

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

创建一个函数来检查所有给定的谓词是否对提供的值返回真值。

此函数接收多个谓词，可以是单个谓词函数或谓词数组，并返回一个新函数，该函数检查当调用提供的值时，所有谓词是否返回真值。

## 签名

```typescript
function overEvery<T, U extends T, V extends T>(
  predicate1: (value: T) => value is U,
  predicate2: (value: T) => value is V
): (value: T) => value is U & V;
function overEvery<T>(
  ...predicates: Array<((...args: T[]) => boolean) | ReadonlyArray<(...args: T[]) => boolean>>
): (...args: T[]) => boolean;
```

### 参数

- `predicates` (`...Array<((...values: T[]) => boolean) | ReadonlyArray<(...values: T[]) => boolean>>`): -
  一个谓词或谓词数组的列表。每个谓词是一个函数，它接受一个或多个类型为`T`的值，并返回一个布尔值，指示这些值是否满足条件。

### 返回值

(`(...values: T[]) => boolean`): 一个函数，该函数接收一个值列表，如果所有谓词对提供的值返回真值，则返回`true`，否则返回`false`。

## 示例

```typescript
const func = overEvery(
  (value) => typeof value === 'string',
  (value) => value.length > 3
);

func("hello"); // true
func("hi"); // false
func(42); // false

const func = overEvery([
  (value) => value.a > 0,
  (value) => value.b > 0
]);

func({ a: 1, b: 2 }); // true
func({ a: 0, b: 2 }); // false

const func = overEvery(
  (a, b) => typeof a === 'string' && typeof b === 'string',
  (a, b) => a.length > 3 && b.length > 3
);

func("hello", "world"); // true
func("hi", "world"); // false
func(1, 10); // false
```
