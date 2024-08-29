# shuffle

配列の要素の順序をランダムに並び替えます。Fisher-Yatesアルゴリズムを使用します。

## インターフェース

```typescript
function shuffle<T>(arr: T[]): T[];
```

### パラメータ

- `arr` (`T[]`): 要素をシャッフルする配列です。

### 戻り値

(`T[]`): 要素がランダムに並び替えられた新しい配列です。

## 例

```typescript
const array = [1, 2, 3, 4, 5];
const shuffledArray = shuffle(array);
// shuffledArrayは配列の要素がランダムに並び替えられた新しい配列 [3, 1, 4, 5, 2] になります。
```
