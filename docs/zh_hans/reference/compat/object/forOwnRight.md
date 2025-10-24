# forOwnRight (Lodash 兼容性)

::: warning 使用 `Object.keys` 和循环
此 `forOwnRight` 函数由于内部调用 `keys` 函数、对象转换过程和反向迭代而运行缓慢。

请使用更快、更现代的 `Object.keys` 和循环。

:::

以相反的顺序仅迭代对象的自有属性,为每个属性调用函数。

```typescript
const result = forOwnRight(obj, iteratee);
```

## 参考

### `forOwnRight(object, iteratee)`

以相反的顺序仅迭代对象的自有属性,调用 `iteratee` 函数。它以相反的顺序仅迭代对象直接拥有的属性,排除继承的属性和 `Symbol` 键。由于它将键收集到数组中然后以相反的顺序迭代,因此比正常迭代慢。如果 `iteratee` 函数返回 `false`,则停止迭代。

```typescript
import { forOwnRight } from 'es-toolkit/compat';

// 以相反的顺序仅迭代自有属性
const obj = { a: 1, b: 2 };
forOwnRight(obj, (value, key) => {
  console.log(key, value);
});
// 输出: 'b' 2, 'a' 1

// 以相反的顺序迭代,排除继承的属性
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.protoProperty = 'proto';

const child = new Parent();
child.own = 'ownValue';

forOwnRight(child, (value, key) => {
  console.log(key, value);
});
// 输出: 'own' 'ownValue', 'inherited' 'value' (protoProperty 被排除)

// 根据条件提前终止
forOwnRight(obj, (value, key) => {
  console.log(key, value);
  return key !== 'a'; // 在 'a' 处停止
});
// 输出: 'b' 2, 'a' 1
```

`null` 或 `undefined` 按原样返回。

```typescript
import { forOwnRight } from 'es-toolkit/compat';

forOwnRight(null, iteratee); // null
forOwnRight(undefined, iteratee); // undefined
```

#### 参数

- `object` (`T | null | undefined`): 要迭代的对象。
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`, 可选): 为每个属性调用的函数。默认为 `identity` 函数。

#### 返回值

(`T | null | undefined`): 返回原始对象。
