# meanBy

`getValue` 関数が返す値を基準に、数値配列の平均を計算する関数です。

空の配列に対しては `NaN` を返します。

## インターフェース

```typescript
function meanBy<T>(items: T[], getValue: (element: T) => number): number;
```

### パラメータ

- `items` (`T[]`): 平均を計算する数値配列です。
- `getValue` (`(item: T) => number`): 各要素から数値を選択する関数です。

### 戻り値

(`number`): `getValue` 関数を基準に、配列にあるすべての数値の平均を返します。

## 例

```typescript
meanBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // 2を返します。
meanBy([], x => x.a); // NaNを返します。
```
