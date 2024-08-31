# at

从数组中检索指定索引处的元素。

这个函数支持负索引，负索引从数组的末尾开始计算。

## 签名

```typescript
function at<T>(arr: T[], indices: number[]): Array<T | undefined>;
```

### 参数

- `arr` (`T[]`): 要从中检索元素的数组。
- `indices` (`number[]`): 一个指定元素位置的索引数组。

### 返回值

(`Array<T | undefined>`): 一个新数组，包含在指定索引处的元素。

## 示例

```typescript
import { at } from 'es-toolkit/array';

const numbers = [10, 20, 30, 40, 50];
const result = at(numbers, [1, 3, 4]);
console.log(result); // [20, 40, 50]
```

## Performance Comparison

|                   | [Bundle Size](../../bundle-size.md) | [Performance](../../performance.md) |
| ----------------- | ----------------------------------- | ----------------------------------- |
| es-toolkit        | 238 bytes (92.4% smaller)           | 9,338,821 times (11% slower)        |
| es-toolkit/compat | 307 bytes (90.2% smaller)           | 9,892,157 times (5% slower)         |
| lodash-es         | 3,153 bytes                         | 10,523,270 times                    |
