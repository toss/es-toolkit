# sum

计算一个数字数组的总和。

该函数接受一个数字数组，并返回数组中所有元素的总和。

如果数组为空，则该函数返回 `0`。

如果数组包含 `bigint` 值，则该函数返回一个 `bigint` 值。

## 签名

```typescript
function sum(nums: number[]): number;
function sum(nums: bigint[]): bigint;
```

### 参数

- `nums` (`number[] | bigint[]`): 要求和的数字数组。

### 返回值

(`number | bigint`): 数组中所有数字的总和。

## 示例

```typescript
sum([1, 2, 3, 4, 5]); // 15
sum([1n, 2n, 3n, 4n, 5n]); // 15n
sum([]); // 0
```
