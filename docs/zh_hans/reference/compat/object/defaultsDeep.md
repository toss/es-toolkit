# defaultsDeep (Lodash 兼容性)

::: warning 请使用解构赋值和 `Object.assign()` 代替

此 `defaultsDeep` 函数由于嵌套对象的递归合并和循环引用处理而运行缓慢且复杂。

请改用更快、更现代的解构赋值和 `Object.assign()`。

:::

对嵌套对象递归设置默认值。

```typescript
const result = defaultsDeep(target, ...sources);
```

## 参考

### `defaultsDeep(target, ...sources)`

当您想对嵌套对象中的 `undefined` 属性递归设置默认值时,请使用 `defaultsDeep`。与 `defaults` 类似,但它也会合并嵌套对象。

```typescript
import { defaultsDeep } from 'es-toolkit/compat';

// 在嵌套对象中设置默认值
defaultsDeep({ a: { b: 2 } }, { a: { b: 3, c: 3 }, d: 4 });
// 返回值: { a: { b: 2, c: 3 }, d: 4 }

// 只有 undefined 属性会用默认值填充
defaultsDeep({ a: { b: undefined } }, { a: { b: 1 } });
// 返回值: { a: { b: 1 } }

// null 值保持不变
defaultsDeep({ a: null }, { a: { b: 1 } });
// 返回值: { a: null }
```

您可以传递多个源对象以分阶段应用默认值。

```typescript
import { defaultsDeep } from 'es-toolkit/compat';

defaultsDeep({ a: { b: 2 } }, { a: { c: 3 } }, { a: { d: 4 }, e: 5 });
// 返回值: { a: { b: 2, c: 3, d: 4 }, e: 5 }
```

#### 参数

- `target` (`any`): 要设置默认值的目标对象。
- `...sources` (`any[]`): 提供默认值的源对象。

#### 返回值

(`any`): 返回递归设置了默认值的对象。第一个参数 `target` 会被修改。
