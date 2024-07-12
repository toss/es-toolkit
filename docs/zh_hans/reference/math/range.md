# range

返回一个从 `start` 到 `end` 的数字数组，步长为 `step`。

如果未提供 `step` 参数，则默认为 `1`。注意，`step` 必须是一个非零整数。

## 签名

```typescript
function range(end: number): number[];
function range(start: number, end: number): number[];
function range(start: number, end: number, step: number): number[];
```

### 参数

- `start` (`number`): 数字范围的起始值（包含）。
- `end` (`number`): 数字范围的结束值（不包含）。
- `step` (`number`): 数字范围的步长值（默认为 `1`）。

### 返回值

- (`number[]`): 从 `start` 到 `end` 的数字数组，使用指定的 `step`。

## 示例

```typescript
// 返回 [0, 1, 2, 3]
range(4);

// 返回 [0, 5, 10, 15]
range(0, 20, 5);

// 返回 [0, 5, 10, 15, 20]
range(0, 21, 5);

// 返回 [0, -1, -2, -3]
range(0, -4, -1);

// 抛出错误：步长值必须是非零整数。
range(1, 4, 0);
```
