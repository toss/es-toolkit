# isDate

检查 `value` 是否是 Date 对象。

## 签名

```typescript
function isDate(value: unknown): value is Date;
```

### 参数

- `value` (`unknown`): 要检查的值。

### 返回值

(`value is Date`): 如果 `value` 是 Date 对象，则返回 `true`，否则返回 `false`。

## 示例

```typescript
const value1 = new Date();
const value2 = '2024-01-01';

console.log(isDate(value1)); // true
console.log(isDate(value2)); // false
```
