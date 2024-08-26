# takeRightWhile

条件関数が`true`を返す間、配列の末尾から要素を取得します。
条件を満たさない要素が現れると停止します。

## インターフェース

```typescript
function takeRightWhile<T>(arr: T[], shouldContinueTaking: (item: T) => boolean): T[];
```

### パラメータ

- `arr` (`T[]`): 要素を取得する配列です。
- `shouldContinueTaking` (`(item: T) => boolean`): 各要素と共に呼び出される条件関数です。この関数が`true`を返す間、要素が結果に含まれます。

### 戻り値

(`T[]`): 条件関数が`true`を返す間、配列の末尾から取得した要素を含む新しい配列です。

## 例

```typescript
// [3, 2, 1]
takeRightWhile([5, 4, 3, 2, 1], n => n < 4);

// []
takeRightWhile([1, 2, 3], n => n > 3);
```
