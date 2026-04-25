# isMatch (Lodash 互換性)

オブジェクトが他のオブジェクトの形状と値に部分的に一致するかどうかを確認します。

```typescript
const result = isMatch(target, source);
```

## 使用法

### `isMatch(target, source)`

オブジェクトや配列が他のオブジェクトの構造と値に部分的に一致するかどうかを確認する際に `isMatch` を使用してください。全体が同一である必要はなく、sourceのすべてのプロパティがtargetに存在し、同じ値を持っていれば十分です。

```typescript
import { isMatch } from 'es-toolkit/compat';

// オブジェクトの部分一致
isMatch({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 }); // true (a, bが一致)
isMatch({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 }); // false (cがtargetにない)

// ネストしたオブジェクト
isMatch({ user: { name: 'Alice', age: 25, city: 'Seoul' } }, { user: { name: 'Alice', age: 25 } }); // true

// 配列の部分一致（順序無関）
isMatch([1, 2, 3, 4], [2, 4]); // true (2と4が配列にある)
isMatch([1, 2, 3], [1, 2, 3]); // true (完全一致)
isMatch([1, 2], [1, 2, 3]); // false (3がtargetにない)

// Mapの部分一致
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

// Setの部分一致
const targetSet = new Set([1, 2, 3, 4]);
const sourceSet = new Set([2, 4]);
isMatch(targetSet, sourceSet); // true

// 空のsourceは常にtrue
isMatch({ a: 1 }, {}); // true
isMatch([1, 2, 3], []); // true
```

より直接的で高速な方法：

```typescript
// 完全等価性の確認（より高速）
import { isEqual } from 'es-toolkit';

isEqual(obj1, obj2);

// 特定のプロパティの確認（より明確）
target.a === source.a && target.b === source.b;

// オブジェクト構造の確認
Object.keys(source).every(key => target[key] === source[key]);
```

#### パラメータ

- `target` (`unknown`): 一致するかどうかを確認するオブジェクトです。
- `source` (`unknown`): 一致パターンとなるオブジェクトです。

#### 戻り値

(`boolean`): targetがsourceの形状と値に部分的に一致する場合は `true`、そうでなければ `false` を返します。
