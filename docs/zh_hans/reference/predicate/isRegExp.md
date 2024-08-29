# isRegExp

检查 `value` 是否是一个正则表达式。

如果 `value` 是一个正则表达式，则返回 `true`，否则返回 `false`。

此函数还可以作为 TypeScript 中的类型谓词，将参数的类型缩小为 `RegExp`。

## 签名

```typescript
function isRegExp(value: unknown): value is RegExp;
```

### 参数

- `value` (`unknown`): 要检查是否为正则表达式的值。

### 返回值

- (`value is RegExp`): 如果值是一个正则表达式则返回 `true`，否则返回 `false`。

## 示例

```typescript
const value1 = /abc/;
const value2 = '/abc/';

console.log(isRegExp(value1)); // true
console.log(isRegExp(value2)); // false
```
