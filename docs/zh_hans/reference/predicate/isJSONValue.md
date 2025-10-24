# isJSONValue

检查给定值是否为有效的 JSON 值。

```typescript
const result = isJSONValue(value);
```

## 参考

### `isJSONValue(value)`

当您想确认某个值是否可序列化为 JSON 的有效值时，请使用 `isJSONValue`。根据 JSON 规范，有效值包括 `null`、对象、数组、字符串、数字、布尔值。此函数是其他 JSON 相关类型守卫的基础函数。

```typescript
import { isJSONValue } from 'es-toolkit/predicate';

// 原始 JSON 值
console.log(isJSONValue(null)); // true
console.log(isJSONValue('hello')); // true
console.log(isJSONValue(42)); // true
console.log(isJSONValue(true)); // true
console.log(isJSONValue(false)); // true

// 对象和数组（内部值也都必须有效）
console.log(isJSONValue({ name: 'John', age: 30 })); // true
console.log(isJSONValue([1, 2, 3, 'text'])); // true
console.log(isJSONValue([])); // true (空数组)
console.log(isJSONValue({})); // true (空对象)

// 嵌套结构
const complexData = {
  user: {
    name: 'Alice',
    active: true,
    scores: [95, 87, 92],
  },
  metadata: null,
};
console.log(isJSONValue(complexData)); // true
```

准确区分无法序列化为 JSON 的值。函数、`undefined`、`Symbol`、类实例等不受 JSON 规范支持的类型会返回 `false`：

```typescript
// undefined 不受 JSON 支持
console.log(isJSONValue(undefined)); // false

// 函数无法序列化为 JSON
console.log(isJSONValue(() => {})); // false
console.log(isJSONValue(function () {})); // false

// Symbol 不受 JSON 支持
console.log(isJSONValue(Symbol('test'))); // false

// Date 对象在 JSON 中必须转换为字符串
console.log(isJSONValue(new Date())); // false

// RegExp 对象也不受 JSON 支持
console.log(isJSONValue(/pattern/)); // false

// 包含函数或 undefined 的对象/数组
console.log(isJSONValue({ name: 'John', greet: () => {} })); // false
console.log(isJSONValue([1, 2, undefined])); // false

// BigInt 不受 JSON 支持
console.log(isJSONValue(BigInt(123))); // false
```

在 JSON 序列化前的数据验证中很有用：

```typescript
// 安全的 JSON 序列化
function safeJsonStringify(data: unknown): string | null {
  if (isJSONValue(data)) {
    // 确保 data 是有效的 JSON 值
    return JSON.stringify(data);
  }

  console.warn('数据无法序列化为 JSON');
  return null;
}

// API 请求数据验证
function sendApiRequest(data: unknown) {
  if (isJSONValue(data)) {
    const jsonPayload = JSON.stringify(data);
    // 发送 API 请求
    console.log('要发送的数据:', jsonPayload);
    return fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonPayload,
    });
  }

  throw new Error('API 数据必须可序列化为 JSON');
}

// localStorage 保存前验证
function saveToStorage(key: string, value: unknown) {
  if (isJSONValue(value)) {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  console.error('无法保存到 localStorage 的数据类型');
  return false;
}

// 配置文件验证
function validateConfig(config: unknown) {
  if (isJSONValue(config)) {
    return {
      isValid: true,
      config,
      serialized: JSON.stringify(config),
    };
  }

  return {
    isValid: false,
    config: null,
    error: 'Config must be a valid JSON value',
  };
}
```

可以与其他类型守卫组合使用。

```typescript
// 检查具体的 JSON 类型
function processJsonData(data: unknown) {
  if (!isJSONValue(data)) {
    throw new Error('Invalid JSON value');
  }

  // 现在确保 data 是有效的 JSON 值
  if (isJSONObject(data)) {
    console.log('是 JSON 对象:', Object.keys(data));
  } else if (isJSONArray(data)) {
    console.log('是 JSON 数组:', data.length, '个项目');
  } else {
    console.log('是原始 JSON 值:', typeof data, data);
  }
}

// 嵌套数据验证
const testData = {
  valid: { name: 'test', values: [1, 2, 3] },
  invalid: { name: 'test', callback: () => {} },
};

console.log(isJSONValue(testData.valid)); // true
console.log(isJSONValue(testData.invalid)); // false
```

边界情况：

```typescript
// 特殊数字值
console.log(isJSONValue(Infinity)); // false (在 JSON 中转换为 null)
console.log(isJSONValue(-Infinity)); // false
console.log(isJSONValue(NaN)); // false (在 JSON 中转换为 null)

// 空值
console.log(isJSONValue('')); // true (空字符串)
console.log(isJSONValue(0)); // true
console.log(isJSONValue(false)); // true

// 具有原型的对象
const obj = Object.create({ inherited: 'value' });
obj.own = 'property';
console.log(isJSONValue(obj)); // true (视为纯对象)
```

#### 参数

- `value` (`unknown`): 要检查是否为有效 JSON 值的值。

#### 返回值

(`value is Record<string, any> | any[] | string | number | boolean | null`): 如果值为有效的 JSON 值则返回 `true`，否则返回 `false`。
