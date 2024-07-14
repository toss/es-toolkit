# sampleSize

返回一个指定大小的数组样本。

该函数接受一个数组和一个数字，并返回一个包含采样元素的数组，采用[Floyd's algorithm](https://www.nowherenearithaca.com/2013/05/robert-floyds-tiny-and-beautiful.html)。

## 签名

```typescript
export function sampleSize<T>(array: T[], size: number): T[];
```

### 参数

- `array` (`T[]`): 要从中采样的数组。
- `size` (`number`): 采样的大小。

### 返回值

(`T[]`): 应用了采样大小的新数组。

### 抛出异常

如果 `size` 大于 `array` 的长度，则抛出错误。

## 示例

```typescript
const result = sampleSize([1, 2, 3], 2);
// 结果将是一个包含数组中两个元素的数组。
// [1, 2] 或者 [1, 3] 或者 [2, 3]
```
