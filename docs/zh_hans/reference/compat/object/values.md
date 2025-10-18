# values (Lodash 兼容性)

::: warning 请使用 `Object.values`

此 `values` 函数只是简单调用 `Object.values`,存在不必要的开销。

请直接使用更快、更现代的 `Object.values()`。

:::

返回对象自身可枚举属性值的数组。

```typescript
const valueArray = values(obj);
```

## 参考

### `values(obj)`

当您想要将对象的所有属性值作为数组获取时，使用 `values`。它与 `Object.values` 相同，但可以安全地处理 `null` 或 `undefined`。

```typescript
import { values } from 'es-toolkit/compat';

// 获取对象值
const obj = { a: 1, b: 2, c: 3 };
values(obj); // => [1, 2, 3]

// 具有数字键的对象
const numberKeyObj = { 0: 'a', 1: 'b', 2: 'c' };
values(numberKeyObj); // => ['a', 'b', 'c']
```

也可以处理数组或类数组对象。

```typescript
import { values } from 'es-toolkit/compat';

// 数组
values([1, 2, 3]); // => [1, 2, 3]

// 字符串（类数组对象）
values('hello'); // => ['h', 'e', 'l', 'l', 'o']
```

`null` 或 `undefined` 会被视为空数组。

```typescript
import { values } from 'es-toolkit/compat';

values(null); // => []
values(undefined); // => []
```

仅返回可枚举属性。

```typescript
import { values } from 'es-toolkit/compat';

const obj = Object.create(
  { inherited: 'not included' },
  {
    own: { value: 'included', enumerable: true },
    nonEnum: { value: 'not included', enumerable: false },
  }
);

values(obj); // => ['included']
```

#### 参数

- `obj` (`Record<PropertyKey, T> | ArrayLike<T> | null | undefined`): 要获取属性值的对象。

#### 返回值

(`T[]`): 返回对象的可枚举属性值数组。
