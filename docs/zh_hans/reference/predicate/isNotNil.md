# isNotNil

检查给定的值是否不为 null 或 undefined。

该函数在 TypeScript 中还可以作为类型谓词，确保参数的类型不可为 null。

## 签名

```typescript
function isNotNil<T>(x: T | null | undefined): x is T;
```

### 参数

- `x` (`T | null | undefined`): 要测试的值，检查其是否不为 null 或 undefined。

### 返回值

(`x is T`): 如果值不为 null 或 undefined，则返回 true；否则返回 false。

## 示例

```typescript
// 在这里 `arr` 的类型是 (number | undefined)[]
const arr = [1, undefined, 3];
// `result` 的类型是 number[]
const result = arr.filter(isNotNil);
// result 将会是 [1, 3]
```
