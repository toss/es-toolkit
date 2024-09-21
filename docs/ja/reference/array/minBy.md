# minBy

関数が返す値を基準に、配列から最小値を持つ要素を返します。

## インターフェース

```typescript
function minBy<T>(items: T[], getValue: (element: T) => number): T;
```

### パラメータ

- `items` (`T[]`): 最小値を持つ要素を探す配列。
- `getValue` (`(element: T) => number`): 要素に対応する数値を計算する関数。

### 戻り値

(`T`): `getValue` 関数を基準に、配列から最小値を持つ要素。

## 例

```typescript
minBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // 戻り値: { a: 1 }
minBy([], x => x.a); // 戻り値: undefined
```
