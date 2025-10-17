# isEqualWith (Lodash 兼容性)

::: warning 请使用 es-toolkit 的 [isEqualWith](../../predicate/isEqualWith.md)
这个 `isEqualWith` 函数由于 Lodash 兼容性的复杂处理而性能较慢。

建议使用更快、更现代的 `es-toolkit` 的 [isEqualWith](../../predicate/isEqualWith.md)。
:::

使用自定义比较函数检查两个值是否相等。

```typescript
const result = isEqualWith(a, b, customizer);
```

## 参考

### `isEqualWith(a, b, areValuesEqual?)`

使用自定义比较函数深度比较两个值。如果自定义函数返回布尔值，则使用该结果；如果返回 `undefined`，则使用默认相等性比较。

自定义比较函数也会用于比较对象、数组、Map、Set 等复杂结构内部的值，确保深度比较。

```typescript
import { isEqualWith } from 'es-toolkit/compat';

// 忽略大小写的字符串比较
const customizer = (a: any, b: any) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }
};

isEqualWith('Hello', 'hello', customizer); // true
isEqualWith({ a: 'Hello' }, { a: 'hello' }, customizer); // true

// 按绝对值比较数字
const absCustomizer = (a: any, b: any) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a) === Math.abs(b);
  }
};

isEqualWith([-1, 2], [1, -2], absCustomizer); // true

// 复杂对象比较
const obj1 = {
  name: 'JOHN',
  details: { age: 30, city: 'NYC' },
};
const obj2 = {
  name: 'john',
  details: { age: 30, city: 'nyc' },
};

isEqualWith(obj1, obj2, customizer); // true
```

对 Map 和 Set 进行特殊处理。

```typescript
import { isEqualWith } from 'es-toolkit/compat';

const customizer = (a: any, b: any) => {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.toLowerCase() === b.toLowerCase();
  }
};

const map1 = new Map([['KEY', 'value']]);
const map2 = new Map([['key', 'value']]);
isEqualWith(map1, map2, customizer); // true

const set1 = new Set(['HELLO']);
const set2 = new Set(['hello']);
isEqualWith(set1, set2, customizer); // true
```

#### 参数

- `a` (`any`): 要比较的第一个值。
- `b` (`any`): 要比较的第二个值。
- `areValuesEqual` (`(x: any, y: any, property?: PropertyKey, xParent?: any, yParent?: any, stack?: Map<any, any>) => boolean | void`): 自定义比较函数。
  - `x`: 来自第一个对象 `a` 的值
  - `y`: 来自第二个对象 `b` 的值
  - `property`: 获取 `x` 和 `y` 时使用的属性键
  - `xParent`: 第一个值 `x` 的父对象
  - `yParent`: 第二个值 `y` 的父对象
  - `stack`: 处理循环引用的内部栈 (Map)

#### 返回值

(`boolean`): 根据自定义函数，如果两个值相等则返回 `true`，否则返回 `false`。
