# maxBy

根据转换函数返回的值,返回数组中具有最大值的元素。

```typescript
const max = maxBy(items, getValue);
```

## 参考

### `maxBy(items, getValue)`

当您想用转换函数将数组元素转换为数值,并找到具有最大值的原始元素时,请使用 `maxBy`。对于空数组返回 `undefined`。

```typescript
import { maxBy } from 'es-toolkit/array';

// 从对象数组中找到特定属性具有最大值的元素
const people = [
  { name: 'john', age: 30 },
  { name: 'jane', age: 28 },
  { name: 'joe', age: 26 },
];
maxBy(people, person => person.age);
// Returns: { name: 'john', age: 30 }

// 从数字数组中找到绝对值最大的元素
const numbers = [-10, -5, 0, 5, 15];
maxBy(numbers, x => Math.abs(x));
// Returns: 15
```

对于空数组返回 `undefined`。

```typescript
import { maxBy } from 'es-toolkit/array';

maxBy([], x => x.value); // undefined
```

#### 参数

- `items` (`T[]`): 要查找具有最大值的元素的数组。
- `getValue` (`(element: T) => number`): 将每个元素转换为数字的函数。

#### 返回值

(`T | undefined`): 转换函数返回的值中具有最大值的元素。如果数组为空,则返回 `undefined`。
