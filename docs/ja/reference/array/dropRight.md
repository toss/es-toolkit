# dropRight

配列の末尾から指定された数の要素を削除した新しい配列を返します。

この関数は、配列と数値をパラメータとして受け取ります。配列の末尾から指定された数の要素を除いた新しい配列を返します。

## インターフェース

```typescript
function dropRight<T>(arr: T[], itemsCount: number): T[];
```

### パラメータ

- `arr` (`T[]`): 要素を削除する対象の配列。
- `itemsCount` (`number`): 配列の末尾から削除する要素の数。

### 戻り値

(`T[]`): 配列の末尾から指定された数の要素を除いた新しい配列を返します。

## 例

```typescript
const array = [1, 2, 3, 4, 5];
const result = dropRight(array, 2);
// 末尾の2つの要素が削除されるので、結果は [1, 2, 3] になります。
```
