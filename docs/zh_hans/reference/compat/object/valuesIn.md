# valuesIn (Lodash 兼容性)

::: warning 请使用 `Object.values`

此 `valuesIn` 函数由于处理原型属性的复杂逻辑而运行缓慢。

请使用更快、更现代的 `Object.values`。

:::

返回对象所有属性值的数组,包括继承的原型属性。

```typescript
const values = valuesIn(obj);
```

## 用法

### `valuesIn(object)`

当您想从对象获取所有属性值作为数组时,请使用 `valuesIn`。与普通的 `Object.values` 不同,它还包括从原型链继承的属性值。

```typescript
import { valuesIn } from 'es-toolkit/compat';

const obj = { a: 1, b: 2, c: 3 };
valuesIn(obj); // [1, 2, 3]

// 也可以处理数组
valuesIn([1, 2, 3]); // [1, 2, 3]
```

包括从原型继承的属性。

```typescript
import { valuesIn } from 'es-toolkit/compat';

function Parent() {
  this.a = 1;
}
Parent.prototype.inherited = 'fromParent';

function Child() {
  Parent.call(this);
  this.b = 2;
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.childProp = 'childValue';

const obj = new Child();
valuesIn(obj); // [1, 2, 'childValue', 'fromParent'] (排除 constructor)
```

将 `null` 或 `undefined` 处理为空数组。

```typescript
import { valuesIn } from 'es-toolkit/compat';

valuesIn(null); // []
valuesIn(undefined); // []
```

#### 参数

- `object` (`any`): 要查询值的对象。

#### 返回值

(`any[]`): 返回包含对象所有属性值的数组。包括继承的原型属性的值。
