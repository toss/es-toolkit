# uniqBy

`mapper` 関数が返す値を基準に、配列内の要素の重複を除去します。

## インターフェース

```typescript
function uniqBy<T, U>(arr: T[], mapper: (item: T) => U): T[];
```

### パラメータ

- `arr` (`T[]`): 重複を除去する配列。
- `mapper` (`(item: T) => U`): 比較のために要素を新しい値に変換する関数。

### 戻り値

(`T[]`): `mapper` 関数が返す値を基準に重複が除去された配列。

## 例

```typescript
uniqBy([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], Math.floor);
// [1.2, 2.1, 3.2, 5.7, 7.19]
```
