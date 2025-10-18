# includes (Lodash 兼容性)

::: warning 请使用 `Array.prototype.includes`

此 `includes` 函数由于对象迭代和 SameValueZero 比较处理而运行缓慢。对于数组，JavaScript 的原生 `Array.prototype.includes` 方法更快且更标准化。

请使用更快、更现代的 `Array.prototype.includes`。

:::

检查数组、对象或字符串中是否包含特定值。

```typescript
const hasValue = includes(collection, target, fromIndex);
```

## 参考

### `includes(collection, target, fromIndex)`

当您想检查数组、对象或字符串中是否存在特定值时，请使用 `includes`。它使用 SameValueZero 方式比较值。

```typescript
import { includes } from 'es-toolkit/compat';

// 在数组中查找值
includes([1, 2, 3], 2);
// Returns: true

// 在对象的值中查找
includes({ a: 1, b: 'a', c: NaN }, 'a');
// Returns: true

// 在字符串中查找子字符串
includes('hello world', 'world');
// Returns: true
```

可以从特定索引开始搜索。

```typescript
import { includes } from 'es-toolkit/compat';

// 从索引 2 开始搜索
includes([1, 2, 3, 2], 2, 2);
// Returns: true (在索引 3 处找到)

// 负索引从末尾计算
includes([1, 2, 3], 2, -2);
// Returns: true
```

`null` 或 `undefined` 始终返回 `false`。

```typescript
import { includes } from 'es-toolkit/compat';

includes(null, 1); // false
includes(undefined, 1); // false
```

也可以在字符串中搜索子字符串。

```typescript
import { includes } from 'es-toolkit/compat';

// 从头开始搜索
includes('hello', 'e');
// Returns: true

// 从特定位置搜索
includes('hello', 'e', 2);
// Returns: false (索引 2 之后没有 'e')
```

可以正确找到 `NaN` 值。

```typescript
import { includes } from 'es-toolkit/compat';

includes([1, 2, NaN], NaN);
// Returns: true

includes({ a: 1, b: NaN }, NaN);
// Returns: true
```

#### 参数

- `collection` (`Array | Record<string, any> | string | null | undefined`): 要搜索的数组、对象或字符串。
- `target` (`any`): 要查找的值。
- `fromIndex` (`number`, 选择): 开始搜索的索引。负值从末尾计算。默认值为 `0`。

#### 返回值

(`boolean`): 如果值存在则返回 `true`，否则返回 `false`。
