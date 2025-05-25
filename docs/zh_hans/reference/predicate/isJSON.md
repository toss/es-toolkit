# isJSON

检查给定值是否为有效的JSON字符串。

有效的JSON字符串是可以使用`JSON.parse()`成功解析的字符串。根据JSON规范，有效的JSON可以表示：

- 对象（带有字符串键和有效JSON值）
- 数组（包含有效JSON值）
- 字符串
- 数字
- 布尔值
- `null`

像`"null"`、`"true"`、`"false"`这样的字符串值和数字字符串（例如：`"42"`）也被视为有效的JSON，将返回`true`。

此函数在TypeScript中作为类型守卫，将参数的类型缩小为`string`。

## 签名

```typescript
function isJSON(value: unknown): value is string;
```

### 参数

- `value` (`unknown`): 要检查的值。

### 返回值

(`boolean`): 如果`value`是有效的JSON字符串，则返回`true`，否则返回`false`。

## 示例

```typescript
isJSON('{"name":"John","age":30}'); // true
isJSON('[1,2,3]'); // true
isJSON('true'); // true
isJSON('invalid json'); // false
isJSON({ name: 'John' }); // false (not a string)
isJSON(null); // false (not a string)
```
