# invertBy (Lodash 互換性)

::: warning 現代的な JavaScript API を使用してください

この `invertBy` 関数は、複雑なイテレータ処理とグループ化ロジックにより、動作が遅くなります。

代わりに、より高速で現代的な `Object.entries()` と `reduce()` または `Map` を使用してください。

:::

オブジェクトのキーと値を反転し、同じ値を配列にグループ化します。

```typescript
const inverted = invertBy(object, iteratee);
```

## 参照

### `invertBy(object, iteratee?)`

オブジェクトのキーと値を反転し、同じ値を持つキーを配列にグループ化したい場合は、`invertBy` を使用してください。オプションでイテレータ関数を提供して値を変換できます。

```typescript
import { invertBy } from 'es-toolkit/compat';

// 基本的なキーと値の反転(同じ値が配列にグループ化されます)
const object = { a: 1, b: 2, c: 1 };
invertBy(object);
// => { '1': ['a', 'c'], '2': ['b'] }

// イテレータ関数を使用した値の変換
const ages = { john: 25, jane: 30, bob: 25 };
invertBy(ages, age => `age_${age}`);
// => { 'age_25': ['john', 'bob'], 'age_30': ['jane'] }

// 文字列の長さでグループ化
const words = { a: 'hello', b: 'world', c: 'hi', d: 'test' };
invertBy(words, word => word.length);
// => { '5': ['a', 'b'], '2': ['c'], '4': ['d'] }
```

オブジェクトのプロパティでグループ化することもできます。

```typescript
import { invertBy } from 'es-toolkit/compat';

// オブジェクトのプロパティでグループ化
const users = {
  user1: { department: 'IT', age: 30 },
  user2: { department: 'HR', age: 25 },
  user3: { department: 'IT', age: 35 },
};

invertBy(users, user => user.department);
// => { 'IT': ['user1', 'user3'], 'HR': ['user2'] }
```

`null` または `undefined` を安全に処理します。

```typescript
import { invertBy } from 'es-toolkit/compat';

invertBy(null);
// => {}

invertBy(undefined);
// => {}
```

#### パラメータ

- `object` (`object`): 反転するオブジェクトです。
- `iteratee` (`ValueIteratee`, オプション): 値を変換する関数です。デフォルトは値をそのまま使用する関数です。

#### 戻り値

(`Record<string, string[]>`): 変換された値をキーとし、元のキーの配列を値とする新しいオブジェクトを返します。
