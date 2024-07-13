# head

返回数组的第一个元素。

该函数接受一个数组，并返回数组的第一个元素。如果数组为空，则函数返回 `undefined`。

## 签名

```typescript
export function head<T>(arr: readonly [T, ...T[]]): T;
export function head<T>(arr: readonly T[]): T | undefined;
```

### 参数

- `arr` (`T[]`): 要获取第一个元素的数组。

### 返回值

(`T | undefined`): 数组的第一个元素，如果数组为空则返回 `undefined`。

## 示例

```typescript
const arr1 = [1, 2, 3];
const firstElement1 = head(arr1);
// firstElement1 将是 1

const arr2: string[] = [];
const firstElement2 = head(arr2);
// firstElement2 将是 undefined

const arr3 = ['a', 'b', 'c'];
const firstElement3 = head(arr3);
// firstElement3 将是 'a'

const arr4 = [true, false, true];
const firstElement4 = head(arr4);
// firstElement4 将是 true

const arr5: [number, string, boolean] = [1, 'a', true];
const firstElement5 = head(arr5);
// firstElement5 将是 1
```
