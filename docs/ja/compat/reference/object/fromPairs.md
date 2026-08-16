# fromPairs (Lodash 互換性)

::: warning `Object.fromEntries`を使用してください

この `fromPairs` 関数は、配列様オブジェクトのチェックと反復処理により動作が遅くなります。

代わりに、より高速で現代的な `Object.fromEntries` を使用してください。

:::

キーと値のペアの配列をオブジェクトに変換します。

```typescript
const result = fromPairs(pairs);
```

## 使用法

### `fromPairs(pairs)`

キーと値のペアからなる配列を受け取り、オブジェクトに変換します。各キーと値のペアは2つの要素を持つ配列である必要があります。最初の要素がキーになり、2番目の要素が値になります。データを整理または変換する際に便利です。

```typescript
import { fromPairs } from 'es-toolkit/compat';

// 基本的なキーと値のペアの変換
const pairs = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];
const result = fromPairs(pairs);
// 結果: { a: 1, b: 2, c: 3 }

// 様々な値の型を処理
const mixedPairs = [
  ['name', 'John'],
  ['age', 30],
  ['active', true],
];
const user = fromPairs(mixedPairs);
// 結果: { name: 'John', age: 30, active: true }
```

`null`、`undefined`、または配列様オブジェクトでない値は空のオブジェクトとして処理されます。

```typescript
import { fromPairs } from 'es-toolkit/compat';

fromPairs(null); // {}
fromPairs(undefined); // {}
fromPairs('invalid'); // {}
```

#### パラメータ

- `pairs` (`ArrayLike<[PropertyName, T]> | ArrayLike<any[]> | null | undefined`): オブジェクトに変換するキーと値のペアの配列です。

#### 戻り値

(`Record<string, any> | Record<string, T>`): キーと値のペアから生成されたオブジェクトを返します。
