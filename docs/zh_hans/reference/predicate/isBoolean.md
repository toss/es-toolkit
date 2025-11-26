# isBoolean

检查给定值是否为布尔类型。

```typescript
const result = isBoolean(value);
```

## 用法

### `isBoolean(value)`

当您想确认某个值是否为 `true` 或 `false` 时，请使用 `isBoolean`。在 TypeScript 中作为类型守卫工作，将值的类型缩小为 `boolean`。

```typescript
import { isBoolean } from 'es-toolkit/predicate';

// 基本布尔值确认
isBoolean(true); // true
isBoolean(false); // true

// 与其他类型区分
isBoolean(1); // false
isBoolean(0); // false
isBoolean('true'); // false
isBoolean('false'); // false
```

在 TypeScript 中作为类型守卫使用时特别有用。

```typescript
import { isBoolean } from 'es-toolkit/predicate';

function processValue(value: unknown) {
  if (isBoolean(value)) {
    // value 类型被缩小为 boolean
    console.log(value ? '是真' : '是假');
  } else {
    console.log('不是布尔值');
  }
}
```

也可以用于 API 响应或用户输入验证。

```typescript
import { isBoolean } from 'es-toolkit/predicate';

// API 响应验证
interface APIResponse {
  success: unknown;
  data: any;
}

function validateResponse(response: APIResponse) {
  if (isBoolean(response.success)) {
    console.log(`API 调用${response.success ? '成功' : '失败'}`);
    return response.success;
  }
  console.log('错误的响应格式');
  return false;
}
```

#### 参数

- `value` (`unknown`): 要检查是否为布尔类型的值。

#### 返回值

(`boolean`): 如果值为 `true` 或 `false` 则返回 `true`，否则返回 `false`。
