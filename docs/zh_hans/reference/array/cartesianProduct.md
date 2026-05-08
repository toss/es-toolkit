# cartesianProduct

计算多个数组的[笛卡尔积](https://en.wikipedia.org/wiki/Cartesian_product)。

```typescript
const tuples = cartesianProduct(arr1, arr2);
```

## 用法

### `cartesianProduct(...arrs)`

当您需要从每个输入数组中各取一个元素的所有可能组合时,请使用 `cartesianProduct`。

从最右侧的数组按顺序选择下一个元素进行迭代。当遍历完最右侧数组的所有元素后,选择左侧一格数组的下一个元素,然后右侧数组从头开始重新遍历。这个过程会对所有数组从右到左依次进行。

```typescript
import { cartesianProduct } from 'es-toolkit/array';

// 把每个数字和每个字母配对。
cartesianProduct([1, 2], ['a', 'b']);
// 返回: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

// 生成所有 3 位二进制元组。
cartesianProduct([0, 1], [0, 1], [0, 1]);
// 返回: [[0,0,0], [0,0,1], [0,1,0], [0,1,1], [1,0,0], [1,0,1], [1,1,0], [1,1,1]]
```

如果任何一个输入数组为空,结果就是空数组。没有传入参数时,结果是只含一个空元组的数组。

```typescript
import { cartesianProduct } from 'es-toolkit/array';

cartesianProduct([1, 2, 3], []); // []
cartesianProduct(); // [[]]
```

#### 参数

- `arrs` (`Array<readonly T[]>`): 要计算笛卡尔积的数组。

#### 返回值

(`T[][]`): 由笛卡尔积构成的元组数组。

## 试一试

::: sandpack

```ts index.ts
import { cartesianProduct } from 'es-toolkit/array';

console.log(cartesianProduct([1, 2], ['a', 'b']));
```

:::
