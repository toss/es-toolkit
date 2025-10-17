# result (Lodash 兼容性)

::: warning 使用 `get` 函数或可选链

这个 `result` 函数由于复杂的路径处理和函数调用逻辑而性能缓慢。

建议使用更快且更现代的 `get` 函数或可选链(`?.`)。

:::

从对象的路径中获取值,但如果遇到函数则调用它并返回结果。

```typescript
const result = result(obj, path, defaultValue);
```

## 参考

### `result(object, path, defaultValue)`

当您想从对象的路径中获取值并自动调用路径上的函数时,使用 `result`。它与 `get` 函数类似,但会执行遇到的函数,如果最终值也是函数则调用并返回结果。

```typescript
import { result } from 'es-toolkit/compat';

// 基本用法(普通值)
const obj = { a: { b: { c: 3 } } };
const value = result(obj, 'a.b.c');
// 结果: 3

// 自动函数调用
const objWithFunc = {
  compute: () => ({ value: 42 }),
  getValue: function() { return this.compute().value; }
};
const computed = result(objWithFunc, 'getValue');
// 结果: 42 (调用 getValue 函数)

// 路径上的函数调用
const nested = {
  data: () => ({ user: { getName: () => 'John' } })
};
const name = result(nested, 'data.user.getName');
// 结果: 'John' (data() 和 getName() 都被调用)

// 使用默认值
const incomplete = { a: { b: null } };
const withDefault = result(incomplete, 'a.b.c', 'default value');
// 结果: 'default value'

// 默认值是函数的情况
const withFuncDefault = result(incomplete, 'a.b.c', () => 'computed default');
// 结果: 'computed default' (调用默认值函数)

// 使用数组路径
const arrayPath = result(objWithFunc, ['getValue']);
// 结果: 42

// 动态默认值
const dynamic = result(incomplete, 'missing.path', function() {
  return `Generated at ${new Date().toISOString()}`;
});
// 结果: 包含当前时间的字符串
```

调用函数时 `this` 上下文会被保留。

```typescript
import { result } from 'es-toolkit/compat';

const calculator = {
  multiplier: 2,
  compute: function() { return 10 * this.multiplier; }
};

const calculatedValue = result(calculator, 'compute');
// 结果: 20 (this.multiplier 被正确引用)
```

#### 参数

- `object` (`any`): 要查询的对象。
- `path` (`PropertyPath`): 要获取的属性路径。可以是字符串、数组或键的数组。
- `defaultValue` (`R | ((...args: any[]) => R)`, 可选): 当值为 `undefined` 时返回的默认值。如果是函数,则调用并返回结果。

#### 返回值

(`R`): 返回解析的值。路径上的函数会被调用,如果最终值也是函数,则返回调用后的结果。
