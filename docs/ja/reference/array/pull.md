# pull

配列から指定されたすべての値を削除します。

```typescript
const result = pull(arr, valuesToRemove);
```

## 参照

### `pull(arr, valuesToRemove)`

配列から特定の値をすべて削除したい場合は `pull` を使用してください。この関数は元の配列を直接変更し、変更された配列を返します。

```typescript
import { pull } from 'es-toolkit/array';

// 数値配列から特定の値を削除します。
const numbers = [1, 2, 3, 4, 5, 2, 4];
pull(numbers, [2, 4]);
console.log(numbers); // [1, 3, 5]

// 文字列配列から特定の文字列を削除します。
const fruits = ['apple', 'banana', 'cherry', 'banana', 'date'];
pull(fruits, ['banana', 'cherry']);
console.log(fruits); // ['apple', 'date']

// オブジェクト配列から参照が同じオブジェクトを削除します。
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 3 };
const objects = [obj1, obj2, obj3, obj1];
pull(objects, [obj1]);
console.log(objects); // [{ id: 2 }, { id: 3 }]
```

元の配列を変更せずに新しい配列を作成したい場合は `difference` 関数を使用してください。

```typescript
import { pull } from 'es-toolkit/array';
import { difference } from 'es-toolkit/array';

const original = [1, 2, 3, 4, 5];

// pullは元の配列を変更します。
const arr1 = [...original];
pull(arr1, [2, 4]);
console.log(arr1); // [1, 3, 5]

// differenceは新しい配列を返します。
const arr2 = difference(original, [2, 4]);
console.log(original); // [1, 2, 3, 4, 5] (変更されていない)
console.log(arr2); // [1, 3, 5]
```

#### パラメータ

- `arr` (`T[]`): 値を削除する配列です。
- `valuesToRemove` (`readonly unknown[]`): 配列から削除する値の配列です。

#### 戻り値

(`T[]`): 指定された値が削除された元の配列です。元の配列が変更されて返されます。
