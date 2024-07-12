# without

创建一个数组，其中排除了所有指定的值。

它正确地排除了 `NaN`，因为它使用 [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero) 进行值比较。

## 签名

```typescript
function without<T>(array: T[], ...values: T[]): T[];
```

### 参数

- `array` (`T[]`): 要排除值的数组。
- `values` (`...T[]`): 要排除的值。

### 返回值

(`T[]`) 不包含指定值的新数组。

## 示例

```typescript
import { without } from 'es-toolkit/array';

// 从数组中移除指定的值
without([1, 2, 3, 4, 5], 2, 4);
// 返回: [1, 3, 5]

// 从数组中移除指定的字符串值
without(['a', 'b', 'c', 'a'], 'a');
// 返回: ['b', 'c']

// 处理没有任何指定值在数组中的情况
without([1, 2, 3], 4, 5);
// 返回: [1, 2, 3]

// 处理包含不同类型值的情况
without([1, '2', 3, '4'], 2, '4');
// 返回: [1, '2', 3]
```
