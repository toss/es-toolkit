# pull

指定されたすべての値を配列から削除します。

この関数は`arr`を変更します。
元の配列を変更せずに値を削除したい場合は、[difference](./difference.md)を使用します。

## インターフェース

```typescript
function pull<T, U extends T>(arr: T[], valuesToRemove: readonly U[]): T[];
```

### パラメータ

- `arr` (`T[]`): 変更する配列。
- `valuesToRemove` (`U[]`): 配列から削除する値。

### 戻り値

(`T[]`): 指定された値を削除した後の変更された配列。

## 例

```typescript
const numbers = [1, 2, 3, 4, 5, 2, 4];
pull(numbers, [2, 4]);
console.log(numbers); // [1, 3, 5]
```
