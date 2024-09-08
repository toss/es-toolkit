# flatMapDeep

ネストされた配列の各要素を与えられたイテレータ関数でマッピングし、すべての深さを展開して平坦化します。

JavaScriptに組み込まれている[Array#flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)を[Array#map](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map)と組み合わせて`map(iteratee).flat(Infinity)`として呼び出した場合と同じように動作しますが、より高速です。

## インターフェース

```typescript
function flattenDeep<T>(arr: T[]): Array<ExtractNestedArrayType<T>>;
```

### パラメータ

- `arr` (`T[]`): 平坦化するネストされた配列です。
- `iteratee` (`T[]`): 各配列要素をマッピングする関数です。

### 戻り値

(`Array<ExtractNestedArrayType<T>>`): 各要素がマッピングされ、指定された深さまで平坦化された新しい配列です。

## 例

```typescript
const array = [1, 2, 3];

const result1 = flatMapDeep(array, item => [item, item]);
// Return [1, 1, 2, 2, 3, 3]

const result2 = flatMapDeep(array, item => [[item, item]]);
// Return [1, 1, 2, 2, 3, 3]

const result3 = flatMapDeep(array, item => [[[item, item]]]);
// Return [1, 1, 2, 2, 3, 3]
```
