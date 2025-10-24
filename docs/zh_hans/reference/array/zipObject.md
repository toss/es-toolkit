# zipObject

接收键数组和值数组,创建一个对象。

```typescript
const object = zipObject(keys, values);
```

## 参考

### `zipObject(keys, values)`

当您想将两个数组合并为一个对象时,请使用 `zipObject`。返回一个新对象,第一个数组的元素作为键,第二个数组的元素作为值。

```typescript
import { zipObject } from 'es-toolkit/array';

// 将键和值创建为对象。
zipObject(['a', 'b', 'c'], [1, 2, 3]);
// Returns: { a: 1, b: 2, c: 3 }

// 如果键更多,值会是undefined。
zipObject(['a', 'b', 'c', 'd'], [1, 2, 3]);
// Returns: { a: 1, b: 2, c: 3, d: undefined }
```

如果值数组更长,超出的值会被忽略。

```typescript
import { zipObject } from 'es-toolkit/array';

zipObject(['a', 'b'], [1, 2, 3, 4]);
// Returns: { a: 1, b: 2 }
```

#### 参数

- `keys` (`readonly P[]`): 将成为对象键的数组。
- `values` (`readonly V[]`): 与每个键对应的值数组。

#### 返回值

(`Record<P, V>`): 返回键和值结合的新对象。
