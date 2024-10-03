# isJSONArray

检查给定值是否是有效的 JSON 数组。

有效的 JSON 数组定义为所有项都是[有效 JSON 值](./isJSONValue.md)的数组。

## 签名

```typescript
function isJSONArray(value: unknown): value is any[];
```

### 参数

- `value` (`unknown`): 要检查的值。

### 返回值

(`value is any[]`): 如果该值是有效的 JSON 数组则为 `true`，否则为 `false`。

## 示例

```typescript
console.log(isJSONArray([1, 2, 3])); // true
console.log(isJSONArray(['string', null, true])); // true
console.log(isJSONArray([1, 2, () => {}])); // false
console.log(isJSONArray('not an array')); // false
```
