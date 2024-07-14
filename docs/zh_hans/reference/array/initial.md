# initial

返回一个新数组，包含输入数组中除最后一个元素外的所有元素。

对于空数组或长度为1的数组，它返回一个空数组(`[]`)。

## 签名

```typescript
function initial<T>(arr: T[]): T[];
```

### 参数

- `arr` (`T[]`): 要从中返回除最后一个元素外所有元素的数组。

### 返回值

(`T[]`): 一个新数组，包含输入数组中除最后一个元素外的所有元素。对于空数组或长度为1的数组，它返回一个空数组(`[]`)。

## 示例

```typescript
const arr1 = [1, 2, 3];
const result = initial(arr1);
// result 是 [1, 2]

const arr2: number[] = [];
const result = initial(arr2);
// result 是 []

const arr3: number[] = [1];
const result = initial(arr3);
// result 是 []

const largeArray = Array(1000)
.fill(0)
.map((\_, i) => i);
const result = initial(largeArray);
// result 是 [0, 1, 2 ..., 998]

const nestedArray = [
[3, 1],
[3, 2],
[3, 3],
];
const result = initial(nestedArray);
// result 是 [[3, 1], [3, 2]]
```
