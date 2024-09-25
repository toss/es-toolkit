# isJSONString

检查一个值是否是JSON字符串。

如果值是JSON字符串（仅包括普通对象和数组），则返回 `true`，否则返回 `false`。

## 签名

```typescript
function isJSONString(value: unknown): boolean;
```

### 参数

- `value` (`unknown`): 要检查的值。

### 返回值

(`boolean`): 如果值是一个JSON字符串，则返回 `true`，否则返回 `false`。

## 示例

```typescript
console.log(isJSONString('{"name": "John", "age": 30}')); // true
console.log(isJSONString('[1, 2, 3]')); // true
console.log(isJSONString({ name: 'John', age: 30 })); // false
console.log(isJSONString(null)); // false
console.log(isJSONString('123')); // false
```
