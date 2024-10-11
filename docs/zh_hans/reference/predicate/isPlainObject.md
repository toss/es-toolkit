# isPlainObject

检查给定值是否是一个普通对象。

普通对象是基本的 JavaScript 对象，例如 `{}` 或 `{ name: 'John', age: 30 }`。它不是从类派生的，并且其原型要么是 `Object.prototype`，要么是 `null`。当你使用 `toString` 方法将其转换为字符串时，它将显示为 `[object Object]`。

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
isPlainObject({}); // true
isPlainObject([]); // false
isPlainObject(Object.create(null)); // true

class Foo {}
isPlainObject(new Foo()); // false
isPlainObject(new Date()); // false
isPlainObject(new Set()); // false
isPlainObject(new Map()); // false
isPlainObject(Buffer.from('hello, world')); // false
isPlainObject(Math); // false
isPlainObject(JSON); // false
isPlainObject(null); // false
isPlainObject(1); // false
```

## 性能对比

|                   | [包大小](../../bundle-size.md) | [性能](../../performance.md) |
| ----------------- | ------------------------------ | ---------------------------- |
| es-toolkit        | 279 字节 (小 82.4%)            | 1,505,684 次 (快 1.70×)      |
| es-toolkit/compat | 435 字节 (小 72.5%)            | 2,013,760 次 (快 2.28×)      |
| lodash-es         | 1,586 字节                     | 882,669 次                   |
