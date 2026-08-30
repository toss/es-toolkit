# serialize

将值序列化为字符串。

```typescript
const serialized = serialize(value);
```

## 用法

### `serialize(value)`

当您想将值转换为字符串时,请使用 `serialize`。与内置的 `JSON.stringify()` 不同,它还可以序列化 `Map`、`Set`、`Date`、`RegExp` 等内置对象,以及 `BigInt` 等值。

结构相同的值(例如 `{ a: 1, b: 2 }` 和 `{ b: 2, a: 1 }`)总是被稳定地序列化为相同的字符串。

```typescript
import { serialize } from 'es-toolkit/util';

serialize({ b: 2, a: 1 });
// 返回 "{'a':1,'b':2}"

serialize({ a: 1, b: 2 }) === serialize({ b: 2, a: 1 });
// 返回 true

serialize([1, 2n, 'a', { k: 1 }]);
// 返回 "[1,2n,'a',{'k':1}]"

serialize(new Set([3, 1, 2]));
// 返回 'Set[1,2,3]'

serialize(
  new Map([
    ['b', 2],
    ['a', 1],
  ])
);
// 返回 "Map{'a':1,'b':2}"

serialize(new Date(0));
// 返回 'Date(1970-01-01T00:00:00.000Z)'

serialize(new Uint8Array([1, 2, 3]));
// 返回 'Uint8Array[1,2,3]'
```

各类型的序列化方式如下。

| 类型                    | 输入                            | 结果                               |
| ----------------------- | ------------------------------- | ---------------------------------- |
| 字符串                  | `'abc'`                         | `"'abc'"`                          |
| 数字                    | `123`                           | `"123"`                            |
|                         | `-0`                            | `"0"`                              |
|                         | `NaN`                           | `"NaN"`                            |
|                         | `Infinity`                      | `"Infinity"`                       |
| 布尔值                  | `true`                          | `"true"`                           |
| `undefined`             | `undefined`                     | `"undefined"`                      |
| `null`                  | `null`                          | `"null"`                           |
| `BigInt`                | `123n`                          | `"123n"`                           |
| 符号                    | `Symbol('a')`                   | `"Symbol(a)"`                      |
| 对象                    | `{ a: 1 }`                      | `"{'a':1}"`                        |
| 数组                    | `[1, 'a']`                      | `"[1,'a']"`                        |
| 函数                    | `function sum(a, b) {}`         | `"sum:function sum(a, b) {}"`      |
| 原生函数                | `Math.max`                      | `"max:[native]"`                   |
| `Date`                  | `new Date(0)`                   | `"Date(1970-01-01T00:00:00.000Z)"` |
| `RegExp`                | `/ab+c/gi`                      | `"RegExp(/ab+c/gi)"`               |
| `Set`                   | `new Set([3, 1, 2])`            | `"Set[1,2,3]"`                     |
| `Map`                   | `new Map([['a', 1]])`           | `"Map{'a':1}"`                     |
| TypedArray              | `new Uint8Array([1, 2, 3])`     | `"Uint8Array[1,2,3]"`              |
|                         | `new BigInt64Array([1n, 2n])`   | `"BigInt64Array[1n,2n]"`           |
| `ArrayBuffer`           | `new Uint8Array([1, 2]).buffer` | `"ArrayBuffer[1,2]"`               |
| `Error`                 | `new TypeError('boom')`         | `"Error(TypeError: boom)"`         |
| 带有 `entries()` 的对象 | `new URLSearchParams('a=1')`    | `"URLSearchParams{'a':'1'}"`       |

类实例会连同类名一起序列化。如果实例有 `toJSON` 方法,则序列化 `toJSON` 的结果。

```typescript
class User {
  name = 'Alice';
}
serialize(new User());
// 返回 "User{'name':'Alice'}"
```

函数会以 `名称:源码` 的形式序列化。为了使结果不受代码格式的影响,源码中的换行及其周围的空白会被移除。无法获取源码的原生函数会被序列化为 `名称:[native]`。

```typescript
function sum(a, b) {
  return a + b;
}
serialize(sum);
// 返回 'sum:function sum(a, b) {return a + b;}'

serialize(Math.max);
// 返回 'max:[native]'
```

循环引用会被序列化为 `#ref{n}` 形式的回引用,其中 `n` 是对象首次被访问的顺序。

```typescript
const obj = {};
obj.self = obj;
serialize(obj);
// 返回 "{'self':#ref0}"
```

无法有意义地序列化的对象(例如 `Promise`、`WeakMap` 或 `Blob`)会抛出 `TypeError`。

```typescript
serialize(new WeakMap());
// 抛出 TypeError: Cannot serialize WeakMap
```

::: warning 请勿用于对安全性敏感的用途

为了性能,`serialize` 不会转义字符串或键。这意味着可以构造恶意输入,使不同的值序列化为相同的字符串。请将其用于一般用途的缓存键或变更检测,不要在安全性重要的场景中使用。

:::

#### 参数

- `value` (`unknown`): 要序列化的值。

#### 返回值

(`string`): 序列化后的字符串。

#### 错误

(`TypeError`): 如果值中包含无法序列化的对象(例如 `Promise`、`WeakMap`、`WeakSet`、`Blob` 或 `DataView`),则会发生错误。
