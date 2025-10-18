# rest

创建一个将从特定索引开始的参数打包成数组后传递给函数的新函数。

```typescript
const restFunc = rest(func, startIndex);
```

## 参考

### `rest(func, startIndex?)`

当您想要将函数的其余参数打包成数组传递时,请使用 `rest`。特定索引之前的参数单独传递,之后的参数打包成数组传递。

这在创建接收可变参数的函数或更改现有函数的参数处理方式时很有用。

```typescript
import { rest } from 'es-toolkit/function';

// 基本用法 (从最后一个参数开始打包成数组)
function sum(a: number, b: number, numbers: number[]) {
  return a + b + numbers.reduce((sum, n) => sum + n, 0);
}

const restSum = rest(sum); // startIndex 默认为 func.length - 1 (2)
console.log(restSum(1, 2, 3, 4, 5)); // 1 + 2 + (3 + 4 + 5) = 15
// sum 函数以 [1, 2, [3, 4, 5]] 的形式调用

// 从其他索引开始打包成数组
function logMessage(level: string, messages: string[]) {
  console.log(`[${level}] ${messages.join(' ')}`);
}

const restLog = rest(logMessage, 1); // 从索引 1 开始打包成数组
restLog('INFO', 'Application', 'started', 'successfully');
// 以 logMessage('INFO', ['Application', 'started', 'successfully']) 的形式调用

// 实用示例: 第一个参数单独传递,其余打包成数组
function format(template: string, values: any[]) {
  return values.reduce((result, value, index) => {
    return result.replace(`{${index}}`, value);
  }, template);
}

const restFormat = rest(format, 1);
console.log(restFormat('Hello {0}, welcome to {1}!', 'John', 'our site'));
// 'Hello John, welcome to our site!'
```

参数不足的情况也会自动处理。

```typescript
import { rest } from 'es-toolkit/function';

function greet(greeting: string, name: string, extras: string[]) {
  const extraText = extras.length > 0 ? ` ${extras.join(' ')}` : '';
  return `${greeting} ${name}!${extraText}`;
}

const restGreet = rest(greet);

console.log(restGreet('Hello', 'Alice', 'Have a great day!'));
// 'Hello Alice! Have a great day!'

console.log(restGreet('Hi', 'Bob'));
// 'Hi Bob!' (extras 为空数组)

console.log(restGreet('Hey'));
// 'Hey undefined!' (name 为 undefined, extras 为空数组)
```

#### 参数

- `func` (`F`): 要更改参数处理方式的函数。
- `startIndex` (`number`, 可选): 开始打包成数组的索引。默认值为 `func.length - 1`,从最后一个参数开始打包成数组。

#### 返回值

(`(...args: any[]) => ReturnType<F>`): 返回一个将从特定索引开始的参数打包成数组后传递给原始函数的新函数。
