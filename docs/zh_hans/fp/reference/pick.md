# pick

创建一个数据在后的运算符,只保留对象中给定的键。

```typescript
const result = pipe(obj, pick(keys));
```

## 用法

`pick` 返回一个新对象,只包含输入对象中指定的 `keys`。输入对象上不存在的键会被跳过。

```typescript
import { pick, pipe } from 'es-toolkit/fp';

pipe({ a: 1, b: 2, c: 3 }, pick(['a', 'c'])); // => { a: 1, c: 3 }
```

#### 参数

- `keys` (`readonly K[]`): 要复制到新对象中的键。

#### 返回值

(`(obj: T) => Pick<T, K>`): 一个数据在后的运算符,将对象 `T` 映射为一个只包含所选键的新对象。
