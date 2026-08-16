# unary

创建一个新函数,限制函数只接受第一个参数。

```typescript
const unaryFunc = unary(func);
```

## 用法

### `unary(func)`

当您想限制函数只接受一个参数时,请使用 `unary`。所有额外传递的参数都会被忽略。

这在数组的 `map`、`filter`、`forEach` 等方法中非常有用,可以防止回调函数接收到比预期更多的参数。

```typescript
import { unary } from 'es-toolkit/function';

// 基本用法
function greet(name: string, age?: number, city?: string) {
  console.log(`您好,${name}!`);
  if (age) console.log(`年龄:${age}`);
  if (city) console.log(`城市:${city}`);
}

const greetOnlyName = unary(greet);
greetOnlyName('小明', 25, '北京'); // 只输出 '您好,小明!'

// 与数组方法一起使用
const numbers = ['1', '2', '3', '4', '5'];

// parseInt 的第二个参数接受基数,
// 但 map 的回调会传递 (value, index, array)
console.log(numbers.map(parseInt)); // [1, NaN, NaN, NaN, NaN] (意外的结果)

// 使用 unary 只传递第一个参数
console.log(numbers.map(unary(parseInt))); // [1, 2, 3, 4, 5] (预期的结果)

// 其他示例:当函数接受多个参数但只想使用一个时
function logValue(value: any, prefix: string = 'Value:', suffix: string = '') {
  console.log(`${prefix} ${value} ${suffix}`);
}

const data = ['apple', 'banana', 'cherry'];

// 只想输出值,不要 prefix 和 suffix
data.forEach(unary(logValue));
// Value: apple
// Value: banana
// Value: cherry
```

在函数组合中也很有用。

```typescript
import { unary } from 'es-toolkit/function';

// 接受多个参数的函数
function multiply(a: number, b: number = 1, c: number = 1) {
  return a * b * c;
}

// 限制为只使用第一个参数
const multiplyOne = unary(multiply);

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => multiplyOne(x, 2, 3)); // b 和 c 被忽略
console.log(doubled); // [1, 2, 3, 4, 5] (1 * 1 * 1 的结果)
```

#### 参数

- `func` (`F`): 要限制为只接受第一个参数的函数。

#### 返回值

(`(...args: any[]) => ReturnType<F>`): 返回一个新函数,只将第一个参数传递给原始函数。
