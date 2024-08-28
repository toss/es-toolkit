# take

入力配列 `arr` から最初の `count` 個の要素を含む新しい配列を返します。

もし `count` が `arr` の長さより大きい場合、配列全体を返します。

## インターフェース

```typescript
function take<T>(arr: T[], count: number): T[];
```

### パラメータ

- `arr` (`T[]`): 要素を取得する配列です。
- `count` (`number`): 取得する要素の数です。

### 戻り値

(`T[]`): `arr` から最初の `count` 個の要素を含む新しい配列です。

## 例

```typescript
// [1, 2, 3]
take([1, 2, 3, 4, 5], 3);

// ['a', 'b']
take(['a', 'b', 'c'], 2);

// [1, 2, 3]
take([1, 2, 3], 5);
```
