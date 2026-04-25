# castArray（Lodash 兼容性）

::: warning 使用 `Array.from()` 或数组字面量（`[value]`）

此 `castArray` 函数由于无参数处理和 `undefined` 处理等原因，行为复杂。

请使用更清晰、更现代的 `Array.from()` 或条件数组创建（`Array.isArray(value) ? value : [value]`）。

:::

如果值不是数组，则将其转换为数组。

```typescript
const result = castArray(value);
```

## 用法

### `castArray(value?)`

当你想要确保任何值都变成数组时，使用 `castArray`。如果值已经是数组，则原样返回。否则，创建一个包含该值的新数组。

```typescript
import { castArray } from 'es-toolkit/compat';

// 将数字转换为数组
castArray(1);
// 返回值：[1]

// 将字符串转换为数组
castArray('hello');
// 返回值：['hello']

// 将对象转换为数组
castArray({ a: 1 });
// 返回值：[{ a: 1 }]
```

已经是数组的值将原样返回。

```typescript
import { castArray } from 'es-toolkit/compat';

castArray([1, 2, 3]);
// 返回值：[1, 2, 3]

castArray(['a', 'b']);
// 返回值：['a', 'b']
```

`null` 和 `undefined` 也会转换为数组。

```typescript
import { castArray } from 'es-toolkit/compat';

castArray(null);
// 返回值：[null]

castArray(undefined);
// 返回值：[undefined]
```

不带参数调用时，返回空数组。

```typescript
import { castArray } from 'es-toolkit/compat';

castArray();
// 返回值：[]
```

#### 参数

- `value` (`T | readonly T[]`，可选）：要转换为数组的值。如果不提供参数，则返回空数组。

#### 返回值

(`T[]`)：如果输入已经是数组，则返回该数组；否则返回包含输入值的新数组。
