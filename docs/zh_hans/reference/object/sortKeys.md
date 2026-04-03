# sortKeys

创建一个键已排序的新对象。

```typescript
const sorted = sortKeys(object, compare?);
```

## 用法

### `sortKeys(object, compare?)`

当您想要以确定性顺序排列对象的键时，可以使用 `sortKeys`。默认情况下，键按字母顺序排序，这对于序列化、比较或显示等场景很有用。

```typescript
import { sortKeys } from 'es-toolkit/object';

const sorted = sortKeys({ c: 3, a: 1, b: 2 });
// { a: 1, b: 2, c: 3 }
```

您也可以提供自定义比较函数来实现不同的排序方式。

```typescript
// 按字母逆序排序
const reversed = sortKeys({ a: 1, b: 2, c: 3 }, (a, b) => b.localeCompare(a));
// { c: 3, b: 2, a: 1 }
```

值会原样保留，包括嵌套对象和数组。

```typescript
const obj = { z: [1, 2], a: { nested: true }, m: 'hello' };
const sorted = sortKeys(obj);
// { a: { nested: true }, m: 'hello', z: [1, 2] }
```

#### 参数

- `object` (`T`): 要排序键的对象。
- `compare` (`(a: string, b: string) => number`, 可选): 用于排序键的自定义比较函数。默认为字母顺序。

#### 返回值

(`T`): 返回一个键已排序的新对象。
