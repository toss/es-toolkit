# add (Lodash 兼容性)

::: warning 使用 `+` 运算符

由于复杂的类型转换和字符串处理，此 `add` 函数运行缓慢。

请改用更快、更简单的 `+` 运算符。

:::

将两个值相加。

```typescript
const result = add(value, other);
```

## 参考

### `add(value, other)`

当您想要将两个值相加时，请使用 `add`。它不仅可以处理数字，还可以处理字符串。

```typescript
import { add } from 'es-toolkit/compat';

// 数字相加
add(2, 3);
// Returns: 5

add(1.5, 2.5);
// Returns: 4

// 处理 NaN
add(NaN, 5);
// Returns: NaN

add(10, NaN);
// Returns: NaN
```

当包含字符串时，它作为字符串连接操作。

```typescript
import { add } from 'es-toolkit/compat';

add('2', 3);
// Returns: '23'

add(1, '5');
// Returns: '15'

add('hello', 'world');
// Returns: 'helloworld'
```

`undefined` 值被特殊处理。

```typescript
import { add } from 'es-toolkit/compat';

add(undefined, undefined);
// Returns: 0

add(5, undefined);
// Returns: 5

add(undefined, 3);
// Returns: 3
```

#### 参数

- `value` (`number`): 要相加的第一个值。
- `other` (`number`): 要相加的第二个值。

#### 返回值

(`number | string`): 返回两个值的和。如果包含字符串，则返回字符串，否则返回数字。
