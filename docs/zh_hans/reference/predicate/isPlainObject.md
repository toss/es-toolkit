# isPlainObject

检查给定值是否是一个普通对象。

## 签名

```typescript
function isPlainObject(value: unknown): value is Record<PropertyKey, any>;
```

### 参数

- `value` (`unknown`): 要检查的值。

### 返回值

(`value is Record<PropertyKey, any>`): 如果该值是普通对象，则返回 `true`，否则返回 `false`。

## 示例

```typescript
console.log(isPlainObject({})); // true
console.log(isPlainObject([])); // false
console.log(isPlainObject(null)); // false
console.log(isPlainObject(Object.create(null))); // true
console.log(Buffer.from('hello, world')); // false
```

## 性能对比

|                   | [包大小](../../bundle-size.md) | [性能](../../performance.md) |
| ----------------- | ------------------------------ | ---------------------------- |
| es-toolkit        | 279 字节 (小 82.4%)            | 1,505,684 次 (快 1.70×)      |
| es-toolkit/compat | 435 字节 (小 72.5%)            | 2,013,760 次 (快 2.28×)      |
| lodash-es         | 1,586 字节                     | 882,669 次                   |
