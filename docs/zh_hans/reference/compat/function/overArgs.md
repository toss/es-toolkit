# overArgs

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

生成一个新函数，该函数在调用 `func` 函数之前会先对其参数进行转换。

转换函数可以是以下形式：

- 接收值并返回转换后结果的函数
- 用于从参数中获取属性值的属性名（字符串）
- 用于检查参数是否匹配对象属性的对象
- 用于检查参数的属性是否匹配值的 [属性, 值] 数组

如果转换函数为 `null` 或 `undefined`，则会使用 [identity](../../function/identity.md) 函数代替。
只会转换与提供的转换函数数量相对应的参数。

## 签名

```typescript
function overArgs<F extends (...args: any[]) => any, T extends Array<any>>(
  func: F,
  transforms: T
): (...args: any[]) => ReturnType<F>;
```

### 参数

- `func` (`F`): 要传入转换后参数的函数。
- `transforms` (`T`): 用于转换参数的函数数组。

### 返回值

(`(...args: any[]) => ReturnType<F>`): 返回一个新函数，该函数会先转换参数，然后将转换后的参数传给 `func`。

### 错误

如果 `func` 不是函数，则会抛出 TypeError。

## 示例

```typescript
import { overArgs } from 'es-toolkit/compat';

// With function transforms
function doubled(n: number) {
  return n * 2;
}

function square(n: number) {
  return n * n;
}

const func = overArgs((x, y) => [x, y], [doubled, square]);

func(5, 3);
// => [10, 9]

func(10, 5);
// => [20, 25]

// With property shorthand
const user = { name: 'John', age: 30 };
const getUserInfo = overArgs((name, age) => `${name} is ${age} years old`, ['name', 'age']);

getUserInfo(user, user);
// => "John is 30 years old"

// Only transform specific arguments
const partial = overArgs((a, b, c) => [a, b, c], [doubled]);

partial(5, 3, 2);
// => [10, 3, 2]
```
