# difference

返回一个新数组,包含第一个数组中排除第二个数组元素后的结果。

```typescript
const result = difference(firstArr, secondArr);
```

## 用法

### `difference(firstArr, secondArr)`

当您想求两个数组的差集时,请使用 `difference`。返回一个新数组,包含只在第一个数组中存在而第二个数组中不存在的元素。

该函数现在提供增强的 TypeScript 类型推断 ——
当第二个数组包含字面量或具体值时,
返回类型会在保持向后兼容的同时自动缩小为 `Exclude<T, U>`。

```typescript
import { difference } from 'es-toolkit/array';

// 求数字数组的差集。
const array1 = [1, 2, 3, 4, 5];
const array2 = [2, 4];
difference(array1, array2);
// 返回: [1, 3, 5]
// 类型: (1 | 3 | 5)[]
// 2 和 4 在两个数组中都存在,所以被排除。

// 求字符串数组的差集。
const colors1 = ['red', 'blue', 'green'];
const colors2 = ['blue', 'yellow'];
difference(colors1, colors2);
// 返回: ['red', 'green']
// 类型: ('red' | 'green')[]
```

与空数组的差集等于原数组。

```typescript
import { difference } from 'es-toolkit/array';

difference([1, 2, 3], []); // [1, 2, 3]
difference([], [1, 2, 3]); // []
```

#### 参数

- `firstArr` (`readonly T[]`): 作为差集基准的数组。
- `secondArr` (`readonly U[]`): 包含要从第一个数组中排除的元素的数组。当第二个数组使用字面量值时,返回类型会自动缩小为 `Exclude<T, U>[]`。

#### 返回值

(`Exclude<T, U>[]`): 包含只在第一个数组中存在而第二个数组中不存在的元素的新数组。
如果第二个数组类型较宽,返回类型会回退为 `T[]`。

## 性能对比

|            | [Bundle Size](../../bundle-size.md) | [Performance](../../performance.md) |
| ---------- | ----------------------------------- | ----------------------------------- |
| es-toolkit | 90 字节 (小 92.4%)                  | 9,317,227 次 (快 85%)               |
| lodash-es  | 7,958 字节                          | 5,030,861 次                        |
