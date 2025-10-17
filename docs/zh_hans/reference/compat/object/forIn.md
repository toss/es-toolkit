# forIn (Lodash 兼容性)

::: warning 请使用 `Object.keys` 和 `for...in` 循环

此 `forIn` 函数由于需要处理 `null` 或 `undefined`、设置默认 `iteratee` 等原因,运行速度较慢。

请改用更快、更现代的 `Object.keys` 和 `for...in` 循环。

:::

遍历对象的所有属性(包括继承的属性),并对每个属性调用函数。

```typescript
const result = forIn(obj, iteratee);
```

## 参考

### `forIn(object, iteratee)`

遍历对象的所有属性并调用 `iteratee` 函数。它不仅遍历对象的自有属性,还遍历通过原型链继承的属性。如果 `iteratee` 函数返回 `false`,则停止遍历。

```typescript
import { forIn } from 'es-toolkit/compat';

// 遍历对象的所有属性
const obj = { a: 1, b: 2 };
forIn(obj, (value, key) => {
  console.log(key, value);
});
// 输出: 'a' 1, 'b' 2

// 包括继承属性的遍历
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.protoProperty = 'proto';

const child = new Parent();
child.own = 'ownValue';

forIn(child, (value, key) => {
  console.log(key, value);
});
// 输出: 'inherited' 'value', 'own' 'ownValue', 'protoProperty' 'proto'

// 根据条件提前退出
forIn(obj, (value, key) => {
  console.log(key, value);
  return key !== 'a'; // 在 'a' 之后停止
});
// 输出: 'a' 1
```

`null` 或 `undefined` 会原样返回。

```typescript
import { forIn } from 'es-toolkit/compat';

forIn(null, iteratee); // null
forIn(undefined, iteratee); // undefined
```

#### 参数

- `object` (`T | null | undefined`): 要遍历的对象。
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`, 可选): 为每个属性调用的函数。默认为 `identity` 函数。

#### 返回值

(`T | null | undefined`): 返回原始对象。
