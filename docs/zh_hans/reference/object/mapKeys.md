# mapKeys

创建一个具有与给定对象相同值的新对象，但键是通过对对象的每个自身可枚举属性运行 `getNewKey` 函数生成的。

## 签名

```typescript
function mapKeys<T extends Record<PropertyKey, unknown>, K1 extends keyof T, K2 extends PropertyKey>(
  object: T,
  getNewKey: (value: T[K1], key: K1, object: T) => K2
): Record<K2, T[K1]>;
```

### 参数

- `obj` (`T extends object`): 要迭代的对象。
- `getNewKey`: (`(value: T[K1], key: K1, object: T) => N`): 每个自身可枚举属性调用的函数。

### 返回值

(`Record<K2, T[K]>`): 新映射的对象。

## 示例

```typescript
const obj = { a: 1, b: 2 };
const result = mapKeys(obj, (value, key) => key + value);
console.log(result); // { a1: 1, b2: 2 }
```
