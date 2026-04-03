# chain

将多个可迭代对象按顺序合并为一个可迭代对象。

```typescript
const iterable = chain(iterable1, iterable2, iterable3);
```

## 使用方法

### `chain(...iterables)`

当你想按顺序遍历多个可迭代对象时，请使用 `chain`。与 `[...arr1, ...arr2]` 不同，它不会在内存中创建新数组，在实际遍历之前不会消费各个可迭代对象。

```typescript
import { chain } from 'es-toolkit/iterator';

// 按顺序合并多个数组。
const result = chain([1, 2, 3], [4, 5, 6]);
console.log([...result]); // [1, 2, 3, 4, 5, 6]

// 不仅支持数组，支持所有可迭代对象。
const result = chain(new Set([1, 2]), new Map([[3, 'a']]).keys());
console.log([...result]); // [1, 2, 3]
```

空的可迭代对象会被跳过。

```typescript
import { chain } from 'es-toolkit/iterator';

const result = chain([], [1, 2], []);
console.log([...result]); // [1, 2]
```

#### 参数

- `iterables` (`...Iterable<T>[]`): 要合并的可迭代对象。

#### 返回值

(`IterableIterator<T>`): 按顺序 yield 各可迭代对象元素的惰性求值迭代器。