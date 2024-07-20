# isPlainObject

检查给定值是否是一个普通对象。

## 签名

```typescript
function isPlainObject(object: object): boolean;
```

### 参数

- `object` (`object`): 要检查的值。

### 返回值

(`boolean`): 如果该值是普通对象，则返回 `true`，否则返回 `false`。

## 示例

```typescript
console.log(isPlainObject({})); // true
console.log(isPlainObject([])); // false
console.log(isPlainObject(null)); // false
console.log(isPlainObject(Object.create(null))); // true
console.log(Buffer.from('hello, world')); // false
```
