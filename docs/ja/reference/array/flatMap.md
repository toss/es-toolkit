# flatMap

ネストされた配列の各要素を与えられたイテレータ関数でマッピングし、指定された深さまで平坦化します。

JavaScriptに組み込まれている[Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)を[Array#map](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map)と組み合わせて`map(iteratee).flat(depth)`として呼び出した場合と同じように動作しますが、より高速です。

## インターフェース

```typescript
function flatMap<T, U, D extends number = 1>(arr: T[], iteratee: (item: T) => U, depth?: D): Array<FlatArray<U[], D>>;
```

### パラメータ

- `arr` (`T[]`): 平坦化するネストされた配列です。
- `iteratee` (`T[]`): 各配列要素をマッピングする関数です。
- `depth` (`D`): 平坦化する深さです。デフォルト値は1です。

### 戻り値

(`Array<FlatArray<U[], D>>`): 各要素がマッピングされ、指定された深さまで平坦化された新しい配列です。

## 例

```typescript
const array = [1, 2, 3];

const result1 = flatMap(array, item => [item, item], 1);
// [1, 1, 2, 2, 3, 3]を返します。

const result2 = flatMap(array, item => [[item, item]], 2);
// [1, 1, 2, 2, 3, 3]を返します。

const result3 = flatMap(array, item => [[[item, item]]], 3);
// [1, 1, 2, 2, 3, 3]を返します。
```
