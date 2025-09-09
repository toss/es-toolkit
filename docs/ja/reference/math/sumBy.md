# sumBy

`getValue` 関数が返す値を基準に、数値配列のすべての要素を合計した値を返します。

空の配列に対しては `0` を返します。

## インターフェース

```typescript
function sumBy<T>(items: T[], getValue: (element: T) => number): number;
```

### パラメータ

- `items` (`T[]`): 合計を計算する数値配列です。
- `getValue` (`(item: T) => number`): 各要素から数値を選択する関数です。

### 戻り値

(`number`): `getValue` 関数を基準に、配列にあるすべての数値の合計を返します。

## 例

```typescript
sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // 6を返します。
sumBy([], x => x.a); // 0を返します。
```
