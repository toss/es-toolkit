# zip

複数の配列を単一のタプルの配列に結合します。

この関数は複数の配列を入力として受け取り、各要素が入力配列の対応する要素を含むタプルである新しい配列を返します。入力配列の長さが異なる場合、結果の配列の長さは最も長い入力配列の長さになり、不足している要素は`undefined`で埋められます。

## インターフェース

```typescript
function zip<T>(arr1: T[]): [T][];
function zip<T, U>(arr1: T[], arr2: U[]): [T, U][];
function zip<T, U, V>(arr1: T[], arr2: U[], arr3: V[]): [T, U, V][];
function zip<T, U, V, W>(arr1: T[], arr2: U[], arr3: V[], arr4: W[]): [T, U, V, W][];
function zip<T>(...arrs: T[][]): T[][];
```

### パラメータ

- `...arrs` (`T[][]`): 結合する配列です。

### 戻り値

(`T[][]`): 入力配列の要素を含むタプルからなる新しい配列です。

## 例

```typescript
const arr1 = [1, 2, 3];
const arr2 = ['a', 'b', 'c'];
const result = zip(arr1, arr2);
// resultは [[1, 'a'], [2, 'b'], [3, 'c']] になります。

const arr3 = [true, false];
const result2 = zip(arr1, arr2, arr3);
// result2は [[1, 'a', true], [2, 'b', false], [3, 'c', undefined]] になります。
```
