# medianBy

`getValue` 関数を各要素に適用して、要素の配列の中央値を計算する関数です。

[中央値](./median.md)とは、配列をソートしたときに中央に位置する要素のことです。
配列に奇数個の要素がある場合は、中央にある要素を返します。
配列に偶数個の要素がある場合は、中央にある2つの要素の平均を返します。

空の配列が与えられた場合は、`NaN`を返します。

## インターフェース

```typescript
function medianBy<T>(items: T[], getValue: (element: T) => number): number;
```

### パラメータ

- `items` (`T[]`): 中央値を計算する配列です。
- `getValue` (`(element: T) => number`): 各要素から数値を選択する関数です。

### 戻り値

(`number`): `getValue` 関数を基準に、配列にあるすべての数値の中央値を返します。

## 例

```typescript
medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], x => x.a); // 3を返します。
medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }], x => x.a); // 2.5を返します。
medianBy([], x => x.a); // NaNを返します。
```
