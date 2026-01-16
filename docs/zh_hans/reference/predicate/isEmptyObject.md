# isEmptyObject

检查是否为没有任何属性的纯对象(`{}`)。

```typescript
const result = isEmptyObject(value);
```

## 用法

### `isEmptyObject(value)`

当您想检查是否为像 `{}` 一样没有任何属性的纯对象时使用 `isEmptyObject`。对于数组、Map、Set 等其他对象类型返回 `false`。

```typescript
import { isEmptyObject } from 'es-toolkit';

// 没有属性的纯对象
isEmptyObject({}); // true
isEmptyObject(new Object()); // true
isEmptyObject(Object.create(null)); // true

// 有属性的对象
isEmptyObject({ a: 1 }); // false
isEmptyObject({ key: 'value' }); // false

// 非纯对象类型
isEmptyObject([]); // false (数组)
isEmptyObject(null); // false
isEmptyObject(new Map()); // false
isEmptyObject(new Set()); // false
```

#### 参数

- `value` (`unknown`): 要检查的值。

#### 返回值

(`value is Record<PropertyKey, never>`): 如果是没有属性的纯对象则返回 `true`，否则返回 `false`。
