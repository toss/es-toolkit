# isEqual (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [isEqual](../../predicate/isEqual.md)
这个 `isEqual` 函数由于 Lodash 兼容性的复杂处理而性能较慢。

建议使用更快、更现代的 `es-toolkit` 的 [isEqual](../../predicate/isEqual.md)。
:::

深度比较两个值是否相等。

```typescript
const result = isEqual(value1, value2);
```

## 参考

### `isEqual(a, b)`

当需要深度比较两个值是否相等时使用 `isEqual`。它会比较复杂类型如 Date、RegExp、对象、数组等的内容。

```typescript
import { isEqual } from 'es-toolkit/compat';

// 基本类型比较
isEqual(1, 1); // true
isEqual('hello', 'hello'); // true
isEqual(true, true); // true

// 对象深度比较
isEqual({ a: 1, b: 2 }, { a: 1, b: 2 }); // true
isEqual({ a: 1, b: 2 }, { b: 2, a: 1 }); // true
isEqual({ a: 1 }, { a: 1, b: undefined }); // false

// 数组深度比较
isEqual([1, 2, 3], [1, 2, 3]); // true
isEqual([1, [2, 3]], [1, [2, 3]]); // true

// Date 对象比较
isEqual(new Date('2020-01-01'), new Date('2020-01-01')); // true
isEqual(new Date('2020-01-01'), new Date('2020-01-02')); // false

// RegExp 对象比较
isEqual(/abc/g, /abc/g); // true
isEqual(/abc/g, /abc/i); // false
```

它也会递归比较嵌套的对象和数组。

```typescript
import { isEqual } from 'es-toolkit/compat';

const obj1 = {
  user: {
    name: 'John',
    details: {
      age: 30,
      hobbies: ['reading', 'gaming'],
    },
  },
};

const obj2 = {
  user: {
    name: 'John',
    details: {
      age: 30,
      hobbies: ['reading', 'gaming'],
    },
  },
};

isEqual(obj1, obj2); // true
```

#### 参数

- `a` (`unknown`): 要比较的第一个值。
- `b` (`unknown`): 要比较的第二个值。

#### 返回值

(`boolean`): 如果两个值相等则返回 `true`，否则返回 `false`。
