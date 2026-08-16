# keys (Lodash 兼容性)

::: warning 请使用 `Object.keys`

由于处理类数组对象、原型对象等复杂逻辑,此 `keys` 函数运行较慢。

建议使用更快、更现代的 `Object.keys()`。

:::

返回对象自身可枚举属性名称的数组。

```typescript
const keyArray = keys(object);
```

## 用法

### `keys(object)`

当您想要获取对象的自身属性名称时,使用 `keys`。它只返回自身属性,不包括继承的属性。

```typescript
import { keys } from 'es-toolkit/compat';

// 基本对象的键
const object = { a: 1, b: 2, c: 3 };
keys(object);
// => ['a', 'b', 'c']

// 数组的索引
const array = [1, 2, 3];
keys(array);
// => ['0', '1', '2']

// 字符串的索引
keys('hello');
// => ['0', '1', '2', '3', '4']
```

从函数或构造函数继承的属性会被排除。

```typescript
import { keys } from 'es-toolkit/compat';

function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;

keys(new Foo());
// => ['a', 'b'] ('c' 被排除,因为它是原型属性)
```

类数组对象会被特殊处理。

```typescript
import { keys } from 'es-toolkit/compat';

// TypedArray
const typedArray = new Uint8Array([1, 2, 3]);
keys(typedArray);
// => ['0', '1', '2']

// arguments 对象
function example() {
  return keys(arguments);
}
example('a', 'b', 'c');
// => ['0', '1', '2']
```

安全处理 `null` 和 `undefined`。

```typescript
import { keys } from 'es-toolkit/compat';

keys(null);
// => []

keys(undefined);
// => []
```

#### 参数

- `object` (`any`): 要获取键的对象。

#### 返回值

(`string[]`): 返回对象自身可枚举属性名称的数组。
