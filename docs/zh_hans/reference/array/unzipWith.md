# unzipWith

解开绑定在一起的数组,并应用转换函数,返回一个新数组。

```typescript
const transformedArray = unzipWith(target, iteratee);
```

## 参考

### `unzipWith(target, iteratee)`

当您想从绑定在一起的二维数组中收集相同位置的元素并应用转换函数获得结果时,请使用 `unzipWith`。它与 `unzip` 类似,但可以用自定义函数转换每组元素。

```typescript
import { unzipWith } from 'es-toolkit/array';

// 将相同位置的数字相加。
const numbers = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const sums = unzipWith(numbers, (a, b, c) => a + b + c);
console.log(sums); // [9, 12] (1+3+5=9, 2+4+6=12)

// 将相同位置的字符串连接起来。
const words = [
  ['hello', 'world'],
  ['foo', 'bar'],
  ['es', 'toolkit'],
];
const combined = unzipWith(words, (a, b, c) => a + b + c);
console.log(combined); // ['hellofoes', 'worldbartoolkit']

// 计算对象数组中特定属性的平均值。
const scores = [
  [{ score: 80 }, { score: 90 }],
  [{ score: 85 }, { score: 95 }],
  [{ score: 75 }, { score: 88 }],
];
const averages = unzipWith(scores, (a, b, c) => (a.score + b.score + c.score) / 3);
console.log(averages); // [80, 91] (80+85+75)/3, (90+95+88)/3
```

如果数组长度不同,会传递 undefined。

```typescript
import { unzipWith } from 'es-toolkit/array';

const mixed = [
  [1, 4],
  [2, 5],
  [3], // 长度不同
];
const result = unzipWith(mixed, (a, b, c) => {
  // c可能为undefined
  return (a || 0) + (b || 0) + (c || 0);
});
console.log(result); // [6, 9] (1+2+3, 4+5+0)
```

传入空数组返回空数组。

```typescript
import { unzipWith } from 'es-toolkit/array';

const empty = unzipWith([], (a, b) => a + b);
console.log(empty); // []
```

#### 参数

- `target` (`readonly T[][]`): 要解开和转换的绑定在一起的二维数组。
- `iteratee` (`(...args: T[]) => R`): 接收相同位置的元素并转换为新值的函数。

#### 返回值

(`R[]`): 应用转换函数后生成的新数组。
