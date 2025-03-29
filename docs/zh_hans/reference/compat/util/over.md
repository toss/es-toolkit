# over

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

创建一个函数，该函数调用给定的迭代器（iteratees）并返回结果数组。

你可以使用多种类型的迭代器：

- **函数**：每个函数都使用相同的参数调用，并收集结果。
- **属性名**：每个属性名用于从提供的对象中提取值。
- **对象**：每个对象用于检查提供的对象是否匹配其属性。
- **属性-值对**：每个对用于检查提供的对象的指定属性是否匹配该值。

## 签名

```typescript
// 使用函数迭代器
function over<T extends unknown[], R>(iteratees: Array<(...args: T) => R>): (...args: T) => R[];

// 使用属性-值对
function over<T extends [object]>(iteratees: Array<[PropertyKey, unknown]>): (...args: T) => boolean[];

// 使用对象匹配器
function over<T extends [object]>(iteratees: object[]): (...args: T) => boolean[];

// 使用属性访问器
function over<T extends [object]>(iteratees: PropertyKey[]): (...args: T) => unknown[];
```

### 参数

- `iteratees`: 要调用的迭代器。可以是以下形式：
  - **函数数组**：每个函数都使用相同的参数调用。
  - **属性-值对数组**：每个对用于检查指定的属性是否匹配给定值。
  - **对象数组**：每个对象用于检查提供的对象是否匹配。
  - **属性键数组**：每个属性键用于访问提供的对象中的值。

::: info 空值处理
如果迭代器数组包含 `null` 或 `undefined` 值，在运行时会被视为恒等函数（identity function）。但是，如果没有适当的类型定义，这将导致 TypeScript 类型错误。这种行为是故意实现的，以完全匹配 lodash 的功能。
:::

### 返回值

一个函数，当给定参数时，会用这些参数调用所有迭代器并返回结果数组。

## 示例

### 使用函数迭代器

```typescript
import { over } from 'es-toolkit/compat';

// 使用标准函数
const func = over([Math.max, Math.min]);
console.log(func(1, 2, 3, 4)); // => [4, 1]

// 使用自定义函数
const greet = name => `Hello, ${name}!`;
const shout = name => `HEY, ${name.toUpperCase()}!!!`;
const greeter = over([greet, shout]);
console.log(greeter('world')); // => ['Hello, world!', 'HEY, WORLD!!!']

// 使用 this 绑定
const obj = {
  a: 1,
  b: 2,
  func: over([
    function () {
      return this.a;
    },
    function () {
      return this.b;
    },
  ]),
};
console.log(obj.func()); // => [1, 2]
```

### 使用属性访问器

```typescript
import { over } from 'es-toolkit/compat';

// 访问对象的属性
const prop = over(['a', 'b']);
console.log(prop({ a: 1, b: 2 })); // => [1, 2]

// 数字属性也可以使用
const items = ['apple', 'banana', 'cherry'];
const getItems = over([0, 2]);
console.log(getItems(items)); // => ['apple', 'cherry']
```

### 使用对象匹配器

```typescript
import { over } from 'es-toolkit/compat';

// 检查对象是否匹配模式
const matcher = over([{ a: 1 }, { b: 2 }]);
console.log(matcher({ a: 1, b: 2 })); // => [true, false]
console.log(matcher({ a: 1, b: 1 })); // => [true, false]

// 空对象匹配所有内容
const alwaysTrue = over([{}]);
console.log(alwaysTrue({ a: 1 })); // => [true]
```

### 使用属性-值对

```typescript
import { over } from 'es-toolkit/compat';

// 检查属性是否匹配值
const matchProp = over([
  ['a', 1],
  ['b', 2],
]);
console.log(matchProp({ a: 1, b: 2 })); // => [true, true]
console.log(matchProp({ a: 2, b: 1 })); // => [false, false]
```

### 边缘情况

```typescript
import { over } from 'es-toolkit/compat';

// 空迭代器数组
const emptyFunc = over([]);
console.log(emptyFunc(1, 2, 3)); // => []

// null 或 undefined 值（作为恒等函数处理）
// 注意：没有类型断言会导致 TypeScript 错误
const nullFunc = over([null, undefined]);
console.log(nullFunc('a', 'b', 'c')); // => ['a', 'a']
```
