# rangeRight

返回一个从 `end` 到 `start` 的数字数组，步长为 `step`。

如果未提供 `step` 参数，则默认为 `1`。注意，`step` 必须是一个非零整数。

## 签名

```typescript
function rangeRight(end: number): number[];
function rangeRight(start: number, end: number): number[];
function rangeRight(start: number, end: number, step: number): number[];
```

### 参数

- `start` (`number`): 数字范围的起始值（包含）。
- `end` (`number`): 数字范围的结束值（不包含）。
- `step` (`number`): 数字范围的步长值（默认为 `1`）。

### 返回值

- (`number[]`): 从 `end` 到 `start` 的数字数组，使用指定的 `step`。

## 示例

```typescript
// 返回 [3, 2, 1, 0]
rangeRight(4);

// 返回 [15, 10, 5, 0]
rangeRight(0, 20, 5);

// 返回 [20, 15, 10, 5, 0]
rangeRight(0, 21, 5);

// 返回 [-3, -2, -1, 0]
rangeRight(0, -4, -1);

// 如果结束值为负数，则返回 []
rangeRight(-4);
rangeRight(0, -4);

// 抛出错误：The step value must be a non-zero integer.
rangeRight(1, 4, 0);
// 如果步长值为负数，则返回 []
rangeRight(1, 4, -1);
```
