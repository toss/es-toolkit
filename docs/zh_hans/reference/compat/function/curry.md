# curry (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 `curry` 或手动闭包
此 `curry` 函数由于复杂的占位符处理、参数个数验证和参数组合逻辑而运行缓慢。

如果不需要占位符，请改用更快的 `es-toolkit` 的 [`curry`](../../function/curry.md) 或简单闭包。
:::

对函数进行柯里化，使其可以一次接受一个参数或一次接受多个参数。

```typescript
const curriedFunction = curry(func, arity);
```

## 用法

### `curry(func, arity)`

当您想要对函数进行柯里化以便更容易地进行部分应用时，使用 `curry`。它对于逐步提供参数或使用占位符稍后在特定位置提供参数非常有用。

```typescript
import { curry } from 'es-toolkit/compat';

// 基本用法
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

// 可以用各种方式调用
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6
```

与主库 curry 的比较:

```typescript
// compat 版本 (灵活，但较慢)
import { curry } from 'es-toolkit/compat';
const curriedCompat = curry(add);
curriedCompat(1, 2)(3); // 支持
curriedCompat(1)(curry.placeholder, 3)(2); // 支持占位符

// 主库版本 (更快，但只能一次一个)
import { curry } from 'es-toolkit';
const curriedMain = curry(add);
curriedMain(1)(2)(3); // 支持
curriedMain(1, 2)(3); // 不支持
```

使用占位符功能:

```typescript
import { curry } from 'es-toolkit/compat';

function greet(greeting, name, punctuation) {
  return `${greeting}, ${name}${punctuation}`;
}

const curriedGreet = curry(greet);

// 使用占位符跳过中间参数
const greetWithExclamation = curriedGreet(curry.placeholder, curry.placeholder, '!');
console.log(greetWithExclamation('Hello', 'John')); // "Hello, John!"

const sayHello = curriedGreet('Hello');
console.log(sayHello(curry.placeholder, '~')('Jane')); // "Hello, Jane~"
```

在函数式编程中使用:

```typescript
import { curry } from 'es-toolkit/compat';

// 创建映射函数
const map = curry((fn, array) => array.map(fn));
const filter = curry((predicate, array) => array.filter(predicate));

const numbers = [1, 2, 3, 4, 5];

// 创建可重用的函数
const double = x => x * 2;
const isEven = x => x % 2 === 0;

const mapDouble = map(double);
const filterEven = filter(isEven);

console.log(mapDouble(numbers)); // [2, 4, 6, 8, 10]
console.log(filterEven(numbers)); // [2, 4]

// 函数组合
const processNumbers = nums => mapDouble(filterEven(nums));
console.log(processNumbers(numbers)); // [4, 8]
```

配置 API 客户端:

```typescript
import { curry } from 'es-toolkit/compat';

function apiRequest(method, baseUrl, endpoint, options) {
  return fetch(`${baseUrl}${endpoint}`, {
    method,
    ...options,
  });
}

const curriedApiRequest = curry(apiRequest);

// 使用默认设置创建专用函数
const apiGet = curriedApiRequest('GET', 'https://api.example.com');
const apiPost = curriedApiRequest('POST', 'https://api.example.com');

// 包含认证标头
const authenticatedPost = apiPost(curry.placeholder, {
  headers: { Authorization: 'Bearer token123' },
});

// 使用
apiGet('/users'); // GET https://api.example.com/users
authenticatedPost('/users'); // POST with auth headers
```

数学运算函数:

```typescript
import { curry } from 'es-toolkit/compat';

const calculate = curry((operation, a, b) => {
  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      throw new Error('不支持的操作');
  }
});

// 专用操作函数
const add = calculate('+');
const subtract = calculate('-');
const multiply = calculate('*');

console.log(add(5, 3)); // 8
console.log(subtract(10)(4)); // 6
console.log(multiply(3, 4)); // 12

// 使用占位符固定第二个操作数
const addFive = calculate('+', curry.placeholder, 5);
console.log(addFive(10)); // 15
```

指定参数个数:

```typescript
import { curry } from 'es-toolkit/compat';

function variableArgsFunction(a, b, c, ...rest) {
  return [a, b, c, rest];
}

// 将参数个数限制为 3
const curriedFixed = curry(variableArgsFunction, 3);

console.log(curriedFixed(1)(2)(3)); // [1, 2, 3, []]
console.log(curriedFixed(1, 2)(3)); // [1, 2, 3, []]

// 不指定参数个数使用 (默认值: function.length)
const curriedDefault = curry(variableArgsFunction); // arity = 3
```

简单的柯里化替代方案:

```typescript
// 使用 curry
const curriedAdd = curry((a, b, c) => a + b + c);

// 手动闭包 (更快)
const manualCurry = a => b => c => a + b + c;

// 两者产生相同的结果
console.log(curriedAdd(1)(2)(3)); // 6
console.log(manualCurry(1)(2)(3)); // 6
```

也支持构造函数:

```typescript
import { curry } from 'es-toolkit/compat';

function Person(name, age, city) {
  this.name = name;
  this.age = age;
  this.city = city;
}

const CurriedPerson = curry(Person);
const SeoulPerson = CurriedPerson(curry.placeholder, curry.placeholder, 'Seoul');

const person1 = new SeoulPerson('John', 30);
const person2 = new SeoulPerson('Jane', 25);

console.log(person1.city); // "Seoul"
console.log(person2.city); // "Seoul"
```

#### 参数

- `func` (`Function`): 要柯里化的函数。
- `arity` (`number`, 可选): 函数的参数个数。如果省略，使用 `func.length`。

#### 返回值

(`Function & { placeholder: symbol }`): 返回柯里化的函数。`placeholder` 属性允许您控制参数位置。
