# pullAt

从数组中删除指定索引处的元素，并返回被删除的元素。

这个函数支持负索引，负索引从数组的末尾开始计算。

## 签名

```typescript
function pullAt<T>(arr: T[], indicesToRemove: number[]): Array<T | undefined>;
```

### 参数

- `arr` (`T[]`): 要从中删除元素的原始数组。
- `indicesToRemove` (`number[]`): 指定要删除元素位置的索引数组。

### 返回值

(`Array<T | undefined>`): 包含从原始数组中删除的元素的新数组。

## 示例

```typescript
import { pullAt } from 'es-toolkit/array';

const numbers = [10, 20, 30, 40, 50];
const removed = pullAt(numbers, [1, 3, 4]);
console.log(removed); // [20, 40, 50]
console.log(numbers); // [10, 30]
```
