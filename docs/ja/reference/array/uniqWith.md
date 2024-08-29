# uniqWith

2つの要素が一致するかどうかを判断するカスタム関数を基準に、配列内の要素の重複を除去します。

## インターフェース

```typescript
function uniqWith<T>(arr: T[], areItemsEqual: (item1: T, item2: T) => boolean): T[];
```

### パラメータ

- `arr` (`T[]`): 重複を除去する配列。
- `areItemsEqual` (`(x: T, y: T) => boolean`): 2つの要素が一致するかどうかを判断する一致関数です。2つの要素が一致する場合は `true` を、一致しない場合は `false` を返すようにしてください。

### 戻り値

(`T[]`): カスタム一致関数の戻り値を基準に、重複が除去された新しい配列。

## 例

```typescript
uniqWith([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], (a, b) => Math.abs(a - b) < 1);
// [1.2, 3.2, 5.7, 7.19]
```
