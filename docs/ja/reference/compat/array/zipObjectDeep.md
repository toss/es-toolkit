# zipObjectDeep (Lodash互換)

パス配列と値配列を使用して深くネストしたオブジェクトを作成します。

```typescript
const result = zipObjectDeep(keys, values);
```

## 参照

### `zipObjectDeep(keys, values)`

最初の配列のパスと2番目の配列の値を使用して深くネストしたオブジェクトを生成します。パスはドット表記文字列またはプロパティ名の配列として提供できます。複雑なネストしたデータ構造を生成したり、フラットなキー値ペアを階層オブジェクトに変換するときに便利です。

```typescript
import { zipObjectDeep } from 'es-toolkit/compat';

// パスをドット表記文字列として指定
const paths = ['a.b.c', 'd.e.f'];
const values = [1, 2];
const result = zipObjectDeep(paths, values);
// 戻り値: { a: { b: { c: 1 } }, d: { e: { f: 2 } } }

// パスを配列として指定
const pathArrays = [
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
];
const values2 = [1, 2];
const result2 = zipObjectDeep(pathArrays, values2);
// 戻り値: { a: { b: { c: 1 } }, d: { e: { f: 2 } } }

// 配列インデックスを含むパス
const arrayPaths = ['a.b[0].c', 'a.b[1].d'];
const values3 = [1, 2];
const result3 = zipObjectDeep(arrayPaths, values3);
// 戻り値: { a: { b: [{ c: 1 }, { d: 2 }] } }
```

`null`または`undefined`のキー配列は空オブジェクトとして扱われます。

```typescript
import { zipObjectDeep } from 'es-toolkit/compat';

zipObjectDeep(null, [1, 2]); // {}
zipObjectDeep(undefined, [1, 2]); // {}
```

#### パラメータ

- `keys` (`ArrayLike<PropertyPath> | null | undefined`): プロパティパスの配列。ドット表記文字列またはプロパティ名の配列を使用できます。
- `values` (`ArrayLike<any>`, 選択): 対応する値の配列。提供しない場合、空配列として扱われます。

#### 戻り値

(`object`): 与えられたパスと値で構成された深くネストしたオブジェクトを返します。
