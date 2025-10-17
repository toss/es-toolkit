# head

配列の最初の要素を返します。

```typescript
const firstElement = head(arr);
```

## 参照

### `head(arr)`

配列の最初の要素を取得したい場合は `head` を使用してください。配列が空の場合は `undefined` を返します。配列の先頭にあるデータにアクセスする際に便利です。

```typescript
import { head } from 'es-toolkit/array';

// 数値配列の最初の要素を取得します。
const numbers = [1, 2, 3, 4, 5];
head(numbers);
// Returns: 1

// 文字列配列の最初の要素を取得します。
const strings = ['a', 'b', 'c'];
head(strings);
// Returns: 'a'

// 空の配列はundefinedを返します。
const emptyArray: number[] = [];
head(emptyArray);
// Returns: undefined
```

型安全に処理されます。

```typescript
import { head } from 'es-toolkit/array';

// 空でない配列の場合、型が確実です。
const nonEmptyArray = [1, 2, 3] as const;
head(nonEmptyArray);
// Returns: 1 (型: 1)

// 通常の配列の場合、undefined の可能性があります。
const maybeEmptyArray = [1, 2, 3];
head(maybeEmptyArray);
// Returns: 1 | undefined (型: number | undefined)
```

#### パラメータ

- `arr` (`readonly T[]`): 最初の要素を取得する配列です。

#### 戻り値

(`T | undefined`): 配列の最初の要素です。配列が空の場合は `undefined` を返します。
