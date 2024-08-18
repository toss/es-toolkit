# isUndefined

检查给定的值是否为 `undefined`。

该函数测试提供的值是否严格相等于 `undefined`。

如果值为 `undefined`，则返回 `true`；否则返回 `false`。

在 TypeScript 中，该函数还可以作为类型谓词，将参数的类型缩小为 `undefined`。

## 签名

```typescript
function isUndefined(x: unknown): x is undefined;
```

### 参数

- `x` (`unknown`): 要检查是否为 `undefined` 的值。

### 返回值

(`x is undefined`): 如果值为 `undefined`，则返回 `true`；否则返回 `false`。

## 示例

```typescript
const value1 = undefined;
const value2 = null;
const value3 = 42;

console.log(isUndefined(value1)); // true
console.log(isUndefined(value2)); // false
console.log(isUndefined(value3)); // false
```
