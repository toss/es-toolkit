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
