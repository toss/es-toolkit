# toPlainObject (Lodash 兼容性)

::: warning 使用 Object.assign 或扩展运算符

这个 `toPlainObject` 函数由于复杂的原型处理和键枚举而运行缓慢。

改为使用更快、更现代的 Object.assign({}, obj) 或 {...obj}。

:::

将值转换为普通对象。

```typescript
const plainObj = toPlainObject(value);
```

## 用法

### `toPlainObject(value)`

将值转换为普通对象。将继承的可枚举字符串键属性扁平化为自身属性。

```typescript
import { toPlainObject } from 'es-toolkit/compat';

// 构造函数和原型
function Foo() {
  this.b = 2;
}
Foo.prototype.c = 3;

const foo = new Foo();
toPlainObject(foo);
// Returns: { b: 2, c: 3 }

// 将数组转换为对象
toPlainObject([1, 2, 3]);
// Returns: { 0: 1, 1: 2, 2: 3 }
```

处理各种对象类型。

```typescript
import { toPlainObject } from 'es-toolkit/compat';

// 将字符串转换为对象
toPlainObject('abc');
// Returns: { 0: 'a', 1: 'b', 2: 'c' }

// 已经是普通对象的情况
const obj = { a: 1, b: 2 };
toPlainObject(obj);
// Returns: { a: 1, b: 2 }
```

#### 参数

- `value` (`any`): 要转换的值。

#### 返回值

(`any`): 返回普通对象，继承的可枚举属性扁平化为自身属性。
