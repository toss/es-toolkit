# inRange

检查值是否在指定范围内。

## 签名

```typescript
export function inRange(value: number, maximum: number): boolean;
export function inRange(value: number, minimum: number, maximum: number): boolean;
```

### 参数

- `value` (`number`): 要检查的值。
- `minimum` (`number`): 范围的下限（包含在内）。
- `maximum` (`number`): 范围的上限（不包含在内）。

### 返回值

(`boolean`): 如果值在指定范围内返回 `true`，否则返回 `false`。

### 抛出异常

如果 `minimum` 大于等于 `maximum`，会抛出错误。

## 示例

```typescript
const result1 = inRange(3, 5); // result1 将为 true。
const result2 = inRange(1, 2, 5); // result2 将为 false。
const result3 = inRange(1, 5, 2); // 如果最小值大于等于最大值，会抛出错误。
```
