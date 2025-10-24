# curryRight (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [`curryRight`](../../function/curryRight.md) 或手动闭包

由于复杂的占位符处理、参数数量验证和参数组合逻辑,这个 `curryRight` 函数运行较慢。

如果不需要占位符,请使用更快的 `es-toolkit` 的 [`curryRight`](../../function/curryRight.md) 或简单的闭包。

:::

从右到左柯里化一个函数,创建一个可以一次接受一个或多个参数的函数,从最后一个参数开始。

```typescript
const curriedFunction = curryRight(func, arity);
```

## 参考

### `curryRight(func, arity)`

当您想要从右到左柯里化一个函数并从最后一个参数开始部分应用参数时,请使用 `curryRight`。与常规的 `curry` 不同,它首先从最后一个参数开始处理。

```typescript
import { curryRight } from 'es-toolkit/compat';

// 基本用法
function subtract(a, b, c) {
  return a - b - c;
}

const curriedSubtract = curryRight(subtract);

// 从右开始柯里化(从最后一个参数开始)
console.log(curriedSubtract(1)(2)(5)); // 5 - 2 - 1 = 2
console.log(curriedSubtract(1, 2)(5)); // 5 - 2 - 1 = 2
console.log(curriedSubtract(1)(2, 5)); // 2 - 5 - 1 = -4
console.log(curriedSubtract(1, 2, 5)); // 1 - 2 - 5 = -6
```

`curry` 和 `curryRight` 的区别:

```typescript
import { curry, curryRight } from 'es-toolkit/compat';

function divide(a, b, c) {
  return a / b / c;
}

// 常规 curry(从左开始)
const leftCurried = curry(divide);
console.log(leftCurried(12)(3)(2)); // ((12 / 3) / 2) = 2

// curryRight(从右开始)
const rightCurried = curryRight(divide);
console.log(rightCurried(2)(3)(12)); // ((12 / 3) / 2) = 2
// 最后提供的 12 成为第一个参数(a)
```

与主库的比较:

```typescript
// compat 版本(灵活,但较慢)
import { curryRight } from 'es-toolkit/compat';
const curriedCompat = curryRight(subtract);
curriedCompat(1, 2)(3); // 支持
curriedCompat(1)(curryRight.placeholder, 3)(2); // 支持占位符

// 主库版本(更快,但一次只能一个)
import { curryRight } from 'es-toolkit';
const curriedMain = curryRight(subtract);
curriedMain(1)(2)(3); // 支持
curriedMain(1, 2)(3); // 不支持
```

使用占位符功能:

```typescript
import { curryRight } from 'es-toolkit/compat';

function formatMessage(name, action, time) {
  return `${name} 在 ${time} ${action}了`;
}

const curriedFormat = curryRight(formatMessage);

// 使用占位符跳过特定位置
const todayAction = curriedFormat('今天');
const todayLoginAction = todayAction(curryRight.placeholder, '登录');

console.log(todayLoginAction('张三'));
// "张三 在 今天 登录了"

// 首先固定时间
const morningFormat = curriedFormat('早上9点');
console.log(morningFormat('评论', '李四'));
// "李四 在 早上9点 评论了"
```

在数组处理中使用:

```typescript
import { curryRight } from 'es-toolkit/compat';

// 从数组末尾获取特定数量的项
function takeFromEnd(array, count, separator = ', ') {
  return array.slice(-count).join(separator);
}

const curriedTake = curryRight(takeFromEnd);

// 创建用逗号分隔的函数
const takeWithComma = curriedTake(', ');

// 获取最后3项
const takeLast3 = takeWithComma(3);

const fruits = ['苹果', '香蕉', '橙子', '葡萄', '猕猴桃'];
console.log(takeLast3(fruits)); // "橙子, 葡萄, 猕猴桃"

// 使用不同的分隔符
const takeWithDash = curriedTake(' - ');
console.log(takeWithDash(2, fruits)); // "葡萄 - 猕猴桃"
```

在函数组合中使用:

```typescript
import { curryRight } from 'es-toolkit/compat';

// 日志输出函数
function logWithPrefix(message, level, timestamp) {
  return `[${timestamp}] ${level}: ${message}`;
}

const curriedLog = curryRight(logWithPrefix);

// 用当前时间固定
const currentTimeLog = curriedLog(new Date().toISOString());

// 按级别创建记录器
const errorLog = currentTimeLog('ERROR');
const infoLog = currentTimeLog('INFO');
const debugLog = currentTimeLog('DEBUG');

// 使用
console.log(errorLog('数据库连接失败'));
console.log(infoLog('服务器已启动'));
console.log(debugLog('正在处理用户请求'));
```

函数式编程管道:

```typescript
import { curryRight } from 'es-toolkit/compat';

// 数据转换函数
const mapWith = curryRight((array, fn) => array.map(fn));
const filterWith = curryRight((array, predicate) => array.filter(predicate));
const reduceWith = curryRight((array, reducer, initial) => array.reduce(reducer, initial));

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 定义转换函数
const double = x => x * 2;
const isEven = x => x % 2 === 0;
const sum = (acc, val) => acc + val;

// 组合管道(右侧优先)
const processNumbers = nums => {
  return reduceWith(filterWith(mapWith(nums, double), isEven), sum, 0);
};

console.log(processNumbers(numbers)); // 所有数字翻倍,过滤偶数,然后求和
```

API 请求构建器:

```typescript
import { curryRight } from 'es-toolkit/compat';

function makeRequest(url, method, headers, body) {
  return fetch(url, { method, headers, body });
}

const curriedRequest = curryRight(makeRequest);

// 首先设置 body
const withJsonBody = curriedRequest(JSON.stringify({ data: 'test' }));

// 添加 headers
const withHeaders = withJsonBody({
  'Content-Type': 'application/json',
  Authorization: 'Bearer token123',
});

// 设置 POST 方法
const postRequest = withHeaders('POST');

// 最终使用
postRequest('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));
```

手动柯里化替代方案:

```typescript
// 使用 curryRight
const curriedSubtract = curryRight((a, b, c) => a - b - c);

// 手动闭包(更快,从右开始)
const manualCurryRight = c => b => a => a - b - c;

// 两者结果相同
console.log(curriedSubtract(1)(2)(5)); // 2
console.log(manualCurryRight(1)(2)(5)); // 2
```

指定参数数量:

```typescript
import { curryRight } from 'es-toolkit/compat';

function variableArgsFunction(a, b, c, ...rest) {
  return { a, b, c, rest };
}

// 将参数数量限制为3(忽略 rest)
const curriedFixed = curryRight(variableArgsFunction, 3);

// 从右侧按 c, b, a 的顺序接收
console.log(curriedFixed(3)(2)(1)); // { a: 1, b: 2, c: 3, rest: [] }
```

#### 参数

- `func` (`Function`): 要从右到左柯里化的函数。
- `arity` (`number`, 可选): 函数的参数数量。如果省略,则使用 `func.length`。

#### 返回值

(`Function & { placeholder: symbol }`): 返回从右到左柯里化的函数。可以使用 `placeholder` 属性控制参数位置。
