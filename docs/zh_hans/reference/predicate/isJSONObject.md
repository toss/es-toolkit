# isJSONObject

检查给定值是否为有效的 JSON 对象。

```typescript
const result = isJSONObject(value);
```

## 参考

### `isJSONObject(value)`

当您想确认对象的所有键都是字符串且所有值都是有效的 JSON 值时，请使用 `isJSONObject`。有效的 JSON 对象是指由字符串键和可序列化为 JSON 的值（`null`、对象、数组、字符串、数字、布尔值）组成的纯对象。

```typescript
import { isJSONObject } from 'es-toolkit/predicate';

// 有效的 JSON 对象
console.log(isJSONObject({ name: 'John', age: 30 })); // true
console.log(isJSONObject({ active: true, score: null })); // true
console.log(isJSONObject({})); // true (空对象)

// 嵌套结构验证
const nested = {
  user: {
    name: 'Alice',
    preferences: {
      theme: 'dark',
      notifications: true,
    },
  },
  data: [1, 2, 3],
  timestamp: null,
};
console.log(isJSONObject(nested)); // true

// 复合有效 JSON 对象
const complex = {
  id: 42,
  title: 'Example',
  published: true,
  tags: ['javascript', 'tutorial'],
  author: {
    name: 'Developer',
    email: 'dev@example.com',
  },
  metadata: null,
};
console.log(isJSONObject(complex)); // true
```

准确区分包含函数、`Symbol`、`Date` 对象、`undefined` 等无法序列化为 JSON 的值或类实例的无效 JSON 对象。

```typescript
// 包含函数的对象 - 无效
console.log(isJSONObject({ name: 'John', greet: () => {} })); // false
console.log(isJSONObject({ method: function () {} })); // false

// 包含 undefined 的对象 - 无效
console.log(isJSONObject({ name: 'John', age: undefined })); // false

// 包含 Symbol 键或值的对象 - 无效
console.log(isJSONObject({ [Symbol('key')]: 'value' })); // false
console.log(isJSONObject({ name: Symbol('name') })); // false

// Date、RegExp 等对象 - 无效
console.log(isJSONObject({ created: new Date() })); // false
console.log(isJSONObject({ pattern: /test/ })); // false

// 类实例 - 无效
class Person {
  constructor(public name: string) {}
}
console.log(isJSONObject(new Person('John'))); // false

// 非对象值
console.log(isJSONObject('not an object')); // false
console.log(isJSONObject(42)); // false
console.log(isJSONObject([1, 2, 3])); // false
console.log(isJSONObject(null)); // false
```

可用于验证是否可以安全使用 `JSON.stringify`。

```typescript
// API 响应验证
function processApiResponse(data: unknown) {
  if (isJSONObject(data)) {
    // 可以安全使用 JSON.stringify
    const jsonString = JSON.stringify(data);
    console.log('序列化的对象:', jsonString);

    // TypeScript 将 data 推断为 Record<string, any>
    return data;
  }

  throw new Error('不是有效的 JSON 对象');
}

// 配置对象验证
function loadConfig(config: unknown) {
  if (isJSONObject(config)) {
    return {
      isValid: true,
      config,
      keys: Object.keys(config),
    };
  }

  return {
    isValid: false,
    config: {},
    keys: [],
  };
}

// 用户输入数据验证
function validateUserData(input: unknown): Record<string, any> {
  if (isJSONObject(input)) {
    // 确保所有属性都可序列化为 JSON
    return input;
  }

  throw new Error('用户数据必须是有效的 JSON 对象');
}

// 嵌套对象验证
function validateNestedConfig(data: unknown) {
  if (isJSONObject(data)) {
    // 确保所有嵌套对象和数组也都符合 JSON 有效性
    console.log('配置完全兼容 JSON');
    return data;
  }

  return null;
}
```

`isJSONObject` 与其他对象检查函数有不同的目的。`isPlainObject` 检查是否为纯对象，而 `isJSONObject` 检查是否可序列化为 JSON 的对象。

```typescript
import { isPlainObject } from 'es-toolkit/predicate';

const objectWithFunction = {
  name: 'John',
  greet: function () {
    return 'Hello';
  },
};

const plainJsonObject = {
  name: 'John',
  age: 30,
};

// 纯对象 vs JSON 对象
console.log(isPlainObject(objectWithFunction)); // true (纯对象)
console.log(isJSONObject(objectWithFunction)); // false (包含函数，不是 JSON 对象)

console.log(isPlainObject(plainJsonObject)); // true
console.log(isJSONObject(plainJsonObject)); // true

// 内置对象
console.log(isPlainObject(new Date())); // false
console.log(isJSONObject(new Date())); // false

// 数组
console.log(isPlainObject([])); // false
console.log(isJSONObject([])); // false (数组是 JSON 值但不是 JSON "对象")
```

#### 参数

- `value` (`unknown`): 要检查是否为有效 JSON 对象的值。

#### 返回值

(`value is Record<string, any>`): 如果值为有效的 JSON 对象则返回 `true`，否则返回 `false`。
