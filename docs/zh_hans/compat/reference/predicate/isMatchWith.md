# isMatchWith (Lodash 兼容性)

使用自定义比较函数检查对象是否部分匹配。

```typescript
const result = isMatchWith(target, source, customizer);
```

## 用法

### `isMatchWith(target, source, customizer)`

当需要自定义比较逻辑时使用 `isMatchWith`。您可以直接控制每个属性的比较。

```typescript
import { isMatchWith } from 'es-toolkit/compat';

// 不区分大小写的字符串比较
const caseInsensitiveCompare = (objVal, srcVal) => {
  if (typeof objVal === 'string' && typeof srcVal === 'string') {
    return objVal.toLowerCase() === srcVal.toLowerCase();
  }
  return undefined; // 使用默认行为
};

isMatchWith({ name: 'ALICE', age: 25 }, { name: 'alice' }, caseInsensitiveCompare); // true

// 数字范围比较
const rangeCompare = (objVal, srcVal, key) => {
  if (key === 'age' && typeof srcVal === 'object' && srcVal.min !== undefined) {
    return objVal >= srcVal.min && objVal <= srcVal.max;
  }
  return undefined;
};

isMatchWith({ name: 'John', age: 25 }, { age: { min: 18, max: 30 } }, rangeCompare); // true

// 数组长度比较
const lengthCompare = (objVal, srcVal, key) => {
  if (key === 'items' && Array.isArray(objVal) && typeof srcVal === 'number') {
    return objVal.length === srcVal;
  }
  return undefined;
};

isMatchWith({ items: ['a', 'b', 'c'], count: 3 }, { items: 3 }, lengthCompare); // true

// 复杂的条件比较
const conditionalCompare = (objVal, srcVal, key, object, source) => {
  // 仅在特定键上应用特殊逻辑
  if (key === 'status') {
    return srcVal === 'active' || objVal === 'any';
  }

  // 嵌套对象中的特殊处理
  if (typeof srcVal === 'object' && srcVal !== null && objVal?.special) {
    return srcVal.id === objVal.special;
  }

  return undefined; // 默认行为
};

isMatchWith({ user: { special: 123 }, status: 'any' }, { user: { id: 123, status: 'active' } }, conditionalCompare); // true
```

#### 参数

- `target` (`unknown`): 要检查是否匹配的对象。
- `source` (`unknown`): 作为匹配模式的对象。
- `customizer` (`function`, 可选): 自定义比较逻辑的函数。应该返回 `true`、`false` 或 `undefined`。

#### 返回值

(`boolean`): 如果 target 通过自定义逻辑部分匹配 source，则返回 `true`，否则返回 `false`。
