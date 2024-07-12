# clamp

将一个数字限制在指定的包含边界内。

该函数接受一个数字和两个边界，并返回将数字限制在指定边界内的结果。

如果只提供一个边界，则返回值与该边界和值的最小值相同。

## 签名

```typescript
function clamp(value: number, maximum: number): number;
function clamp(value: number, minimum: number, maximum: number): number;
```

### 参数

- `value` (`number`): 要限制的数字。
- `minimum` (`number`): 限制的最小边界。
- `maximum` (`number`): 限制的最大边界。

### 返回值

(`number`): 在指定边界内的限制后的数字。

## 示例

```typescript
const result1 = clamp(10, 5); // result1 将为 5，因为 10 被限制在边界 5 上
const result2 = clamp(10, 5, 15); // result2 将为 10，因为它在边界 5 和 15 内
const result3 = clamp(2, 5, 15); // result3 将为 5，因为 2 被限制在较低边界 5 上
const result4 = clamp(20, 5, 15); // result4 将为 15，因为 20 被限制在较高边界 15 上
```
