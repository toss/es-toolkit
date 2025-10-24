# clone (Lodash 互換性)

::: warning `es-toolkit`の`clone`を使用してください

この `clone` 関数は、特殊なオブジェクトタイプを処理する複雑なロジックにより相対的に遅くなります。

代わりに、より高速で現代的な `es-toolkit` の [clone](../../object/clone.md) を使用してください。

:::

オブジェクトの浅いコピーを作成します。

```typescript
const cloned = clone(value);
```

## 参照

### `clone(value)`

値の浅いコピーを作成したい場合は、`clone`を使用してください。さまざまなタイプのオブジェクトと原始値をコピーできます。

```typescript
import { clone } from 'es-toolkit/compat';

// 原始値のコピー
const num = 42;
const clonedNum = clone(num);
// Returns: 42 (同じ値)

// 配列のコピー
const arr = [1, 2, 3];
const clonedArr = clone(arr);
// Returns: [1, 2, 3] (新しい配列インスタンス)

// オブジェクトのコピー
const obj = { a: 1, b: 'hello' };
const clonedObj = clone(obj);
// Returns: { a: 1, b: 'hello' } (新しいオブジェクトインスタンス)

// Dateオブジェクトのコピー
const date = new Date('2023-01-01');
const clonedDate = clone(date);
// Returns: new Date('2023-01-01') (新しいDateインスタンス)

// 正規表現のコピー
const regex = /hello/gi;
regex.lastIndex = 3;
const clonedRegex = clone(regex);
// Returns: /hello/gi with lastIndex = 3

// Mapのコピー
const map = new Map([
  ['a', 1],
  ['b', 2],
]);
const clonedMap = clone(map);
// Returns: new Map([['a', 1], ['b', 2]])

// Setのコピー
const set = new Set([1, 2, 3]);
const clonedSet = clone(set);
// Returns: new Set([1, 2, 3])
```

ネストされたオブジェクトは浅いコピーのみが行われます。

```typescript
import { clone } from 'es-toolkit/compat';

const nested = {
  a: 1,
  b: {
    c: 2,
  },
};
const clonedNested = clone(nested);

console.log(clonedNested !== nested); // true (異なるオブジェクト)
console.log(clonedNested.b === nested.b); // true (ネストされたオブジェクトは同じ参照)
```

#### パラメータ

- `value` (`T`): コピーする値です。

#### 戻り値

(`T`): コピーされた値を返します。
