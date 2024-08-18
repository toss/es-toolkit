# toFilled

创建一个新数组，从指定的起始位置到结束位置（不包括结束位置），填充指定的值。

如果未提供起始或结束索引，则默认填充整个数组。

还可以使用负索引，此时索引从数组末尾开始计数。

## 签名

```typescript
function toFilled<T, U>(arr: T[], value: U): Array<T | U>;
function toFilled<T, U>(arr: T[], value: U, start: number): Array<T | U>;
function toFilled<T, U>(arr: T[], value: U, start: number, end: number): Array<T | U>;
```

### 参数

- `arr` (`Array<T>`): 基于其创建新数组的原始数组。
- `value` (`U`): 要用来填充新数组的值。
- `start` (`number, 默认值 = 0`): 起始位置。默认为 0。
- `end` (`number, 默认值 = array.length`): 结束位置。默认为数组的长度。

### Return Value

(`Array<T | U>`): 包含指定值填充的新数组。

### 示例

```typescript
const array = [1, 2, 3, 4, 5];

let result = toFilled(array, '*', 2);
console.log(result); // [1, 2, '*', '*', '*']
console.log(array); // [1, 2, 3, 4, 5]

result = toFilled(array, '*', 1, 4);
console.log(result); // [1, '*', '*', '*', 5]
console.log(array); // [1, 2, 3, 4, 5]

result = toFilled(array, '*');
console.log(result); // ['*', '*', '*', '*', '*']
console.log(array); // [1, 2, 3, 4, 5]

result = toFilled(array, '*', -4, -1);
console.log(result); // [1, '*', '*', '*', 5]
console.log(array); // [1, 2, 3, 4, 5]
```
