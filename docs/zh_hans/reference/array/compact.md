# compact

返回一个移除了假值的新数组。

```typescript
const compacted = compact(arr);
```

## 参考

### `compact(arr)`

当您想从数组中移除假值（`false`、`null`、`0`、`-0`、`0n`、`''`、`undefined`、`NaN`）时,请使用 `compact`。返回一个只包含真值的新数组。

```typescript
import { compact } from 'es-toolkit/array';

// 移除各种假值。
compact([0, -0, 0n, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
// 返回: [1, 2, 3, 4, 5]

// 从字符串数组中移除空字符串。
compact(['hello', '', 'world', '', '!']);
// 返回: ['hello', 'world', '!']
```

类型系统会自动排除假值类型。

```typescript
import { compact } from 'es-toolkit/array';

const mixed: (string | number | false | null)[] = ['text', 0, false, null, 5];
const result = compact(mixed);
// result 的类型是 (string | number)[]
```

#### 参数

- `arr` (`T[]`): 要移除假值的数组。

#### 返回值

(`Array<Exclude<T, false | null | 0 | 0n | '' | undefined>>`): 移除了假值的新数组。
