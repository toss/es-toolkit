# fromPairs

キーと値のペアの配列をオブジェクトに変換します。

```typescript
const object = fromPairs(pairs);
```

## 使い方

### `fromPairs(pairs)`

キーと値のペアの配列を1つのオブジェクトに変換したい場合は、`fromPairs`を使用してください。各ペアは2つの要素を持つ配列である必要があり、最初の要素がキーになり、2番目の要素が値になります。

この関数は、`Object.entries`またはオブジェクトをキーと値のペアの配列に変換する類似の関数の逆関数です。

```typescript
import { fromPairs } from 'es-toolkit/array';

// キーと値のペアをオブジェクトに変換
const pairs = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];
const result = fromPairs(pairs);
// 結果: { a: 1, b: 2, c: 3 }

// 異なるキータイプで動作
const symbolKey = Symbol('key');
const mixedPairs = [
  ['stringKey', 'value1'],
  [42, 'value2'],
  [symbolKey, 'value3'],
];
const mixedResult = fromPairs(mixedPairs);
// 結果: { stringKey: 'value1', 42: 'value2', [symbolKey]: 'value3' }
```

重複したキーがある場合、最後の値が使用されます。

```typescript
import { fromPairs } from 'es-toolkit/array';

const duplicatePairs = [
  ['a', 1],
  ['b', 2],
  ['a', 3],
];
const result = fromPairs(duplicatePairs);
// 結果: { a: 3, b: 2 }
```

#### パラメータ

- `pairs` (`ReadonlyArray<readonly [K, V]>`): オブジェクトに変換するキーと値のペアの配列。

#### 戻り値

(`Record<K, V>`): キーと値のペアから作成された新しいオブジェクトを返します。
