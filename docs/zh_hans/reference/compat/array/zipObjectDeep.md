# zipObjectDeep (Lodash 兼容性)

使用路径数组和值数组创建一个深层嵌套的对象。

```typescript
const result = zipObjectDeep(keys, values);
```

## 用法

### `zipObjectDeep(keys, values)`

使用第一个数组的路径和第二个数组的值创建一个深层嵌套的对象。路径可以作为点符号字符串或属性名称数组提供。这在生成复杂的嵌套数据结构或将平面键值对转换为分层对象时很有用。

```typescript
import { zipObjectDeep } from 'es-toolkit/compat';

// 将路径指定为点符号字符串
const paths = ['a.b.c', 'd.e.f'];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// 返回: { a: { b: { c: 1 } }, d: { e: { f: 2 } } }

// 将路径指定为数组
const pathArrays = [
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
];
const values2 = [1, 2];
const result2 = zipObjectDeep(pathArrays, values2);
// 返回: { a: { b: { c: 1 } }, d: { e: { f: 2 } } }

// 包含数组索引的路径
const arrayPaths = ['a.b[0].c', 'a.b[1].d'];
const values3 = [1, 2];
const result3 = zipObjectDeep(arrayPaths, values3);
// 返回: { a: { b: [{ c: 1 }, { d: 2 }] } }
```

`null` 或 `undefined` 键数组被视为空对象。

```typescript
import { zipObjectDeep } from 'es-toolkit/compat';

zipObjectDeep(null, [1, 2]); // {}
zipObjectDeep(undefined, [1, 2]); // {}
```

#### 参数

- `keys` (`ArrayLike<PropertyPath> | null | undefined`): 属性路径数组。可以使用点符号字符串或属性名称数组。
- `values` (`ArrayLike<any>`, 可选): 相应值的数组。如果未提供,则视为空数组。

#### 返回值

(`object`): 返回由给定路径和值构造的深层嵌套对象。
