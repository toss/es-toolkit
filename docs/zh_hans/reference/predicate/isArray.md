# isArray

检查给定的值是否为数组。

该函数测试提供的值是否为数组。

如果值为数组，则返回 `true`，否则返回 `false`。

在 TypeScript 中，该函数还可以作为类型谓词，将参数的类型缩小为数组。

## 签名

```typescript
function isArray<T>(value: T): value is Extract<T, unknown[] | Readonly<unknown[]>>;
```

### 参数

- `value` (`T`): 检查是否为数组的值。

### 返回值

(`value is Extract<T, unknown[] | Readonly<unknown[]>>`): 如果值为数组，则返回 `true`，否则返回 `false`。

## 示例

```typescript
const value1 = [1, 2, 3];
const value2 = 'abc';
const value3 = () => {};

console.log(isArray(value1)); // true
console.log(isArray(value2)); // false
console.log(isArray(value3)); // false
```
