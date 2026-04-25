# map (Lodash互換性)

::: warning `Array.prototype.map`を使用してください

この`map`関数は`null`や`undefined`の処理、オブジェクトの反復処理、プロパティ抽出などの追加機能により遅く動作します。配列を変換する場合、JavaScriptの組み込み`Array.prototype.map`メソッドの方が高速でシンプルです。

代わりに、より高速でモダンな`Array.prototype.map`を使用してください。

:::

配列またはオブジェクトの各要素を変換して新しい配列を作成します。

```typescript
const mapped = map(collection, iteratee);
```

## 使用法

### `map(collection, iteratee)`

配列、オブジェクト、または配列風オブジェクトの各要素を変換したいときに`map`を使用してください。各要素に対して反復関数を実行し、結果を新しい配列として返します。

```typescript
import { map } from 'es-toolkit/compat';

// 配列の各要素を2倍にする
map([1, 2, 3], x => x * 2);
// Returns: [2, 4, 6]

// オブジェクトの値を変換する
const obj = { a: 1, b: 2 };
map(obj, (value, key) => `${key}:${value}`);
// Returns: ['a:1', 'b:2']

// プロパティを抽出する
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
];
map(users, 'name');
// Returns: ['John', 'Jane']
```

`null`や`undefined`は空の配列として扱われます。

```typescript
import { map } from 'es-toolkit/compat';

map(null, x => x); // []
map(undefined, x => x); // []
```

文字列でプロパティパスを指定すると、ネストされたプロパティも抽出できます。

```typescript
import { map } from 'es-toolkit/compat';

const users = [{ info: { name: 'John' } }, { info: { name: 'Jane' } }];
map(users, 'info.name');
// Returns: ['John', 'Jane']
```

オブジェクトを渡すと、各要素がそのオブジェクトと一致するかを確認します。

```typescript
import { map } from 'es-toolkit/compat';

const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
];
map(users, { age: 30 });
// Returns: [true, false]
```

#### パラメータ

- `collection` (`T[] | ArrayLike<T> | Record<string, T> | null | undefined`): 反復処理する配列またはオブジェクトです。
- `iteratee` (`function | string | object`, オプション): 各要素に対して実行する関数、プロパティパス、または一致させるオブジェクトです。提供しない場合、各要素をそのまま返します。
  - 関数の場合、`(value, key, collection)`の形式で呼び出されます。
  - 文字列の場合、そのプロパティを抽出します。
  - オブジェクトの場合、各要素がオブジェクトと一致するかを確認します。

#### 戻り値

(`U[]`): 変換された値の新しい配列を返します。
