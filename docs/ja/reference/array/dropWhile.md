# dropWhile

配列の先頭から始めて、条件関数が`false`を返すまで要素を削除します。

この関数は配列の各要素を順に処理し、配列の先頭から条件関数が`false`を返すまで要素を削除します。
残りの要素で構成される新しい配列を返します。

## インターフェース

```typescript
function dropWhile<T>(arr: T[], canContinueDropping: (item: T) => boolean): T[];
```

### パラメータ

- `arr` (`T[]`): 要素を削除する配列。
- `canContinueDropping` (`(item: T) => boolean`): 要素の削除を続けるかどうかを返す条件関数です。各要素に対して呼び出され、`true`を返す間は要素を削除します。

### 戻り値

(`T[]`): 条件関数が`false`を返すまでの残りの要素で構成される新しい配列。

## 例

```typescript
const array = [1, 2, 3, 2, 4, 5];
const result = dropWhile(array, x => x < 3);
// 3未満の要素が見つかるまで要素を削除するので、結果は[3, 2, 4, 5]になります。
```
