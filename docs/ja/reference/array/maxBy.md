# maxBy

関数が返す値を基準に、配列の中で最大値を持つ要素を返します。

配列が空の場合は、`undefined`を返します。

## インターフェース

```typescript
function maxBy<T>(items: T[], getValue: (element: T) => number): T;
```

### パラメータ

- `items` (`T[]`): 最大値を持つ要素を探す配列。
- `getValue` (`(element: T) => number`): 要素に対応する数値を計算する関数。

### 戻り値

(`T`): `getValue`関数を基準に、配列の中で最大値を持つ要素。配列が空の場合は`undefined`を返します。

## 例

```typescript
maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // 戻り値: { a: 3 }
maxBy([], x => x.a); // 戻り値: undefined
```
