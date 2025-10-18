# flatMapDepth (Lodash 互換性)

::: warning `es-toolkit`の[flatMap](../../array/flatMap.md)を使用してください

この`flatMapDepth`関数は、Lodashとの互換性のために様々な形式のイテレータをサポートし、`null`や`undefined`の処理などにより複雑に実装されています。メインライブラリの`flatMap`関数はシンプルな関数イテレータのみをサポートするため、より高速に動作します。

代わりに、より高速で現代的な`es-toolkit`の[flatMap](../../array/flatMap.md)を使用してください。

:::

配列の各要素をイテレータ関数で変換した後、指定された深さまで平坦化します。

```typescript
const result = flatMapDepth(collection, iteratee, depth);
```

## 参照

### `flatMapDepth(collection, iteratee, depth)`

配列またはオブジェクトの各要素を与えられた関数で変換した後、結果を指定された深さまで平坦化して新しい配列として返します。ネストされた配列構造を望む深さまでのみ平坦化したいときに便利です。

```typescript
import { flatMapDepth } from 'es-toolkit/compat';

// 配列を変換して深さ2まで平坦化
flatMapDepth([1, 2], n => [[n, n]], 2);
// => [1, 1, 2, 2]

// 深さ1に制限すると完全に平坦化されません
flatMapDepth([1, 2], n => [[n, n]], 1);
// => [[1, 1], [2, 2]]

// オブジェクトから値を抽出して平坦化
const users = [
  { user: 'barney', hobbies: [['hiking'], ['coding']] },
  { user: 'fred', hobbies: [['reading']] },
];
flatMapDepth(users, 'hobbies', 2);
// => ['hiking', 'coding', 'reading']
```

この関数は様々な形式のイテレータをサポートします。

```typescript
import { flatMapDepth } from 'es-toolkit/compat';

// 関数を使用した変換
flatMapDepth([1, 2, 3], n => [[n, n]], 2);

// プロパティ名で値を抽出
const objects = [{ items: [['a'], ['b']] }, { items: [['c']] }];
flatMapDepth(objects, 'items', 2);
// => ['a', 'b', 'c']

// オブジェクトの部分一致
const users = [{ active: [[true], [false]] }, { active: [[false]] }];
flatMapDepth(users, { active: [[false]] }, 2);
// => [false]
```

`null`または`undefined`は空の配列として処理されます。

```typescript
import { flatMapDepth } from 'es-toolkit/compat';

flatMapDepth(null, n => [n], 1); // => []
flatMapDepth(undefined, n => [n], 1); // => []
```

#### パラメータ

- `collection` (`ArrayLike<T> | Record<string, any> | Record<number, any> | object | null | undefined`): 反復処理する配列またはオブジェクトです。
- `iteratee` (`((value: T, index: number, collection: any) => any) | string | object`, オプション): 各要素に対して実行する変換関数またはプロパティ名です。デフォルトは`identity`です。
- `depth` (`number`, オプション): 平坦化する最大深さです。デフォルトは`1`です。

#### 戻り値

(`T[]`): イテレータで変換された後、指定された深さまで平坦化された新しい配列を返します。
