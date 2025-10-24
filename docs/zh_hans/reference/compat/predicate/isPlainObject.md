# isPlainObject (Lodash 兼容性)

::: warning 使用 es-toolkit 的 [isPlainObject](../../predicate/isPlainObject.md)
这个 `isPlainObject` 函数由于 Lodash 兼容性的复杂处理而运行较慢。

请使用更快且现代的 es-toolkit 的 [isPlainObject](../../predicate/isPlainObject.md)。
:::

检查值是否为纯对象。

```typescript
const result = isPlainObject(object);
```

## 参考

### `isPlainObject(object)`

当您想检查值是否为纯对象时使用 `isPlainObject`。纯对象是通过 `{}` 字面量、`new Object()` 或 `Object.create(null)` 创建的对象。在 TypeScript 中也可以作为类型守卫使用。

```typescript
import { isPlainObject } from 'es-toolkit/compat';

// 纯对象
isPlainObject({}); // true
isPlainObject(new Object()); // true
isPlainObject(Object.create(null)); // true
isPlainObject({ name: 'John', age: 30 }); // true

// 不是纯对象的值
isPlainObject([]); // false (数组)
isPlainObject(new Date()); // false (Date 实例)
isPlainObject(new Map()); // false (Map 实例)
isPlainObject(new Set()); // false (Set 实例)
isPlainObject(/regex/); // false (正则表达式)
isPlainObject(function () {}); // false (函数)
isPlainObject(null); // false
isPlainObject(undefined); // false
isPlainObject('object'); // false (字符串)
isPlainObject(42); // false (数字)
```

区分类实例和纯对象。

```typescript
import { isPlainObject } from 'es-toolkit/compat';

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const person = new Person('John');
const plainObj = { name: 'John' };

isPlainObject(person); // false (类实例)
isPlainObject(plainObj); // true (纯对象)
```

正确处理自定义 `Symbol.toStringTag` 属性。

```typescript
import { isPlainObject } from 'es-toolkit/compat';

// 可写的 Symbol.toStringTag
const obj1 = {};
obj1[Symbol.toStringTag] = 'CustomObject';
isPlainObject(obj1); // true

// 只读的 Symbol.toStringTag (内置对象)
const date = new Date();
isPlainObject(date); // false
```

#### 参数

- `object` (`any`): 要检查是否为纯对象的值。

#### 返回值

(`boolean`): 如果值为纯对象则返回 `true`，否则返回 `false`。
