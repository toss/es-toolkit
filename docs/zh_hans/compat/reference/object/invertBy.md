# invertBy (Lodash 兼容性)

::: warning 请使用现代 JavaScript API

由于复杂的迭代器处理和分组逻辑,这个 `invertBy` 函数运行缓慢。

请使用更快、更现代的 `Object.entries()` 与 `reduce()` 或 `Map`。

:::

反转对象的键和值,同时将相同的值分组到数组中。

```typescript
const inverted = invertBy(object, iteratee);
```

## 用法

### `invertBy(object, iteratee?)`

当你想要反转对象的键和值,并将具有相同值的键分组到数组中时,请使用 `invertBy`。你可以选择性地提供一个迭代器函数来转换值。

```typescript
import { invertBy } from 'es-toolkit/compat';

// 基本的键值反转(相同的值被分组到数组中)
const object = { a: 1, b: 2, c: 1 };
invertBy(object);
// => { '1': ['a', 'c'], '2': ['b'] }

// 使用迭代器函数进行值转换
const ages = { john: 25, jane: 30, bob: 25 };
invertBy(ages, age => `age_${age}`);
// => { 'age_25': ['john', 'bob'], 'age_30': ['jane'] }

// 按字符串长度分组
const words = { a: 'hello', b: 'world', c: 'hi', d: 'test' };
invertBy(words, word => word.length);
// => { '5': ['a', 'b'], '2': ['c'], '4': ['d'] }
```

你也可以按对象属性分组。

```typescript
import { invertBy } from 'es-toolkit/compat';

// 按对象属性分组
const users = {
  user1: { department: 'IT', age: 30 },
  user2: { department: 'HR', age: 25 },
  user3: { department: 'IT', age: 35 },
};

invertBy(users, user => user.department);
// => { 'IT': ['user1', 'user3'], 'HR': ['user2'] }
```

安全地处理 `null` 或 `undefined`。

```typescript
import { invertBy } from 'es-toolkit/compat';

invertBy(null);
// => {}

invertBy(undefined);
// => {}
```

#### 参数

- `object` (`object`): 要反转的对象。
- `iteratee` (`ValueIteratee`, 可选): 用于转换值的函数。默认值是直接使用值本身的函数。

#### 返回值

(`Record<string, string[]>`): 返回一个新对象,以转换后的值作为键,以原始键的数组作为值。
