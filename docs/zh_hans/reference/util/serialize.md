# serialize

将任意值序列化为稳定的字符串。

```typescript
const serialized = serialize(value);
```

## 用法

### `serialize(value)`

当您需要值的稳定字符串表示时(例如用于哈希、缓存键或变更检测),请使用 `serialize`。结构相同的两个值总是序列化为相同的字符串:普通对象的键、`Map` 的键和 `Set` 的值都会被排序,因此输出不依赖于插入顺序。

```typescript
import { serialize } from 'es-toolkit/util';

serialize({ b: 2, a: 1 });
// 返回 '{a:1,b:2}'

serialize({ a: 1, b: 2 }) === serialize({ b: 2, a: 1 });
// 返回 true

serialize([1, 2n, 'a', { k: 1 }]);
// 返回 "[1,2n,'a',{k:1}]"

serialize(new Set([3, 1, 2]));
// 返回 'Set[1,2,3]'

serialize(new Map([['b', 2], ['a', 1]]));
// 返回 'Map{a:1,b:2}'

serialize(new Date(0));
// 返回 'Date(1970-01-01T00:00:00.000Z)'

serialize(new Uint8Array([1, 2, 3]));
// 返回 'Uint8Array[1,2,3]'
```

类实例会连同类名一起序列化。如果实例有 `toJSON` 方法,则序列化 `toJSON` 的结果。

```typescript
class User {
  name = 'Alice';
}
serialize(new User());
// 返回 "User{name:'Alice'}"
```

循环引用会被序列化为 `#ref{n}` 形式的回引用,其中 `n` 是对象首次被访问的顺序。

```typescript
const obj = {};
obj.self = obj;
serialize(obj);
// 返回 '{self:#ref0}'
```

无法有意义地序列化的对象(例如 `Promise`、`WeakMap` 或 `Blob`)会抛出 `TypeError`。

```typescript
serialize(new WeakMap());
// 抛出 TypeError: Cannot serialize WeakMap
```

::: warning 并非为安全目的而设计

`serialize` 不会转义字符串或键,因此可以故意构造出序列化为相同字符串的不同值。请将其用于缓存键或变更检测,而不要用于对安全性敏感的场景。

:::

#### 参数

- `value` (`unknown`): 要序列化的值。

#### 返回值

(`string`): 序列化后的字符串。

#### 错误

(`TypeError`): 如果值中包含无法序列化的对象(例如 `Promise`、`WeakMap`、`WeakSet`、`Blob` 或 `DataView`),则抛出。
