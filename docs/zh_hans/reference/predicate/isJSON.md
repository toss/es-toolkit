# isJSON

检查给定值是否为有效的 JSON 字符串。

```typescript
const result = isJSON(value);
```

## 用法

### `isJSON(value)`

当您想确认某个字符串是否为有效的 JSON 格式时，请使用 `isJSON`。此函数检查字符串是否可以用 `JSON.parse()` 解析。根据 JSON 规范，有效值包括表示对象、数组、字符串、数字、布尔值、`null` 的所有字符串。

```typescript
import { isJSON } from 'es-toolkit/predicate';

// 有效的 JSON 字符串
console.log(isJSON('{"name":"John","age":30}')); // true
console.log(isJSON('[1,2,3]')); // true
console.log(isJSON('"hello world"')); // true
console.log(isJSON('42')); // true
console.log(isJSON('true')); // true
console.log(isJSON('false')); // true
console.log(isJSON('null')); // true

// 无效的 JSON 字符串
console.log(isJSON('undefined')); // false
console.log(isJSON('function() {}')); // false
console.log(isJSON('{name: "John"}')); // false (键没有引号)
console.log(isJSON("{'name': 'John'}")); // false (使用单引号)
console.log(isJSON('{}')); // true (空对象有效)
console.log(isJSON('[]')); // true (空数组有效)
```

非字符串值都返回 `false`：

```typescript
// 非字符串值
console.log(isJSON({ name: 'John' })); // false
console.log(isJSON([1, 2, 3])); // false
console.log(isJSON(42)); // false
console.log(isJSON(true)); // false
console.log(isJSON(null)); // false
console.log(isJSON(undefined)); // false
```

在 API 响应或用户输入验证中很有用：

```typescript
// API 响应验证
function processApiResponse(response: unknown) {
  if (isJSON(response)) {
    try {
      const data = JSON.parse(response);
      console.log('解析的数据:', data);
      return data;
    } catch (error) {
      // isJSON 返回 true，这里不会执行
      console.error('解析失败:', error);
    }
  }

  console.log('不是有效的 JSON 字符串');
  return null;
}

// 用户输入验证
function validateJsonInput(input: unknown): string | null {
  if (isJSON(input)) {
    // TypeScript 将 input 推断为 string
    return input;
  }

  throw new Error('输入值必须是有效的 JSON 字符串');
}

// 配置文件验证
function loadConfig(configString: unknown) {
  if (isJSON(configString)) {
    const config = JSON.parse(configString);
    return {
      isValid: true,
      config,
      error: null,
    };
  }

  return {
    isValid: false,
    config: null,
    error: 'Invalid JSON format',
  };
}
```

也能准确检测复杂的 JSON 结构：

```typescript
const complexJson = `{
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "preferences": {
        "theme": "dark",
        "notifications": true
      }
    }
  ],
  "meta": {
    "total": 1,
    "page": 1
  }
}`;

console.log(isJSON(complexJson)); // true

// 错误的格式
console.log(isJSON('{ "name": "John", }')); // false (trailing comma)
console.log(isJSON('{ name: "John" }')); // false (unquoted key)
console.log(isJSON("{ 'name': 'John' }")); // false (single quotes)
```

#### 参数

- `value` (`unknown`): 要检查是否为有效 JSON 字符串的值。

#### 返回值

(`value is string`): 如果值为有效的 JSON 字符串则返回 `true`，否则返回 `false`。
