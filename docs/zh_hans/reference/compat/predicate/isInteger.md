# isInteger (Lodash 兼容性)

::: warning 请使用 `Number.isInteger`

这个 `isInteger` 函数由于额外的类型检查开销而性能较慢。

建议使用更快、更现代的 `Number.isInteger`。

:::

检查值是否为整数。

```typescript
const result = isInteger(value);
```

## 参考

### `isInteger(value)`

当需要检查给定值是否为整数时使用 `isInteger`。此函数在 TypeScript 中也可以作为类型守卫使用，将值的类型缩小为 `number`。

```typescript
import { isInteger } from 'es-toolkit/compat';

// 整数值检查
isInteger(3); // true
isInteger(-5); // true
isInteger(0); // true

// 小数值返回 false
isInteger(3.14); // false
isInteger(-2.5); // false

// 无穷大返回 false
isInteger(Infinity); // false
isInteger(-Infinity); // false

// 其他类型也返回 false
isInteger('3'); // false
isInteger([]); // false
isInteger({}); // false
```

#### 参数

- `value` (`any`): 要检查的值。

#### 返回值

(`boolean`): 如果值是整数则返回 `true`，否则返回 `false`。