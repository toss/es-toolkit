# fill

填充数组中从起始位置到结束位置（不包括结束位置）的元素为指定值。

该函数会修改原始数组，并用提供的值替换从指定的起始索引到结束索引（不包括结束索引）的元素。如果未提供起始或结束索引，则默认填充整个数组。

还可以使用负索引，此时索引从数组末尾开始计数。

## 签名

```typescript
function fill<T>(array: unknown[], value: T): T[];
function fill<T, U>(array: T[], value: T, start: number): Array<T | U>;
function fill<T, U>(array: T[], value: T, start: number, end: number): Array<T | U>;
```

### 参数

- `array` (`Array<T | U>`): 要填充的数组。
- `value` (`U`): 用来填充数组的值。
- `start` (`number`, 默认值为 0): 起始位置。默认为 0。
- `end` (`number`, 默认值为 array.length): 结束位置。默认为数组的长度。

### 返回值

(`Array<T | U>`): 填充后的数组。

## 示例

```typescript
const array1 = [1, 2, 3];
const result1 = fill(array1, 'a');
// result1 => ['a', 'a', 'a']

const array2 = Array(3);
const result2 = fill(array2, 2);
// result2 => [2, 2, 2]

const array3 = [4, 6, 8, 10];
const result3 = fill(array3, '*', 1, 3);
// result3 => [4, '*', '*', 10]

const array4 = [1, 2, 3];
const result4 = fill(array4, '*', -2, -1);
// result4 => [1, '*', 3]
```
