# uniq

配列から重複した要素を除いた新しい配列を返します。

```typescript
const uniqueArray = uniq(arr);
```

## 参照

### `uniq(arr)`

配列から重複した値を除いて一意な値だけを残したい場合は `uniq` を使用してください。元の配列で最初に現れる順序を保持します。

```typescript
import { uniq } from 'es-toolkit/array';

// 数値配列から重複を除きます。
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = uniq(numbers);
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]

// 文字列配列から重複を除きます。
const words = ['apple', 'banana', 'apple', 'cherry', 'banana'];
const uniqueWords = uniq(words);
console.log(uniqueWords); // ['apple', 'banana', 'cherry']

// オブジェクト配列から参照が同じオブジェクトを除きます。
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 3 };
const objects = [obj1, obj2, obj1, obj3, obj2];
const uniqueObjects = uniq(objects);
console.log(uniqueObjects); // [{ id: 1 }, { id: 2 }, { id: 3 }]
```

空の配列からは空の配列を返します。

```typescript
import { uniq } from 'es-toolkit/array';

const emptyArray = uniq([]);
console.log(emptyArray); // []
```

#### パラメータ

- `arr` (`readonly T[]`): 重複を除く配列です。

#### 戻り値

(`T[]`): 重複が除かれた新しい配列です。元の配列で最初に現れる順序を保持します。
