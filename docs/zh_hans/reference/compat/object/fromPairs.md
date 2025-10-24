# fromPairs (Lodash 兼容性)

::: warning 请使用 `Object.fromEntries`

由于需要检查类数组对象和迭代处理，这个 `fromPairs` 函数运行较慢。

请使用更快、更现代的 `Object.fromEntries` 代替。

:::

将键值对数组转换为对象。

```typescript
const result = fromPairs(pairs);
```

## 参考

### `fromPairs(pairs)`

接收一个由键值对组成的数组，并将其转换为对象。每个键值对必须是包含 2 个元素的数组。第一个元素成为键，第二个元素成为值。在整理或转换数据时非常有用。

```typescript
import { fromPairs } from 'es-toolkit/compat';

// 基本键值对转换
const pairs = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];
const result = fromPairs(pairs);
// 结果: { a: 1, b: 2, c: 3 }

// 处理各种值类型
const mixedPairs = [
  ['name', 'John'],
  ['age', 30],
  ['active', true],
];
const user = fromPairs(mixedPairs);
// 结果: { name: 'John', age: 30, active: true }
```

`null`、`undefined` 或不是类数组对象的值将被处理为空对象。

```typescript
import { fromPairs } from 'es-toolkit/compat';

fromPairs(null); // {}
fromPairs(undefined); // {}
fromPairs('invalid'); // {}
```

#### 参数

- `pairs` (`ArrayLike<[PropertyName, T]> | ArrayLike<any[]> | null | undefined`): 要转换为对象的键值对数组。

#### 返回值

(`Record<string, any> | Record<string, T>`): 返回从键值对创建的对象。
