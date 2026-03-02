# isDate

检查给定值是否为 Date 对象。

```typescript
const result = isDate(value);
```

## 用法

### `isDate(value)`

当您想确认某个值是否为日期对象时，请使用 `isDate`。在区分字符串或数字形式的日期表示与 Date 对象时很有用。在 TypeScript 中作为类型守卫工作，将值的类型缩小为 `Date`。

```typescript
import { isDate } from 'es-toolkit/predicate';

// Date 对象确认
const date = new Date();
isDate(date); // true

// 与其他类型区分
isDate('2024-01-01'); // false - 字符串
isDate(1640995200000); // false - 时间戳
isDate({}); // false
```

在 TypeScript 中作为类型守卫使用时特别有用。

```typescript
import { isDate } from 'es-toolkit/predicate';

function formatDate(value: unknown): string {
  if (isDate(value)) {
    // value 类型被缩小为 Date
    return value.toISOString();
  }
  return '无效日期';
}
```

可以用于 API 响应处理或用户输入验证。

```typescript
import { isDate } from 'es-toolkit/predicate';

// API 响应处理
function processResponse(response: { createdAt: unknown }) {
  if (isDate(response.createdAt)) {
    console.log(`创建时间：${response.createdAt.toLocaleDateString()}`);
  }
}

// 日期有效性验证
function validateBirthDate(value: unknown): boolean {
  if (isDate(value)) {
    const now = new Date();
    const minAge = new Date(now.getFullYear() - 150, now.getMonth(), now.getDate());

    return value <= now && value >= minAge;
  }
  return false;
}
```

#### 参数

- `value` (`unknown`): 要检查是否为 Date 对象的值。

#### 返回值

(`value is Date`): 如果值为 Date 对象则返回 `true`，否则返回 `false`。
