# mapKeys

返回一个通过函数转换对象键的新对象。

```typescript
const newObj = mapKeys(object, getNewKey);
```

## 参考

### `mapKeys(object, getNewKey)`

当您想要转换对象的每个键以创建新对象时,请使用 `mapKeys`。值保持不变,只有键根据 `getNewKey` 函数的结果改变。

```typescript
import { mapKeys } from 'es-toolkit/object';

// 为键添加前缀
const obj = { a: 1, b: 2 };
const prefixed = mapKeys(obj, (value, key) => `prefix_${key}`);
// prefixed 是 { prefix_a: 1, prefix_b: 2 }

// 结合键和值创建新键
const combined = mapKeys(obj, (value, key) => `${key}${value}`);
// combined 是 { a1: 1, b2: 2 }

// 将键转换为大写
const uppercased = mapKeys(obj, (value, key) => key.toString().toUpperCase());
// uppercased 是 { A: 1, B: 2 }
```

#### 参数

- `object` (`T extends Record<PropertyKey, any>`): 要转换键的对象。
- `getNewKey` (`(value: T[keyof T], key: keyof T, object: T) => K`): 生成新键的函数。接收值、键和整个对象作为参数。

#### 返回值

(`Record<K, T[keyof T]>`): 返回键已转换的新对象。
