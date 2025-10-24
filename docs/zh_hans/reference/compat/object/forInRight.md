# forInRight (Lodash 兼容性)

::: warning 使用 `Object.keys` 和 `for...in` 循环

由于需要创建键数组、反向迭代以及处理 `null` 或 `undefined`,这个 `forInRight` 函数的性能较慢。

请使用更快、更现代的 `Object.keys` 和 `for...in` 循环。

:::

按反向顺序迭代对象的所有属性(包括继承的属性),并对每个属性调用函数。

```typescript
const result = forInRight(obj, iteratee);
```

## 参考

### `forInRight(object, iteratee)`

按反向顺序迭代对象的所有属性,调用 `iteratee` 函数。它不仅迭代对象的自有属性,还包括通过原型链继承的属性。由于它将键收集到数组中然后反向迭代,因此比正常迭代慢。如果 `iteratee` 函数返回 `false`,则停止迭代。

```typescript
import { forInRight } from 'es-toolkit/compat';

// 按反向顺序迭代所有属性
const obj = { a: 1, b: 2 };
forInRight(obj, (value, key) => {
  console.log(key, value);
});
// 输出: 'b' 2, 'a' 1

// 包括继承属性的反向迭代
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.protoProperty = 'proto';

const child = new Parent();
child.own = 'ownValue';

forInRight(child, (value, key) => {
  console.log(key, value);
});
// 输出: 'protoProperty' 'proto', 'own' 'ownValue', 'inherited' 'value'

// 根据条件提前终止
forInRight(obj, (value, key) => {
  console.log(key, value);
  return key !== 'a'; // 在 'a' 处停止
});
// 输出: 'b' 2, 'a' 1
```

`null` 或 `undefined` 会原样返回。

```typescript
import { forInRight } from 'es-toolkit/compat';

forInRight(null, iteratee); // null
forInRight(undefined, iteratee); // undefined
```

#### 参数

- `object` (`T | null | undefined`): 要迭代的对象。
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`, 可选): 对每个属性调用的函数。默认为 `identity` 函数。

#### 返回值

(`T | null | undefined`): 返回原始对象。
