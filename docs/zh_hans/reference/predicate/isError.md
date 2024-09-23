# isError

检查 `value` 是否是 Error 对象。

此函数还可以作为 TypeScript 中的类型谓词，将参数的类型缩小为 `Error`。

## 签名

```typescript
function isError(value: unknown): value is Error;
```

### 参数

- `value` (`unknown`): 要检查的值。

### 返回值

(`value is Error`): 如果 `value` 是 Error 对象，则返回 `true`，否则返回 `false`。

## 示例

```typescript
isError(new Error()); // true
isError('error'); // false
isError({ name: 'Error', message: '' }); // false
```
