# extend (Lodash 兼容性)

::: warning 请使用 `Object.assign()`

这个 `extend` 函数由于处理从原型链继承的属性的复杂逻辑而运行较慢。

请使用更快、更现代的 `Object.assign()`。

:::

将对象的自有属性和继承属性复制到另一个对象。

```typescript
const result = extend(object, source);
```

## 参考

### `extend(object, ...sources)`

使用 `extend` 将属性从一个对象复制到另一个对象。类似于 `Object.assign()`,但也会复制继承的属性。此函数是 `assignIn` 的别名。

```typescript
import { extend } from 'es-toolkit/compat';

// 复制基本属性
const target = { a: 1 };
extend(target, { b: 2 }, { c: 3 });
// 返回值: { a: 1, b: 2, c: 3 }

// 也会复制继承的属性
function Parent() {
  this.a = 1;
}
Parent.prototype.b = 2;

const source = new Parent();
extend({}, source);
// 返回值: { a: 1, b: 2 }
```

当存在相同属性时,后面的源对象的值会覆盖前面的。

```typescript
import { extend } from 'es-toolkit/compat';

extend({ a: 1, b: 2 }, { b: 3 }, { c: 4 });
// 返回值: { a: 1, b: 3, c: 4 }
```

#### 参数

- `object` (`any`): 接收属性的目标对象。
- `...sources` (`any[]`): 提供属性的源对象。

#### 返回值

(`any`): 返回复制了属性的对象。第一个参数 `object` 会被修改。
