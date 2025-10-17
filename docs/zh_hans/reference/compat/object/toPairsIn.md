# toPairsIn (Lodash 兼容性)

::: warning 请使用 `Object.entries` 或 `for...in` 循环

此 `toPairsIn` 函数由于处理继承属性、`Map` 和 `Set` 处理等复杂逻辑而运行缓慢。

请使用更快、更现代的 `Object.entries()`,或者如果需要继承属性,请使用 `for...in` 循环。

:::

将对象转换为键值对数组,包括继承的属性。

```typescript
const pairs = toPairsIn(object);
```

## 参考

### `toPairsIn(object)`

当您想将对象的所有可枚举属性(包括继承的属性)转换为 `[键, 值]` 形式的数组时,请使用 `toPairsIn`。与 `toPairs` 不同,原型链中的属性也会被包含。

```typescript
import { toPairsIn } from 'es-toolkit/compat';

// 基本对象转换
const object = { a: 1, b: 2 };
toPairsIn(object);
// => [['a', 1], ['b', 2]]

// 包括继承的属性
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.proto = 'property';

const child = new Parent();
child.own = 'own';
toPairsIn(child);
// => [['inherited', 'value'], ['own', 'own'], ['proto', 'property']]
```

也可以处理 `Map` 和 `Set`。

```typescript
import { toPairsIn } from 'es-toolkit/compat';

// Map 对象转换
const map = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);
toPairsIn(map);
// => [['key1', 'value1'], ['key2', 'value2']]

// Set 对象转换
const set = new Set([1, 2, 3]);
toPairsIn(set);
// => [[1, 1], [2, 2], [3, 3]]
```

#### 参数

- `object` (`object`): 要转换的对象、Map 或 Set。

#### 返回值

(`Array<[string, any]>`): 返回键值对数组(包括继承的属性)。
