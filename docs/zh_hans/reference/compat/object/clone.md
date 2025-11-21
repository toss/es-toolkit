# clone (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `clone`

这个 `clone` 函数由于处理特殊对象类型的复杂逻辑而相对较慢。

请改用 `es-toolkit` 的更快、更现代的 [clone](../../object/clone.md)。

:::

创建对象的浅拷贝。

```typescript
const cloned = clone(value);
```

## 用法

### `clone(value)`

当您想要创建值的浅拷贝时,请使用 `clone`。它可以复制各种类型的对象和原始值。

```typescript
import { clone } from 'es-toolkit/compat';

// 复制原始值
const num = 42;
const clonedNum = clone(num);
// Returns: 42 (相同的值)

// 复制数组
const arr = [1, 2, 3];
const clonedArr = clone(arr);
// Returns: [1, 2, 3] (新的数组实例)

// 复制对象
const obj = { a: 1, b: 'hello' };
const clonedObj = clone(obj);
// Returns: { a: 1, b: 'hello' } (新的对象实例)

// 复制Date对象
const date = new Date('2023-01-01');
const clonedDate = clone(date);
// Returns: new Date('2023-01-01') (新的Date实例)

// 复制正则表达式
const regex = /hello/gi;
regex.lastIndex = 3;
const clonedRegex = clone(regex);
// Returns: /hello/gi with lastIndex = 3

// 复制Map
const map = new Map([
  ['a', 1],
  ['b', 2],
]);
const clonedMap = clone(map);
// Returns: new Map([['a', 1], ['b', 2]])

// 复制Set
const set = new Set([1, 2, 3]);
const clonedSet = clone(set);
// Returns: new Set([1, 2, 3])
```

嵌套对象仅进行浅拷贝。

```typescript
import { clone } from 'es-toolkit/compat';

const nested = {
  a: 1,
  b: {
    c: 2,
  },
};
const clonedNested = clone(nested);

console.log(clonedNested !== nested); // true (不同的对象)
console.log(clonedNested.b === nested.b); // true (嵌套对象具有相同的引用)
```

#### 参数

- `value` (`T`): 要复制的值。

#### 返回值

(`T`): 返回复制的值。
