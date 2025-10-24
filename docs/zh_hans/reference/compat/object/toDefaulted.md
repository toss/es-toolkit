# toDefaulted (Lodash 兼容性)

::: warning 请使用展开运算符或 `Object.assign`

此 `toDefaulted` 函数由于深度克隆和复杂的默认值处理而运行缓慢。

请使用更快、更现代的展开运算符(`...`)或 `Object.assign()`。

:::

通过向对象应用默认值来创建新对象。

```typescript
const defaulted = toDefaulted(object, ...sources);
```

## 参考

### `toDefaulted(object, ...sources)`

当您想通过将一个或多个源对象的默认值应用到目标对象来创建新对象时,请使用 `toDefaulted`。仅为 `undefined` 的属性或来自 `Object.prototype` 的属性设置默认值。

```typescript
import { toDefaulted } from 'es-toolkit/compat';

// 基本默认值分配
const user = { name: 'John' };
const defaults = { name: 'Anonymous', age: 25, role: 'user' };
toDefaulted(user, defaults);
// => { name: 'John', age: 25, role: 'user' }

// 从多个源应用默认值
const config = { theme: 'dark' };
const defaults1 = { theme: 'light', lang: 'en' };
const defaults2 = { lang: 'ko', region: 'Asia' };
toDefaulted(config, defaults1, defaults2);
// => { theme: 'dark', lang: 'en', region: 'Asia' }
```

只有 `undefined` 值会被默认值替换,`null` 值会保留。

```typescript
import { toDefaulted } from 'es-toolkit/compat';

const data = {
  name: undefined,
  age: null,
  active: false,
};
const defaults = {
  name: 'Default',
  age: 18,
  active: true,
  role: 'user',
};

toDefaulted(data, defaults);
// => { name: 'Default', age: null, active: false, role: 'user' }
```

原始对象不会被修改;返回一个新对象。

```typescript
import { toDefaulted } from 'es-toolkit/compat';

const original = { a: 1 };
const result = toDefaulted(original, { a: 2, b: 3 });

console.log(original); // { a: 1 } (未修改)
console.log(result); // { a: 1, b: 3 } (新对象)
```

#### 参数

- `object` (`object`): 将接收默认值的目标对象。
- `sources` (`object[]`): 提供默认值的源对象。从左到右的顺序应用。

#### 返回值

(`object`): 返回应用了默认值的新对象。
