# invert (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `invert`

由于 Lodash 兼容性所需的复杂处理,此 `invert` 函数运行较慢。

请使用更快、更现代的 `es-toolkit` 的 [`invert`](../../object/invert.md)。

:::

反转对象的键和值。

```typescript
const inverted = invert(object);
```

## 参考

### `invert(object)`

当您想要交换对象的键和值时,请使用 `invert`。原始对象的键将成为新对象的值,原始对象的值将成为新对象的键。

```typescript
import { invert } from 'es-toolkit/compat';

// 基本键值反转
const object = { a: 1, b: 2, c: 3 };
invert(object);
// => { '1': 'a', '2': 'b', '3': 'c' }

// 反转字符串值
const colors = { red: '#ff0000', green: '#00ff00', blue: '#0000ff' };
invert(colors);
// => { '#ff0000': 'red', '#00ff00': 'green', '#0000ff': 'blue' }

// 混合键和值类型
const mixed = { a: 1, 2: 'b', c: 3, 4: 'd' };
invert(mixed);
// => { '1': 'a', 'b': '2', '3': 'c', 'd': '4' }
```

当存在重复值时,将使用最后一个键。

```typescript
import { invert } from 'es-toolkit/compat';

// 存在重复值的情况
const object = { a: 1, b: 1, c: 2 };
invert(object);
// => { '1': 'b', '2': 'c' }
// 'a' 被覆盖并丢失
```

#### 参数

- `object` (`object`): 要反转的对象。

#### 返回值

(`Record<string, string>`): 返回键和值反转后的新对象。
