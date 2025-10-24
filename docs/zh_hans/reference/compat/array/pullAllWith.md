# pullAllWith (Lodash 兼容性)

使用比较函数从数组中删除指定的值。

```typescript
const modified = pullAllWith(array, valuesToRemove, comparator);
```

## 参考

### `pullAllWith(array, values, comparator)`

使用提供的比较函数从数组中删除指定的值。原始数组会被修改，并返回修改后的数组。

```typescript
import { pullAllWith } from 'es-toolkit/compat';

// 通过对象比较删除
const array = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
  { x: 5, y: 6 },
];
pullAllWith(array, [{ x: 3, y: 4 }], (a, b) => a.x === b.x && a.y === b.y);
console.log(array); // [{ x: 1, y: 2 }, { x: 5, y: 6 }]

// 通过字符串长度比较删除
const words = ['hello', 'world', 'test', 'code'];
pullAllWith(words, ['hi'], (a, b) => a.length === b.length);
console.log(words); // ['hello', 'world', 'code'] ('test' 因与 'hi' 长度相同而被删除)
```

如果数组为空或为 `null`、`undefined`，则按原样返回原始数组。

```typescript
import { pullAllWith } from 'es-toolkit/compat';

pullAllWith([], [1], (a, b) => a === b); // []
pullAllWith(null as any, [1], (a, b) => a === b); // null
```

#### 参数

- `array` (`T[]`): 要修改的数组。
- `values` (`ArrayLike<T>`, 可选): 要删除的值的数组。
- `comparator` (`(a: T, b: T) => boolean`, 可选): 比较两个元素的函数。如果认为两个元素相等，应返回 `true`。

#### 返回值

(`T[]`): 返回删除了指定值的原始数组。
