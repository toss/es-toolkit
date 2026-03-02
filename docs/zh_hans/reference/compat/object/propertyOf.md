# propertyOf (Lodash 兼容性)

::: warning 请直接使用 `get` 函数

这个 `propertyOf` 函数是一个内部调用 `get` 函数的包装函数,会产生额外的函数调用开销。

请改用更快、更现代的 `get` 函数,或使用可选链(`?.`)。

:::

创建一个从特定对象的各种路径检索值的函数。

```typescript
const getter = propertyOf(obj);
```

## 用法

### `propertyOf(object)`

当您想创建一个从单个对象的多个路径检索值的函数时,请使用 `propertyOf`。与 `property` 相反,它先固定对象,允许您查询各种路径。

```typescript
import { propertyOf } from 'es-toolkit/compat';

// 基本用法
const data = { name: 'John', age: 30, city: 'New York' };
const getValue = propertyOf(data);

const name = getValue('name');
// 结果: 'John'

const age = getValue('age');
// 结果: 30

// 深层路径访问
const complexData = {
  user: { profile: { name: 'Alice', age: 25 } },
  settings: { theme: 'dark', lang: 'en' },
};
const getComplexValue = propertyOf(complexData);

const userName = getComplexValue('user.profile.name');
// 结果: 'Alice'

const theme = getComplexValue('settings.theme');
// 结果: 'dark'

// 使用数组路径
const arrayPath = getComplexValue(['user', 'profile', 'age']);
// 结果: 25

// 将多个路径作为数组处理
const paths = ['user.profile.name', 'settings.theme', 'settings.lang'];
const values = paths.map(getComplexValue);
// 结果: ['Alice', 'dark', 'en'] (每个路径的值)

// 数组索引访问
const arrayData = [10, 20, 30];
const getArrayValue = propertyOf(arrayData);
const firstItem = getArrayValue(0);
// 结果: 10

const secondItem = getArrayValue('[1]');
// 结果: 20
```

如果路径不存在,则返回 `undefined`。

```typescript
import { propertyOf } from 'es-toolkit/compat';

const data = { a: 1, b: 2 };
const getValue = propertyOf(data);
const missing = getValue('nonexistent.path');
// 结果: undefined
```

#### 参数

- `object` (`T`): 要检索值的目标对象。

#### 返回值

(`(path: PropertyPath) => any`): 返回一个函数,该函数在给定路径处返回对象的值。
