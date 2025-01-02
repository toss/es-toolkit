# remove

与えられた条件関数に従って配列から要素を削除します。

この関数は `arr` を直接変更します。
元の配列を変更せずに要素を削除するには、[Array.prototype.filter](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) を使用してください。

## インターフェース

```typescript
function remove<T>(arr: T[], shouldRemoveElement: (value: T, index: number, array: T[]) => boolean): T[];
```

### パラメータ

- `arr` (`T[]`): 変更する配列です。
- `shouldRemoveElement` (`(value: T, index: number, array: T[]) => boolean`): 要素を削除するかどうかを決定するために、各反復で呼び出される関数です。

### 戻り値

(`T[]`): 指定された要素が削除された修正済み配列です。

## 例

```typescript
const numbers = [1, 2, 3, 4, 5];
remove(numbers, value => value % 2 === 0);
console.log(numbers); // [1, 3, 5]
```
