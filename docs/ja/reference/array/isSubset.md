# isSubset

`subset` 配列が `superset` 配列のサブセットであるかどうかを確認します。

## インターフェース

```typescript
function isSubset<T>(superset: T[], subset: T[]): boolean;
```

### パラメータ

- `superset` (`T[]`): サブセットのすべての要素を含む可能性のある配列です。
- `subset` (`T[]`): スーパーセット配列に含まれているかどうかを比較する配列です。

### 戻り値

(`boolean`): `subset` 配列が `superset` 配列にすべて含まれている場合は `true` を返します。

## 例

```typescript
const superset1 = [1, 2, 3, 4, 5];
const subset1 = [2, 3, 4];

isSubset(superset1, subset1);
// true を返します。

const superset2 = ['a', 'b', 'c'];
const subset2 = ['a', 'd'];
isSubset(superset2, subset2);
// false を返します。
```
