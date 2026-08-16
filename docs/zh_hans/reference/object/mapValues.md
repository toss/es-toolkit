# mapValues

返回一个通过函数转换对象值的新对象。

```typescript
const newObj = mapValues(object, getNewValue);
```

## 用法

### `mapValues(object, getNewValue)`

当您想要转换对象的每个值以创建新对象时,请使用 `mapValues`。键保持不变,只有值根据 `getNewValue` 函数的结果改变。

```typescript
import { mapValues } from 'es-toolkit/object';

// 将所有值加倍
const numbers = { a: 1, b: 2, c: 3 };
const doubled = mapValues(numbers, value => value * 2);
// doubled 是 { a: 2, b: 4, c: 6 }

// 将字符串值转换为大写
const strings = { first: 'hello', second: 'world' };
const uppercased = mapValues(strings, value => value.toUpperCase());
// uppercased 是 { first: 'HELLO', second: 'WORLD' }

// 同时使用键和值
const scores = { alice: 85, bob: 90, charlie: 95 };
const grades = mapValues(scores, (value, key) => `${key}: ${value >= 90 ? 'A' : 'B'}`);
// grades 是 { alice: 'alice: B', bob: 'bob: A', charlie: 'charlie: A' }
```

#### 参数

- `object` (`T extends object`): 要转换值的对象。
- `getNewValue` (`(value: T[K], key: K, object: T) => V`): 生成新值的函数。接收值、键和整个对象作为参数。

#### 返回值

(`Record<K, V>`): 返回值已转换的新对象。
