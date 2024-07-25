# mapValues

创建一个具有与给定对象相同键的新对象，但值是通过对对象的每个自身可枚举属性运行 iteratee 函数生成的。

## 签名

```typescript
function mapValues<T extends Record<PropertyKey, unknown>, K extends keyof T, V>(
  object: T,
  getNewValue: (value: T[K], key: K, object: T) => V
): Record<K, V>;
```

### 参数

- `object` (`T extends Record<PropertyKey, unknown>`): 要迭代的对象。
- `getNewValue`: (`(value: T[K], key: K, object: T) => V`): 每个自身可枚举属性调用的函数。

### 返回值

(`Record<K, V>`): 新映射的对象。

## 示例

```typescript
const obj = { a: 1, b: 2 };
const result = mapValues(obj, (value) => value * 2);
console.log(result); // { a: 2, b: 4 }
