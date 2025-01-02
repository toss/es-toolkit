# pullAll

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

配列から指定された値をすべて削除します。

この関数は`arr`をその場で変更します。
元の配列を変更せずに値を削除したい場合は、`difference`を使用します。

## インターフェース

```typescript
function pullAll<T>(arr: T[], valuesToRemove: ArrayLike<T>): T[];
```

### パラメータ

- `arr` (`T[]`): 変更する配列。
- `valuesToRemove` (`ArrayLike<T>`): 配列から削除する値。

### 戻り値

(`T[]`): 指定された値が削除された修正済み配列。

## 例

```typescript
const numbers = [1, 2, 3, 4, 5, 2, 4];
pullAll(numbers, [2, 4]);
console.log(numbers); // [1, 3, 5]
```
