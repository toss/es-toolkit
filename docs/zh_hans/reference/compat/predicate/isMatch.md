# isMatch (Lodash 兼容性)

检查对象是否部分匹配另一个对象的形状和值。

```typescript
const result = isMatch(target, source);
```

## 参考

### `isMatch(target, source)`

使用 `isMatch` 检查对象或数组是否部分匹配另一个对象的结构和值。不需要完全相同，只要 source 的所有属性都存在于 target 中且具有相同的值即可。

```typescript
import { isMatch } from 'es-toolkit/compat';

// 对象部分匹配
isMatch({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 }); // true (a, b 匹配)
isMatch({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 }); // false (target 中没有 c)

// 嵌套对象
isMatch({ user: { name: 'Alice', age: 25, city: 'Seoul' } }, { user: { name: 'Alice', age: 25 } }); // true

// 数组部分匹配（顺序无关）
isMatch([1, 2, 3, 4], [2, 4]); // true (数组中有 2 和 4)
isMatch([1, 2, 3], [1, 2, 3]); // true (完全匹配)
isMatch([1, 2], [1, 2, 3]); // false (target 中没有 3)

// Map 部分匹配
const targetMap = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);
const sourceMap = new Map([
  ['a', 1],
  ['b', 2],
]);
isMatch(targetMap, sourceMap); // true

// Set 部分匹配
const targetSet = new Set([1, 2, 3, 4]);
const sourceSet = new Set([2, 4]);
isMatch(targetSet, sourceSet); // true

// 空 source 总是返回 true
isMatch({ a: 1 }, {}); // true
isMatch([1, 2, 3], []); // true
```

更直接且快速的方法：

```typescript
// 完全相等性检查（更快）
import { isEqual } from 'es-toolkit';

isEqual(obj1, obj2);

// 特定属性检查（更明确）
target.a === source.a && target.b === source.b;

// 对象结构检查
Object.keys(source).every(key => target[key] === source[key]);
```

#### 参数

- `target` (`unknown`): 要检查是否匹配的对象。
- `source` (`unknown`): 作为匹配模式的对象。

#### 返回值

(`boolean`): 如果 target 部分匹配 source 的形状和值，则返回 `true`，否则返回 `false`。
