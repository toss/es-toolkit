# partition

根据谓词函数将数组分割为两组。

该函数接受一个数组和一个谓词函数作为参数。它返回一个包含两个数组的元组：

第一个数组包含谓词函数返回 `true` 的元素，

第二个数组包含谓词函数返回 `false` 的元素。

## 签名

```typescript
function partition<T>(arr: T[], isInTruthy: (value: T) => boolean): [truthy: T[], falsy: T[]];
```

### 参数

- `arr` (`T[]`): 要分组的数组。
- `isInTruthy` (`(value: T) => boolean`): 判断元素应该放入真值数组的谓词函数。该函数将对数组的每个元素进行调用。

### 返回值

(`[T[], T[]]`): 包含两个数组的元组：第一个数组包含谓词函数返回 `true` 的元素，第二个数组包含谓词函数返回 `false` 的元素。

## 示例

```typescript
const array = [1, 2, 3, 4, 5];
const isEven = x => x % 2 === 0;
const [even, odd] = partition(array, isEven);
// even 将会是 [2, 4] 而 odd 将会是 [1, 3, 5]
```
