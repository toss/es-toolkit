# mapKeys

创建一个具有与给定对象相同值的新对象，但键是通过对对象的每个自身可枚举属性运行 `getNewKey` 函数生成的。

## 签名

```typescript
function mapKeys<T extends Record<PropertyKey, any>, K extends PropertyKey>(
  object: T,
  getNewKey: (value: T[keyof T], key: keyof T, object: T) => K
): Record<K, T[keyof T]>;
```

### 参数

- `obj` (`T extends Record<PropertyKey, any>`): 要迭代的对象。
- `getNewKey`: (`(value: T[keyof T], key: keyof T, object: T) => K`): 每个自身可枚举属性调用的函数。

### 返回值

(`Record<K, T[keyof T]>`): 新映射的对象。

## 示例

```typescript
const obj = { a: 1, b: 2 };
const result = mapKeys(obj, (value, key) => key + value);
console.log(result); // { a1: 1, b2: 2 }
```

## 性能对比

|                   | [包大小](../../bundle-size.md) | [性能](../../performance.md) |
| ----------------- | ------------------------------ | ---------------------------- |
| es-toolkit        | 138 字节 (小 99.1%)            | 2,844,013 次 (快 11%)        |
| es-toolkit/compat | 1,124 字节 (小 93.2%)          | 2,899,524 次 (快 13%)        |
| lodash-es         | 16,649 字节                    | 2,559,949 次                 |
