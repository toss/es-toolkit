# pullAt

在原位置反转数组的元素。

此函数在原位置反转数组的元素，直接修改原数组。如果输入为 null 或 undefined，则返回该输入值。

## 签名

```typescript
function reverse<T>(array: T[] | null | undefined): T[] | null | undefined;
```

### 参数

- - `array` (`T[] | null | undefined`): 要反转的数组

### 返回值

(`T[] | null | undefined`): 反转后的数组；如果输入为 null 或 undefined，则返回该输入值。

## 示例

```typescript
const array = [1, 2, 3, 4, 5];
const reversedArray = reverse(array);
console.log(reversedArray); // [5, 4, 3, 2, 1]
console.log(array); // [5, 4, 3, 2, 1] （原数组已被修改）

const emptyArray = reverse([]);
console.log(emptyArray); // []

const nullArray = reverse(null);
console.log(nullArray); // null
```
