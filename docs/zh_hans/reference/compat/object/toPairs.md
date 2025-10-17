# toPairs (Lodash 兼容性)

::: warning 请使用 `Object.entries`

此 `toPairs` 函数由于处理 `Map` 和 `Set`、数组类对象处理等复杂逻辑而运行缓慢。

请使用更快、更现代的 `Object.entries()`。

:::

将对象转换为键值对数组。

```typescript
const pairs = toPairs(object);
```

## 参考

### `toPairs(object)`

当您想将对象自身的可枚举属性转换为 `[键, 值]` 形式的数组时,请使用 `toPairs`。不包括继承的属性。

```typescript
import { toPairs } from 'es-toolkit/compat';

// 基本对象转换
const object = { a: 1, b: 2, c: 3 };
toPairs(object);
// => [['a', 1], ['b', 2], ['c', 3]]

// 具有数字键的对象
const numbers = { 0: 'zero', 1: 'one', 2: 'two' };
toPairs(numbers);
// => [['0', 'zero'], ['1', 'one'], ['2', 'two']]
```

也可以处理 `Map` 和 `Set`。

```typescript
import { toPairs } from 'es-toolkit/compat';

// Map 对象转换
const map = new Map();
map.set('name', 'John');
map.set('age', 30);
toPairs(map);
// => [['name', 'John'], ['age', 30]]

// Set 对象转换(值与键相同)
const set = new Set([1, 2, 3]);
toPairs(set);
// => [[1, 1], [2, 2], [3, 3]]
```

安全处理 `null` 或 `undefined`。

```typescript
import { toPairs } from 'es-toolkit/compat';

toPairs(null);
// => []

toPairs(undefined);
// => []
```

#### 参数

- `object` (`object`): 要转换的对象、Map 或 Set。

#### 返回值

(`Array<[string, any]>`): 返回键值对数组。
