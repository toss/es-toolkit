# sumBy（Lodash 兼容性）

::: warning 请使用 es-toolkit 的 [sumBy](../../math/sumBy.md)

这个 `sumBy` 函数由于 iteratee 函数处理和类型转换而运行缓慢。

请使用更快更现代的 `es-toolkit` 的 [sumBy](../../math/sumBy.md)。

:::

将满足条件的值相加。

```typescript
const total = sumBy(array, iteratee);
```

## 参考

### `sumBy(array, iteratee)`

对数组的每个元素应用函数后将结果相加。

```typescript
import { sumBy } from 'es-toolkit/compat';

// 数字数组
sumBy([1, 2, 3], value => value);
// Returns: 6

sumBy([1.5, 2.5, 3.5], value => Math.floor(value));
// Returns: 6 (1 + 2 + 3)

// 空数组
sumBy([], value => value);
// Returns: 0
```

### `sumBy(array)`

不提供函数时直接将数组值相加。

```typescript
import { sumBy } from 'es-toolkit/compat';

sumBy([1, 2, 3]);
// Returns: 6

sumBy([1n, 2n, 3n]);
// Returns: 6n
```

将对象数组中的特定属性相加。

```typescript
import { sumBy } from 'es-toolkit/compat';

const people = [
  { name: '홍길동', age: 25 },
  { name: '김철수', age: 30 },
  { name: '이영희', age: 35 },
];

sumBy(people, person => person.age);
// Returns: 90

// 也可以使用属性名
sumBy(people, 'age');
// Returns: 90
```

字符串也会被连接。

```typescript
import { sumBy } from 'es-toolkit/compat';

const items = [{ a: '1' }, { a: '2' }];
sumBy(items, obj => obj.a);
// Returns: '12'
```

无效值会被忽略。

```typescript
import { sumBy } from 'es-toolkit/compat';

sumBy([1, undefined, 2], value => value);
// Returns: 3 (忽略 undefined)

sumBy(null);
// Returns: 0

sumBy(undefined);
// Returns: 0
```

#### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要处理的数组。
- `iteratee` (`((value: T) => number) | string`, 可选): 应用于每个元素的函数或属性名。

#### 返回值

(`number`): 返回满足条件的值的总和。
