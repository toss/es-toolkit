# bind (Lodash 兼容性)

::: warning 请使用 `Function.prototype.bind()`

这个 `bind` 函数由于复杂的占位符处理、构造函数检查和参数合并逻辑而运行缓慢。如果不需要占位符，原生 `Function.prototype.bind()` 更快更简单。

请使用更快且标准的 `Function.prototype.bind()`。

:::

创建一个固定 `this` 上下文并预先提供部分参数的函数。

```typescript
const boundFunction = bind(func, thisObj, ...partialArgs);
```

## 参考

### `bind(func, thisObj, ...partialArgs)`

当您想要固定函数的 `this` 上下文或预先提供部分参数时，使用 `bind`。当您想使用占位符在特定位置稍后提供参数时特别有用。

```typescript
import { bind } from 'es-toolkit/compat';

// 基本用法
function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}

const object = { user: '张三' };
const boundGreet = bind(greet, object, '你好');

console.log(boundGreet('!')); // "你好 张三!"
console.log(boundGreet('~')); // "你好 张三~"
```

与原生 bind 比较:

```typescript
// 使用 bind
import { bind } from 'es-toolkit/compat';

const boundFn1 = bind(func, thisObj, 'arg1');

// 使用原生 bind（更快）
const boundFn2 = func.bind(thisObj, 'arg1');

// 结果相同但原生更快
```

使用占位符功能:

```typescript
import { bind } from 'es-toolkit/compat';

function calculate(operation, a, b, suffix) {
  return `${a} ${operation} ${b} = ${operation === '+' ? a + b : a - b}${suffix}`;
}

// 使用占位符稍后在特定位置提供参数
const calcWithSuffix = bind(
  calculate,
  null,
  bind.placeholder, // operation 稍后提供
  bind.placeholder, // a 稍后提供
  bind.placeholder, // b 稍后提供
  '分' // suffix 预先提供
);

console.log(calcWithSuffix('+', 5, 3)); // "5 + 3 = 8分"
console.log(calcWithSuffix('-', 10, 4)); // "10 - 4 = 6分"
```

更实用的占位符示例:

```typescript
import { bind } from 'es-toolkit/compat';

function apiRequest(method, url, options, callback) {
  // API 请求逻辑
  console.log(`${method} ${url}`, options);
  callback(`${method} 请求完成`);
}

// 为 POST 请求创建部分应用函数
const postRequest = bind(
  apiRequest,
  null,
  'POST', // 固定 method
  bind.placeholder, // url 稍后提供
  { 'Content-Type': 'application/json' }, // 固定 options
  bind.placeholder // callback 稍后提供
);

postRequest('/api/users', result => {
  console.log(result); // "POST 请求完成"
});

postRequest('/api/products', result => {
  console.log(result); // "POST 请求完成"
});
```

方法绑定:

```typescript
import { bind } from 'es-toolkit/compat';

class Logger {
  constructor(prefix) {
    this.prefix = prefix;
  }

  log(level, message) {
    console.log(`[${this.prefix}] ${level}: ${message}`);
  }
}

const logger = new Logger('MyApp');

// 绑定方法以在不同上下文中使用
const logError = bind(logger.log, logger, 'ERROR');
const logInfo = bind(logger.log, logger, 'INFO');

// 现在可以独立使用
setTimeout(() => logError('服务器连接失败'), 1000);
setTimeout(() => logInfo('应用程序已启动'), 2000);
```

在事件处理器中使用:

```typescript
import { bind } from 'es-toolkit/compat';

class ButtonHandler {
  constructor(name) {
    this.name = name;
    this.clickCount = 0;
  }

  handleClick(event, customData) {
    this.clickCount++;
    console.log(`${this.name} 按钮点击 #${this.clickCount}`);
    console.log('自定义数据:', customData);
    console.log('事件类型:', event.type);
  }
}

const handler = new ButtonHandler('菜单');

// 预先提供自定义数据，稍后传递事件
const boundHandler = bind(
  handler.handleClick,
  handler,
  bind.placeholder, // event 稍后传入
  '菜单已选择' // customData 预先提供
);

// 连接到 DOM 事件（event 自动作为第一个参数传递）
document.getElementById('menu-btn')?.addEventListener('click', boundHandler);
```

也支持构造函数:

```typescript
import { bind } from 'es-toolkit/compat';

function Person(name, age, city) {
  this.name = name;
  this.age = age;
  this.city = city || '首尔';
}

// 创建首尔居民的构造函数
const SeoulPerson = bind(Person, null, bind.placeholder, bind.placeholder, '首尔');

const person1 = new SeoulPerson('张三', 30);
const person2 = new SeoulPerson('李四', 25);

console.log(person1); // Person { name: '张三', age: 30, city: '首尔' }
console.log(person2); // Person { name: '李四', age: 25, city: '首尔' }
```

在函数式编程中使用:

```typescript
import { bind } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];

// 将 parseInt 基数固定为 10
const parseDecimal = bind(parseInt, null, bind.placeholder, 10);

// 在 map 中安全使用
const parsed = ['1', '2', '3'].map(parseDecimal);
console.log(parsed); // [1, 2, 3]

// 使用普通 parseInt 时的问题
const problematic = ['1', '2', '3'].map(parseInt); // [1, NaN, NaN]
```

#### 参数

- `func` (`Function`): 要绑定的函数。
- `thisObj` (`any`, 可选): 要绑定到函数的 `this` 值。
- `partialArgs` (`...any[]`): 要预先提供的参数。可以使用 `bind.placeholder` 来指定稍后提供的位置。

#### 返回值

(`Function`): 返回一个 `this` 已固定且部分参数已预先应用的新函数。
