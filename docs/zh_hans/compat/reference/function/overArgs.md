# overArgs (Lodash 兼容性)

::: warning 使用箭头函数和直接转换

这个 `overArgs` 函数创建了一个转换每个参数的复杂包装器,导致性能缓慢。使用箭头函数直接转换参数可以获得更清晰、更快速的代码。

建议使用更快且更现代的箭头函数和直接转换。

:::

创建一个新函数,该函数使用对应的转换函数转换函数的每个参数后执行。

```typescript
const wrapped = overArgs(func, transforms);
```

## 用法

### `overArgs(func, ...transforms)`

当您想在调用函数之前转换每个参数时,使用 `overArgs`。每个参数由对应的转换函数处理。

```typescript
import { overArgs } from 'es-toolkit/compat';

function doubled(n) {
  return n * 2;
}

function square(n) {
  return n * n;
}

// 第一个参数加倍,第二个参数平方
const func = overArgs((x, y) => [x, y], [doubled, square]);
func(5, 3);
// Returns: [10, 9]
```

也可以使用字符串提取属性。

```typescript
import { overArgs } from 'es-toolkit/compat';

const user1 = { name: 'John', age: 30 };
const user2 = { name: 'Jane', age: 25 };

// 从每个对象中提取属性
const getUserInfo = overArgs((name, age) => `${name} is ${age} years old`, ['name', 'age']);
getUserInfo(user1, user2);
// Returns: "John is 25 years old"
```

如果未提供转换函数或为 `null`/`undefined`,则参数将按原样传递。

```typescript
import { overArgs } from 'es-toolkit/compat';

const func = overArgs((a, b, c) => [a, b, c], [n => n * 2, null, n => n * 3]);
func(5, 10, 15);
// Returns: [10, 10, 45]
```

超过转换函数数量的参数将按原样传递。

```typescript
import { overArgs } from 'es-toolkit/compat';

const func = overArgs((a, b, c) => [a, b, c], [n => n * 2]);
func(5, 10, 15);
// Returns: [10, 10, 15]
```

也可以检查参数是否与对象匹配。

```typescript
import { overArgs } from 'es-toolkit/compat';

const func = overArgs((match1, match2) => [match1, match2], [{ age: 30 }, { active: true }]);

func({ name: 'John', age: 30 }, { active: true, status: 'online' });
// Returns: [true, true]
```

#### 参数

- `func` (`(...args: any[]) => any`): 要包装的函数。
- `...transforms` (`Array<(...args: any[]) => any | string | object | array>`): 用于转换参数的函数。每个转换可以是以下之一:
  - 接受并返回值的函数
  - 用于获取属性值的字符串(例如,'name' 获取 name 属性)
  - 用于检查参数是否与属性匹配的对象
  - 用于检查属性匹配的 [属性, 值] 数组

#### 返回值

(`(...args: any[]) => any`): 返回一个新函数,该函数转换参数后调用原始函数。
