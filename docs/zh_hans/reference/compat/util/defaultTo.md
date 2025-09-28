# defaultTo (Lodash 兼容性)

对于 `null`、`undefined`、`NaN` 的值返回默认值。

```typescript
const result = defaultTo(value, defaultValue);
```

## 参考

### `defaultTo(value, defaultValue)`

当值为 `null`、`undefined` 或 `NaN` 时，您想要提供默认值时，请使用 `defaultTo`。在处理 API 响应或用户输入中的无效值时很有用。

```typescript
import { defaultTo } from 'es-toolkit/compat';

// 基本用法
console.log(defaultTo(null, 'default')); // 'default'
console.log(defaultTo(undefined, 'default')); // 'default'
console.log(defaultTo(NaN, 0)); // 0
console.log(defaultTo('actual', 'default')); // 'actual'
console.log(defaultTo(123, 0)); // 123
```

可以用于处理 API 响应。

```typescript
import { defaultTo } from 'es-toolkit/compat';

function processUserData(response) {
  return {
    name: defaultTo(response.name, '无名称'),
    age: defaultTo(response.age, 0),
    score: defaultTo(response.score, 0), // 包括 NaN 处理
  };
}

// 当 API 返回不完整数据时
const userData = processUserData({
  name: null,
  age: undefined,
  score: NaN,
});

console.log(userData);
// { name: '无名称', age: 0, score: 0 }
```

也可以用于数组或对象。

```typescript
import { defaultTo } from 'es-toolkit/compat';

const users = defaultTo(response.users, []);
const metadata = defaultTo(response.metadata, {});

// 只处理 null/undefined/NaN，不处理空数组或对象
console.log(defaultTo([], ['default'])); // [] (空数组但是有效值)
console.log(defaultTo({}, { default: true })); // {} (空对象但是有效值)
```

#### 参数

- `value` (`T | null | undefined`): 要检查的值。
- `defaultValue` (`D`): 当值为 `null`、`undefined` 或 `NaN` 时要返回的默认值。

#### 返回值

(`T | D`): 如果值有效则返回原始值，否则返回默认值。
