# keysIn (Lodash 兼容性)

::: warning 请使用 `for...in` 循环或 `Object.keys`

这个 `keysIn` 函数由于处理类数组对象和遍历原型链等复杂逻辑而运行缓慢。

请改用更快、更现代的 `for...in` 循环或根据需要使用 `Object.keys()`。

:::

返回对象的所有可枚举属性名称的数组,包括继承的属性。

```typescript
const allKeys = keysIn(object);
```

## 用法

### `keysIn(object)`

当您想要获取对象的所有属性名称(包括继承的属性)时,请使用 `keysIn`。与 `keys` 不同,它还返回原型链中的属性。

```typescript
import { keysIn } from 'es-toolkit/compat';

// 基本对象的键
const object = { a: 1, b: 2 };
keysIn(object);
// => ['a', 'b']

// 数组的索引
const array = [1, 2, 3];
keysIn(array);
// => ['0', '1', '2']

// 字符串的索引
keysIn('hello');
// => ['0', '1', '2', '3', '4']
```

它也包括继承的属性。

```typescript
import { keysIn } from 'es-toolkit/compat';

function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;

keysIn(new Foo());
// => ['a', 'b', 'c'] (包括原型属性 'c')

// 排除 constructor
class MyClass {
  constructor() {
    this.prop = 1;
  }
  method() {}
}
MyClass.prototype.inherited = 2;

keysIn(new MyClass());
// => ['prop', 'method', 'inherited'] (排除了 constructor)
```

它特殊处理类数组对象。

```typescript
import { keysIn } from 'es-toolkit/compat';

// TypedArray
const typedArray = new Uint8Array([1, 2, 3]);
keysIn(typedArray);
// => ['0', '1', '2'] (排除 buffer、byteLength 等)

// arguments 对象
function example() {
  return keysIn(arguments);
}
example('a', 'b', 'c');
// => ['0', '1', '2']
```

它安全地处理 `null` 或 `undefined`。

```typescript
import { keysIn } from 'es-toolkit/compat';

keysIn(null);
// => []

keysIn(undefined);
// => []
```

#### 参数

- `object` (`any`): 要获取键的对象。

#### 返回值

(`string[]`): 返回对象的所有可枚举属性名称(包括自有属性和继承属性)的数组。
