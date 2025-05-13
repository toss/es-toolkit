# invokeMap

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](mdc:../../../compatibility.md)します。
:::

コレクションの各要素の `path` にあるメソッドを呼び出し、呼び出された各メソッドの結果を配列として返します。追加の引数は、呼び出される各メソッドに渡されます。`path` が関数の場合、コレクションの各要素に対して呼び出され、`this` が各要素にバインドされます。

## インターフェース

```typescript
function invokeMap<T, R>(
  collection: T[] | Record<string, T> | null | undefined,
  path: PropertyKey | PropertyKey[] | ((this: T, ...args: any[]) => R),
  ...args: unknown[]
): Array<R | undefined>;
```

### パラメータ

- `collection` (`T[] | Record<string, T> | null | undefined`): 反復処理するコレクションです。
- `path` (`PropertyKey | PropertyKey[] | ((this: T, ...args: any[]) => R)`): 呼び出すメソッドのパス（文字列、数値、シンボル、またはこれらの配列）または呼び出す関数です。
- `args` (`...unknown[]`): 各メソッドを呼び出す際に渡す引数です。

### 戻り値

(`Array<R | undefined>`): 結果の配列を返します。パスが見つからないか、メソッドの呼び出し結果が `undefined` の場合、その要素は `undefined` となります。

## 例

```typescript
import { invokeMap } from 'es-toolkit/compat';

// 各要素のメソッドを呼び出す
invokeMap(['a', 'b', 'c'], 'toUpperCase');
// => ['A', 'B', 'C']

// 引数付きでメソッドを呼び出す
invokeMap(
  [
    [5, 1, 7],
    [3, 2, 1],
  ],
  'sort'
);
// => [[1, 5, 7], [1, 2, 3]]

// オブジェクトの各値に対してメソッドを呼び出す
invokeMap({ a: 1, b: 2, c: 3 }, 'toFixed', 1);
// => ['1.0', '2.0', '3.0']

// メソッド名の代わりに関数を使用する
invokeMap(
  ['a', 'b', 'c'],
  function (this: string, prefix: string, suffix: string) {
    return prefix + this.toUpperCase() + suffix;
  },
  '(',
  ')'
);
// => ['(A)', '(B)', '(C)']

invokeMap([123, 456], String.prototype.split, '');
// => [['1', '2', '3'], ['4', '5', '6']]
```
