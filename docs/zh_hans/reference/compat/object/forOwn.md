# forOwn (Lodash 兼容性)

::: warning 请使用 `Object.keys` 和循环代替

这个 `forOwn` 函数由于内部调用 `keys` 函数、对象转换过程以及 `null` 或 `undefined` 处理等原因,运行速度较慢。

请使用更快、更现代的 `Object.keys` 和循环代替。

:::

仅迭代对象的自有属性,并对每个属性调用函数。

```typescript
const result = forOwn(obj, iteratee);
```

## 用法

### `forOwn(object, iteratee)`

仅迭代对象的自有属性,调用 `iteratee` 函数。它只迭代对象直接拥有的属性,排除继承的属性和 `Symbol` 键。如果 `iteratee` 函数返回 `false`,则停止迭代。

```typescript
import { forOwn } from 'es-toolkit/compat';

// 仅迭代对象的自有属性
const obj = { a: 1, b: 2 };
forOwn(obj, (value, key) => {
  console.log(key, value);
});
// 输出: 'a' 1, 'b' 2

// 排除继承的属性
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.protoProperty = 'proto';

const child = new Parent();
child.own = 'ownValue';

forOwn(child, (value, key) => {
  console.log(key, value);
});
// 输出: 'inherited' 'value', 'own' 'ownValue' (protoProperty 被排除)

// 根据条件提前终止
forOwn(obj, (value, key) => {
  console.log(key, value);
  return key !== 'a'; // 在 'a' 之后停止
});
// 输出: 'a' 1
```

`null` 或 `undefined` 按原样返回。

```typescript
import { forOwn } from 'es-toolkit/compat';

forOwn(null, iteratee); // null
forOwn(undefined, iteratee); // undefined
```

#### 参数

- `object` (`T | null | undefined`): 要迭代的对象。
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`, 可选): 为每个属性调用的函数。默认值为 `identity` 函数。

#### 返回值

(`T | null | undefined`): 返回原始对象。
