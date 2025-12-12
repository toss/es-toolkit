# iteratee (Lodash 兼容性)

::: warning 请使用直接的函数或属性访问

由于复杂的类型转换和各种情况处理，这个 `iteratee` 函数运行缓慢。

请使用更快、更现代的直接函数或属性访问。

:::

创建一个从元素中返回值的函数。

```typescript
const getter = iteratee(source);
```

## 用法

### `iteratee(value?)`

当您想要创建一个从集合元素中提取值或检查条件的函数时，请使用 `iteratee`。根据提供的参数类型执行不同的操作。

```typescript
import { iteratee } from 'es-toolkit/compat';

// 函数: 返回给定的函数本身
const func = iteratee(object => object.a);
[{ a: 1 }, { a: 2 }, { a: 3 }].map(func);
// Returns: [1, 2, 3]

// 属性名: 返回该属性值的函数
const getA = iteratee('a');
[{ a: 1 }, { a: 2 }, { a: 3 }].map(getA);
// Returns: [1, 2, 3]

// 对象: 检查是否与给定对象匹配的函数
const matchesObj = iteratee({ a: 1 });
[
  { a: 1, b: 2 },
  { a: 2, b: 3 },
  { a: 1, c: 4 },
].find(matchesObj);
// Returns: { a: 1, b: 2 }

// 属性-值对: 检查该属性是否与特定值匹配的函数
const matchesProperty = iteratee(['a', 1]);
[{ a: 1 }, { a: 2 }, { a: 3 }].find(matchesProperty);
// Returns: { a: 1 }

// null 或无参数: 返回元素本身的函数
const identity = iteratee();
[{ a: 1 }, { a: 2 }, { a: 3 }].map(identity);
// Returns: [{ a: 1 }, { a: 2 }, { a: 3 }]
```

根据参数类型的操作:

- **函数**: 原样返回给定的函数。
- **属性名**: 从元素中返回给定属性的值。
- **属性-值对**: 返回表示元素的属性是否与给定值匹配的真/假值。
- **部分对象**: 返回表示元素是否与部分对象的属性和值匹配的真/假值。
- **null 或无参数**: 返回原样返回元素的函数。

#### 参数

- `value` (`symbol | number | string | object | null | ((...args: any[]) => unknown)`, 可选): 要转换为迭代器的值。默认值为 `null`。

#### 返回值

(`(...args: any[]) => any`): 返回一个新的迭代器函数。
