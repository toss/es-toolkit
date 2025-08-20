# each

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

配列 (`arr`) の要素を左から右に順に走査し、各要素に対して `callback` 関数を呼び出します。

`callback` 関数が `false` を返すと、走査を停止します。

[forEach](./forEach.md) の別名です。

## インターフェース

```ts
function each<T extends object>(object: T, callback: (value: T[keyof T], key: keyof T, object: T) => void): T;
```

### パラメータ

- `object` (`T`): 走査するオブジェクト。配列、文字列、またはオブジェクトである可能性があります。
- `callback` (`(value: T[keyof T], key: keyof T, object: T)`): 各反復で呼び出される関数。
  - `value`: 配列で現在処理中の要素。
  - `key`: 配列で現在処理中の要素のプロパティ名。
  - `object`: `each` 関数が呼び出されたオブジェクト。

### 戻り値

(`T`): `each`で走査するオブジェクト。

## 例

```ts
import { each } from 'es-toolkit/compat';

const array = [1, 2, 3];
const result: number[] = [];
// each関数を使用して配列を走査し、各要素を結果配列に追加します。
each(array, value => {
  result.push(value);
});

console.log(result); // 出力: [1, 2, 3];
```
