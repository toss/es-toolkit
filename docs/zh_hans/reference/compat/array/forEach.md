# forEach (Lodash 兼容性)

::: warning 请使用 `Array.prototype.forEach()`

此 `forEach` 函数由于复杂的对象处理、提前终止逻辑等原因运行缓慢。

请使用更快、更现代的 `Array.prototype.forEach()`。

:::

对数组或对象的每个元素执行函数。

```typescript
forEach(collection, callback);
```

## 参考

### `forEach(collection, callback)`

当您想遍历数组或对象的所有元素并对每个元素执行回调函数时，请使用 `forEach`。如果回调返回 `false`，则停止遍历。

```typescript
import { forEach } from 'es-toolkit/compat';

// 遍历数组
const numbers = [1, 2, 3, 4, 5];
const results: number[] = [];

forEach(numbers, value => {
  results.push(value * 2);
});
// results 为 [2, 4, 6, 8, 10]

// 提前终止
const numbers2 = [1, 2, 3, 4, 5];
const results2: number[] = [];

forEach(numbers2, value => {
  if (value > 3) {
    return false; // 停止遍历
  }
  results2.push(value);
});
// results2 为 [1, 2, 3]
```

对象的工作方式相同。

```typescript
import { forEach } from 'es-toolkit/compat';

const obj = { a: 1, b: 2, c: 3 };
const keys: string[] = [];
const values: number[] = [];

forEach(obj, (value, key) => {
  keys.push(key);
  values.push(value);
});
// keys 为 ['a', 'b', 'c']
// values 为 [1, 2, 3]
```

`null` 或 `undefined` 被视为空集合。

```typescript
import { forEach } from 'es-toolkit/compat';

forEach(null, value => {
  console.log(value); // 不会执行
});

forEach(undefined, value => {
  console.log(value); // 不会执行
});
```

#### 参数

- `collection` (`ArrayLike<T> | Record<string, unknown> | null | undefined`): 要遍历的数组或对象。
- `callback` (`(value: T, index: number | string, collection: any) => void | false`): 对每个元素执行的函数。返回 `false` 以停止遍历。

#### 返回值

(`T`): 返回遍历的原始集合。
