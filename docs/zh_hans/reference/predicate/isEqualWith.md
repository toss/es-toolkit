# isEqualWith

使用自定义比较函数检查两个值是否相等。

```typescript
const result = isEqualWith(a, b, areValuesEqual);
```

## 参考

### `isEqualWith(a, b, areValuesEqual)`

当需要特殊比较逻辑时，请使用 `isEqualWith`。如果自定义函数返回 `true` 或 `false`，则使用该结果；如果返回 `undefined`，则使用默认比较方式。对于忽略大小写、排除特定属性、近似值比较等场景很有用。

```typescript
import { isEqualWith } from 'es-toolkit/predicate';

// 不区分大小写的字符串比较
const caseInsensitiveCompare = (a, b) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }
};

isEqualWith('Hello', 'hello', caseInsensitiveCompare); // true
isEqualWith({ name: 'Alice' }, { name: 'ALICE' }, caseInsensitiveCompare); // true
```

也可以用于数字的近似值比较。

```typescript
import { isEqualWith } from 'es-toolkit/predicate';

// 允许浮点数误差的比较
const approximateCompare = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a - b) < 0.01; // 将 0.01 以下的差异视为相等
  }
};

isEqualWith(0.1 + 0.2, 0.3, approximateCompare); // true
isEqualWith({ price: 10.01 }, { price: 10.02 }, approximateCompare); // true
```

在想要忽略特定属性进行比较时也很有用。

```typescript
import { isEqualWith } from 'es-toolkit/predicate';

// 忽略特定属性的比较
const ignoreTimestamp = (a, b, property) => {
  if (property === 'timestamp') {
    return true; // 将 timestamp 属性始终视为相等
  }
};

const obj1 = { id: 1, name: 'Test', timestamp: 1000 };
const obj2 = { id: 1, name: 'Test', timestamp: 2000 };
isEqualWith(obj1, obj2, ignoreTimestamp); // true
```

也可以实现复杂的自定义比较逻辑。

```typescript
import { isEqualWith } from 'es-toolkit/predicate';

const areValuesEqual = (a, b, property) => {
  // 忽略 ID
  if (property === 'id') {
    return true;
  }

  // 不区分大小写比较名称
  if (property === 'name' && typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }

  // 对其余使用默认比较方式
  return undefined;
};

const user1 = { id: 1, name: 'Alice', age: 25 };
const user2 = { id: 999, name: 'ALICE', age: 25 };
isEqualWith(user1, user2, areValuesEqual); // true
```

#### 参数

- `a` (`unknown`): 要比较的第一个值。
- `b` (`unknown`): 要比较的第二个值。
- `areValuesEqual` (`(x: any, y: any, property?: PropertyKey, xParent?: any, yParent?: any, stack?: Map<any, any>) => boolean | void`): 自定义比较函数。如果返回 `true` 或 `false`，则使用该结果；如果返回 `undefined`，则使用默认比较方式。

#### 返回值

(`boolean`): 根据自定义标准，如果两个值相等则返回 `true`，否则返回 `false`。
