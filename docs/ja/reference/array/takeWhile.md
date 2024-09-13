# takeWhile

与えられた条件関数が`true`を返す先頭の要素を含む新しい配列を返します。
条件を満たさない要素が現れると停止します。

## インターフェース

```typescript
function takeWhile<T>(arr: T[], shouldContinueTaking: (element: T) => boolean): T[];
```

### パラメータ

- `arr` (`T[]`): 要素を取得する配列です。
- `shouldContinueTaking` (`(item: T) => boolean`) 各要素と共に呼び出される条件関数です。この関数が`true`を返す間、要素が結果に含まれます。

### 戻り値

(`T[]`) 条件関数が`true`を返す間、先頭から取得した要素を含む新しい配列です。

## 例

```typescript
// [1, 2] を返します
takeWhile([1, 2, 3, 4], x => x < 3);

// [] を返します
takeWhile([1, 2, 3, 4], x => x > 3);
```
