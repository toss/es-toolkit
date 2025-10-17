# toPairs (Lodash 互換性)

::: warning `Object.entries` を使用してください

この `toPairs` 関数は `Map` と `Set` の処理、配列風オブジェクトの処理などの複雑なロジックにより遅く動作します。

代わりに、より高速で現代的な `Object.entries()` を使用してください。

:::

オブジェクトをキー値ペアの配列に変換します。

```typescript
const pairs = toPairs(object);
```

## 参照

### `toPairs(object)`

オブジェクトの自身の列挙可能なプロパティを `[キー, 値]` 形式の配列に変換したい場合は、`toPairs` を使用してください。継承されたプロパティは含まれません。

```typescript
import { toPairs } from 'es-toolkit/compat';

// 基本的なオブジェクトの変換
const object = { a: 1, b: 2, c: 3 };
toPairs(object);
// => [['a', 1], ['b', 2], ['c', 3]]

// 数値キーを持つオブジェクト
const numbers = { 0: 'zero', 1: 'one', 2: 'two' };
toPairs(numbers);
// => [['0', 'zero'], ['1', 'one'], ['2', 'two']]
```

`Map` と `Set` も処理できます。

```typescript
import { toPairs } from 'es-toolkit/compat';

// Map オブジェクトの変換
const map = new Map();
map.set('name', 'John');
map.set('age', 30);
toPairs(map);
// => [['name', 'John'], ['age', 30]]

// Set オブジェクトの変換(値がキーと同じ)
const set = new Set([1, 2, 3]);
toPairs(set);
// => [[1, 1], [2, 2], [3, 3]]
```

`null` または `undefined` を安全に処理します。

```typescript
import { toPairs } from 'es-toolkit/compat';

toPairs(null);
// => []

toPairs(undefined);
// => []
```

#### パラメータ

- `object` (`object`): 変換するオブジェクト、Map、または Set。

#### 戻り値

(`Array<[string, any]>`): キー値ペアの配列を返します。
