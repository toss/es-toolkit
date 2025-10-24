# defaults (Lodash 兼容性)

::: warning 请使用 `Object.assign()` 代替

此 `defaults` 函数由于特殊处理 `undefined` 和从 `Object.prototype` 继承的属性的复杂逻辑而运行缓慢。

请改用更快、更现代的 `Object.assign()`。

:::

通过设置默认值来填充对象中的 `undefined` 属性。

```typescript
const result = defaults(object, source);
```

## 参考

### `defaults(object, ...sources)`

当您想为对象中的 `undefined` 属性或从 `Object.prototype` 继承的属性设置默认值时,请使用 `defaults`。您可以传递多个默认值对象,它们将按从左到右的顺序应用。

```typescript
import { defaults } from 'es-toolkit/compat';

// 用默认值填充 undefined 属性
defaults({ a: 1 }, { a: 2, b: 2 }, { c: 3 });
// 返回值: { a: 1, b: 2, c: 3 }

// 只有 undefined 属性会用默认值填充
defaults({ a: undefined }, { a: 1 });
// 返回值: { a: 1 }

// null 值保持不变
defaults({ a: null }, { a: 1 });
// 返回值: { a: null }
```

如果属性已经有值,则不会用默认值覆盖。

```typescript
import { defaults } from 'es-toolkit/compat';

defaults({ a: 1, b: 2 }, { b: 3 }, { c: 3 });
// 返回值: { a: 1, b: 2, c: 3 }
```

#### 参数

- `object` (`any`): 要设置默认值的目标对象。
- `...sources` (`any[]`): 提供默认值的源对象。

#### 返回值

(`any`): 返回设置了默认值的对象。第一个参数 `object` 会被修改。
