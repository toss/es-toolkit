# over (Lodash 兼容性)

::: warning 直接使用数组方法

这个 `over` 函数在将函数映射到数组的过程中会产生额外的开销。

改为使用更快、更现代的数组 `map` 方法。

:::

创建一个函数，该函数使用相同的参数调用给定的函数并返回每个函数的结果数组。

```typescript
const multiCall = over(funcs);
```

## 参考

### `over(...iteratees)`

接收多个函数，创建一个函数，该函数使用相同的参数调用每个函数并返回结果数组。当需要用相同的数据进行多种计算时很有用。

```typescript
import { over } from 'es-toolkit/compat';

// 一起使用数学函数
const mathOperations = over([Math.max, Math.min]);
mathOperations(1, 2, 3, 4);
// => [4, 1]

// 也可以作为单独的函数传递
const operations = over(Math.max, Math.min);
operations(1, 2, 3, 4);
// => [4, 1]

// 提取对象属性
const getProperties = over(['name', 'age']);
getProperties({ name: 'John', age: 30 });
// => ['John', 30]

// 检查条件
const validators = over([
  { name: 'John' }, // 对象匹配
  { age: 30 },
]);
validators({ name: 'John', age: 30 });
// => [true, true]
```

也可以处理嵌套路径。

```typescript
import { over } from 'es-toolkit/compat';

const data = {
  user: { name: 'John', profile: { age: 30 } },
  settings: { theme: 'dark' },
};

const getInfo = over(['user.name', 'user.profile.age', 'settings.theme']);
getInfo(data);
// => ['John', 30, 'dark']
```

#### 参数

- `...iteratees` (`Array<Function | string | object | Array>`): 要调用的函数或属性路径。可以作为数组传递或作为单独的参数传递。

#### 返回值

(`(...args: any[]) => any[]`): 返回一个函数，该函数接受参数并返回每个函数结果的数组。
