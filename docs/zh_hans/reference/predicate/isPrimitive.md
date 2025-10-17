# isPrimitive

检查给定值是否为 JavaScript 原始值。

```typescript
const result = isPrimitive(value);
```

## 参考

### `isPrimitive(value)`

当您想检查值是否为 JavaScript 原始值时，请使用 `isPrimitive`。JavaScript 的原始值包括 `null`、`undefined`、字符串、数字、布尔值、符号和 `BigInt`。它对于区分对象或函数等引用类型很有用。

```typescript
import { isPrimitive } from 'es-toolkit/predicate';

// 原始值
console.log(isPrimitive(null)); // true
console.log(isPrimitive(undefined)); // true
console.log(isPrimitive('hello')); // true
console.log(isPrimitive(42)); // true
console.log(isPrimitive(true)); // true
console.log(isPrimitive(false)); // true
console.log(isPrimitive(Symbol('test'))); // true
console.log(isPrimitive(123n)); // true

// 引用类型（非原始值）
console.log(isPrimitive({})); // false
console.log(isPrimitive([])); // false
console.log(isPrimitive(new Date())); // false
console.log(isPrimitive(new Map())); // false
console.log(isPrimitive(new Set())); // false
console.log(isPrimitive(() => {})); // false
console.log(isPrimitive(/regex/)); // false
```

在实现深拷贝逻辑时很有用。

```typescript
// 以不同方式处理原始值和对象
function deepClone(value: any): any {
  if (isPrimitive(value)) {
    // 原始值按原样返回
    return value;
  }

  // 对对象执行克隆逻辑
  if (Array.isArray(value)) {
    return value.map(deepClone);
  }

  const result: any = {};
  for (const key in value) {
    result[key] = deepClone(value[key]);
  }
  return result;
}

// 在值比较中使用
function isEqual(a: unknown, b: unknown): boolean {
  if (isPrimitive(a) && isPrimitive(b)) {
    return a === b;
  }

  // 复杂的对象比较逻辑...
  return false;
}

// 用于日志记录的安全字符串转换
function safeLog(value: unknown) {
  if (isPrimitive(value)) {
    console.log('原始值:', value);
  } else {
    console.log('对象:', typeof value, Object.prototype.toString.call(value));
  }
}
```

您可以将其用作类型守卫来编写安全的代码。

```typescript
function processValue(input: unknown) {
  if (isPrimitive(input)) {
    // TypeScript 将 input 推断为原始类型
    console.log('原始值的类型:', typeof input);
    console.log('原始值:', input);
    return input;
  }

  // 这里 input 被推断为对象类型
  console.log('这是对象类型');
  return null;
}

// API 响应验证
function validateApiResponse(data: unknown) {
  if (isPrimitive(data)) {
    return {
      type: 'primitive',
      value: data,
      serializable: true,
    };
  }

  return {
    type: 'object',
    value: data,
    serializable: false, // 需要额外验证
  };
}

// 配置值处理
function normalizeConfigValue(value: unknown) {
  if (isPrimitive(value)) {
    // 原始值可以安全地转换为字符串
    return String(value);
  }

  // 将对象序列化为 JSON
  try {
    return JSON.stringify(value);
  } catch {
    return '[复杂对象]';
  }
}
```

您可以区分 `String`、`Number`、`Boolean` 等包装对象和原始值。

```typescript
// 包装对象不是原始值
console.log(isPrimitive(new String('hello'))); // false
console.log(isPrimitive(new Number(42))); // false
console.log(isPrimitive(new Boolean(true))); // false

// 但实际的原始值返回 true
console.log(isPrimitive('hello')); // true
console.log(isPrimitive(42)); // true
console.log(isPrimitive(true)); // true

// 可以使用 valueOf() 提取原始值
const strObj = new String('hello');
console.log(isPrimitive(strObj.valueOf())); // true
```

#### 参数

- `value` (`unknown`): 要检查是否为 JavaScript 原始值的值。

#### 返回值

(`value is null | undefined | string | number | boolean | symbol | bigint`): 如果值为原始值则返回 `true`，否则返回 `false`。
