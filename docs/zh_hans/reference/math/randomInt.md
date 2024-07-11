# randomInt

生成指定范围内的随机整数。

如果只提供一个参数，则返回一个在 `0` 到给定数之间的随机整数。

## 签名

```typescript
function randomInt(maximum: number): number;
function randomInt(minimum: number, maximum: number): number;
```

### 参数

- `minimum` (`number`): 随机整数的下限（包含）。
- `maximum` (`number`): 随机整数的上限（不包含）。

### 返回值

- (`number`): A random integer within the specified range.

## 示例

```typescript
const result1 = randomInt(0, 5); // 返回一个在 0 到 5 之间的随机整数。
const result2 = randomInt(5, 0); // 如果最小值大于最大值，则会抛出错误。
const result3 = randomInt(5, 5); // 如果最小值等于最大值，则会抛出错误。
```
