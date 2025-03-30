# over

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

返回一个函数，该函数使用提供给已创建函数的参数调用迭代器，并返回它们的结果。

你可以使用多种类型的迭代器：

- **函数**：每个函数都使用相同的参数调用，并收集结果。
- **属性名**：每个属性名用于从提供的对象中提取值。
- **对象**：每个对象用于检查提供的对象是否匹配其属性。
- **属性-值对**：每个对用于检查提供的对象的指定属性是否匹配该值。

## 签名

```typescript
function over<T extends unknown[], R>(iteratees: Array<(...args: T) => R>): (...args: T) => R[];
function over<T extends [object]>(iteratees: Array<[PropertyKey, unknown]>): (...args: T) => boolean[];
function over<T extends [object]>(iteratees: object[]): (...args: T) => boolean[];
function over<T extends [object]>(iteratees: PropertyKey[]): (...args: T) => unknown[];
```

### 参数

- `iteratees` (`Array<((...args: any[]) => unknown) | symbol | number | string | object | null>`): 要调用的迭代器。

### 返回值

(`Function`): 返回新函数。

## 示例

```typescript
const func = over([Math.max, Math.min]);
func(1, 2, 3, 4);
// => [4, 1]

const func = over(['a', 'b']);
func({ a: 1, b: 2 });
// => [1, 2]

const func = over([{ a: 1 }, { b: 2 }]);
func({ a: 1, b: 2 });
// => [true, false]

const func = over([['a', 1], ['b', 2]]);
func({ a: 1, b: 2 });
// => [true, true]

// null 或 undefined 值（作为恒等函数处理）
// 注意：没有类型断言会导致 TypeScript 错误
const func = over([null, undefined]);
func('a', 'b', 'c');
// => ['a', 'a']

// 空迭代器数组
const emptyFunc = over([]);
emptyFunc(1, 2, 3);
// => []
```
