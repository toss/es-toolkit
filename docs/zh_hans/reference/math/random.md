# random

生成指定范围内的随机数。该数可以是整数或小数。

如果只提供一个参数，则返回在 `0` 到给定数之间的随机数。

## 签名

```typescript
function random(maximum: number): number;
function random(minimum: number, maximum: number): number;
```

### 参数

- `minimum` (`number`): 随机数的下限（包含）。
- `maximum` (`number`): 随机数的上限（不包含）。

### 返回值

- (`number`): 指定范围内的随机数。该数可以是整数或小数。

## 示例

```typescript
const result1 = random(0, 5); // 返回一个在 0 到 5 之间的随机数。
const result2 = random(5, 0); // 如果最小值大于最大值，则会抛出错误。
const result3 = random(5, 5); // 如果最小值等于最大值，则会抛出错误。
```
