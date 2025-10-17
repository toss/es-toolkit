# omitBy (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `omitBy`

这个 `omitBy` 函数由于类数组对象检查、`iteratee` 转换和键转换过程而相对较慢。

请改用更快、更现代的 `es-toolkit` 的 [`omitBy`](../../object/omitBy.md)。

:::

创建一个新对象,排除断言函数返回true的属性。

```typescript
const result = omitBy(obj, predicate);
```

## 参考

### `omitBy(object, predicate)`

对对象的每个属性执行断言函数,并创建一个新对象,排除断言返回true的属性。适用于根据条件动态过滤属性。

```typescript
import { omitBy } from 'es-toolkit/compat';

// 删除特定类型的值
const data = { a: 1, b: 'remove', c: 3, d: 'keep' };
const numbers = omitBy(data, (value) => typeof value === 'string');
// 结果: { a: 1, c: 3 }

// 根据条件删除属性
const user = { id: 1, name: 'John', age: 0, active: false, email: '' };
const validData = omitBy(user, (value) => !value);
// 结果: { id: 1, name: 'John' } (删除假值)

// 按键名过滤
const settings = { userSetting: true, adminSetting: false, debugMode: true };
const userOnly = omitBy(settings, (value, key) => key.startsWith('admin'));
// 结果: { userSetting: true, debugMode: true }

// 仅删除数字属性
const mixed = { str: 'hello', num1: 42, bool: true, num2: 0, obj: {} };
const noNumbers = omitBy(mixed, (value) => typeof value === 'number');
// 结果: { str: 'hello', bool: true, obj: {} }

// 也可用于数组
const arr = [1, 2, 3, 4, 5];
const filtered = omitBy(arr, (value) => value % 2 === 0);
// 结果: { '0': 1, '2': 3, '4': 5 } (偶数索引处的奇数值)

// 利用值、键和原始对象
const scores = { math: 90, science: 75, english: 85, art: 60 };
const passingGrades = omitBy(scores, (value, key, obj) => {
  console.log(`${key}: ${value} (平均: ${Object.values(obj).reduce((a, b) => a + b) / Object.keys(obj).length})`);
  return value < 80;
});
// 结果: { math: 90, english: 85 }
```

`null` 或 `undefined` 被视为空对象。

```typescript
import { omitBy } from 'es-toolkit/compat';

omitBy(null, () => true); // {}
omitBy(undefined, () => true); // {}
```

#### 参数

- `object` (`Record<string, T> | Record<number, T> | object | null | undefined`): 要过滤的源对象。
- `predicate` (`ValueKeyIteratee<T[keyof T]> | ValueKeyIteratee<T>`, 可选): 对每个属性执行的断言函数。此函数返回true的属性将被删除。默认为 `identity` 函数。

#### 返回值

(`Record<string, S> | Record<number, S> | Partial<T>`): 返回一个由不满足条件的属性组成的新对象。
