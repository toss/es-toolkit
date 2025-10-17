# remove

条件関数に従って配列から要素を削除し、削除された要素を新しい配列として返します。元の配列を直接変更します。

```typescript
const removed = remove(arr, shouldRemoveElement);
```

## 参照

### `remove(arr, shouldRemoveElement)`

配列から特定の条件に合う要素を削除し、削除された要素を確認したい場合は `remove` を使用してください。この関数は元の配列を変更しながら、削除された要素を別の配列として返します。元の配列を保持したい場合は `filter` メソッドを使用してください。

```typescript
import { remove } from 'es-toolkit/array';

// 偶数を削除します。
const numbers = [1, 2, 3, 4, 5];
const removedNumbers = remove(numbers, value => value % 2 === 0);
console.log(numbers); // [1, 3, 5] (元の配列が変更されます)
console.log(removedNumbers); // [2, 4] (削除された要素)

// 特定の条件のオブジェクトを削除します。
const users = [
  { name: 'john', age: 25 },
  { name: 'jane', age: 17 },
  { name: 'bob', age: 30 },
];
const minors = remove(users, user => user.age < 18);
console.log(users); // [{ name: 'john', age: 25 }, { name: 'bob', age: 30 }]
console.log(minors); // [{ name: 'jane', age: 17 }]
```

インデックスと元の配列情報も使用できます。

```typescript
import { remove } from 'es-toolkit/array';

// インデックスに基づいて要素を削除します。
const items = ['a', 'b', 'c', 'd', 'e'];
const removedAtEvenIndex = remove(items, (value, index) => index % 2 === 0);
console.log(items); // ['b', 'd']
console.log(removedAtEvenIndex); // ['a', 'c', 'e']
```

#### パラメータ

- `arr` (`T[]`): 変更する配列です。
- `shouldRemoveElement` (`(value: T, index: number, array: T[]) => boolean`): 各要素に対して呼び出される条件関数です。`true` を返すと要素が削除されます。
  - `value`: 現在処理中の要素です。
  - `index`: 現在の要素のインデックスです。
  - `array`: 元の配列です。

#### 戻り値

(`T[]`): 削除された要素で構成される新しい配列を返します。
