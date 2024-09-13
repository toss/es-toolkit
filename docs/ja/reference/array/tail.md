# tail

最初の要素を除いたすべての要素を含む新しい配列を返します。

この関数は配列を入力として受け取り、最初の要素を除いたすべての要素を含む新しい配列を返します。入力配列が空であるか、要素が1つしかない場合は空の配列を返します。

## インターフェース

```typescript
function tail<T>(arr: [T]): [];
function tail(arr: []): [];
function tail<T, U>(arr: [T, ...U[]]): U[];
function tail<T>(arr: T[]): T[];
```

### パラメータ

- `arr` (`T[]`): 最初の要素を除く配列です。

### 戻り値

(`T[]`): 入力配列の最初の要素を除いたすべての要素を含む新しい配列です。

## 例

```typescript
const arr1 = [1, 2, 3];
const result = tail(arr1);
// resultは[2, 3]になります。

const arr2 = [1];
const result2 = tail(arr2);
// result2は[]になります。

const arr3 = [];
const result3 = tail(arr3);
// result3は[]になります。
```
