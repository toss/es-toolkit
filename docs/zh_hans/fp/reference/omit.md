# omit

创建一个数据在后的运算符,从对象中移除给定的键。

```typescript
const result = pipe(obj, omit(keys));
```

## 用法

`omit` 返回一个新对象,其中已从输入对象中移除指定的 `keys`。

```typescript
import { omit, pipe } from 'es-toolkit/fp';

pipe({ a: 1, b: 2, c: 3 }, omit(['b', 'c'])); // => { a: 1 }
```

#### 参数

- `keys` (`readonly K[]`): 要从新对象中排除的键。

#### 返回值

(`(obj: T) => Omit<T, K>`): 一个数据在后的运算符,将对象 `T` 映射为一个不包含所移除键的新对象。
