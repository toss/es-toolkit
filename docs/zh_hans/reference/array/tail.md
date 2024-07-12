# tail

返回一个新数组，其中除了第一个元素外，包含所有元素。

该函数接受一个数组作为参数，并返回一个新数组，该数组包含除第一个元素外的所有元素。

如果输入数组为空或只有一个元素，则返回一个空数组。

## 签名

```typescript
function tail<T>(arr: [T]): [];
function tail(arr: []): [];
function tail<T, U>(arr: [T, ...U[]]): U[];
function tail<T>(arr: T[]): T[];
```

### 参数

- `arr` (`T[]`): 要获取尾部的数组。

### 返回值

(`T[]`): 一个新数组，包含除输入数组第一个元素外的所有元素。

## 示例

```typescript
const arr1 = [1, 2, 3];
const result = tail(arr1);
// result 将会是 [2, 3]

const arr2 = [1];
const result2 = tail(arr2);
// result2 将会是 []

const arr3 = [];
const result3 = tail(arr3);
// result3 将会是 []
```
