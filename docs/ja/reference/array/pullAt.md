# pullAt

配列から指定されたインデックスの要素を削除し、削除された要素を返します。

```typescript
const removed = pullAt(arr, indices);
```

## 参照

### `pullAt(arr, indicesToRemove)`

配列の特定の位置にある要素を削除したい場合は `pullAt` を使用してください。この関数は元の配列を変更し、削除された要素を新しい配列として返します。負のインデックスもサポートしており、配列の末尾から計算します。

```typescript
import { pullAt } from 'es-toolkit/array';

// 複数のインデックスの要素を一度に削除します。
const numbers = [10, 20, 30, 40, 50];
const removed = pullAt(numbers, [1, 3, 4]);
console.log(removed); // [20, 40, 50]
console.log(numbers); // [10, 30]

// 負のインデックスを使用して後ろから削除します。
const letters = ['a', 'b', 'c', 'd', 'e'];
const removedLetters = pullAt(letters, [-1, -3]);
console.log(removedLetters); // ['e', 'c']
console.log(letters); // ['a', 'b', 'd']

// 重複したインデックスがあっても安全に処理します。
const fruits = ['apple', 'banana', 'cherry', 'date'];
const removedFruits = pullAt(fruits, [1, 2, 1]);
console.log(removedFruits); // ['banana', 'cherry', undefined]
console.log(fruits); // ['apple', 'date']
```

存在しないインデックスを指定すると、その位置には `undefined` が返されます。

```typescript
import { pullAt } from 'es-toolkit/array';

const items = [1, 2, 3];
const removed = pullAt(items, [0, 5, 2]);
console.log(removed); // [1, undefined, 3]
console.log(items); // [2]
```

#### パラメータ

- `arr` (`T[]`): 要素を削除する配列です。
- `indicesToRemove` (`number[]`): 削除する要素のインデックスの配列です。負のインデックスは配列の末尾から計算されます。

#### 戻り値

(`T[]`): 削除された要素で構成される新しい配列です。存在しないインデックスについては `undefined` が含まれます。
