# isSubsetWith

`subset` 配列が `superset`配列のサブセットであるかどうかを確認します。

この関数は2つの配列と比較関数を受け取ります。比較関数は要素が同じかどうかを判断するために使用されます。この関数は `subset` 配列のすべての要素が `superset` 配列に存在する場合に `true` を返し、そうでない場合は `false` を返します。

## インターフェース

```typescript
function isSubsetWith<T>(superset: T[], subset: T[], areItemsEqual: (x: T, y: T) => boolean): boolean;
```

### パラメータ

- `superset` (`T[]`): サブセットのすべての要素を含む可能性のある配列です。
- `subset` (`T[]`): スーパーセット配列に含まれているかどうかを比較する配列です。
- `areItemsEqual` (`(x: T, y: T) => boolean`): 2つの要素が等しいかどうかを判定する関数。

### 戻り値

(`boolean`): `subset` 配列が `superset` 配列にすべて含まれている場合は `true` を返します。

## 例

```typescript
const superset = [{ id: 1 }, { id: 2 }, { id: 3 }];
const subset = [{ id: 2 }, { id: 1 }];
const areItemsEqual = (a, b) => a.id === b.id;

isSubsetWith(superset, subset, areItemsEqual);
// true を返します。

const superset = [{ id: 1 }, { id: 2 }, { id: 3 }];
const subset = [{ id: 4 }];
const areItemsEqual = (a, b) => a.id === b.id;

isSubsetWith(superset, subset, areItemsEqual);
// false を返します。
```
