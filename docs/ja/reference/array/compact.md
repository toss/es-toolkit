# compact

偽値を削除した新しい配列を返します。

```typescript
const compacted = compact(arr);
```

## 参照

### `compact(arr)`

配列から偽値（`false`、`null`、`0`、`-0`、`0n`、`''`、`undefined`、`NaN`）を削除したい場合は、`compact` を使用してください。真値のみを含む新しい配列が返されます。

```typescript
import { compact } from 'es-toolkit/array';

// さまざまな偽値を削除します。
compact([0, -0, 0n, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
// 戻り値: [1, 2, 3, 4, 5]

// 文字列配列から空文字列を削除します。
compact(['hello', '', 'world', '', '!']);
// 戻り値: ['hello', 'world', '!']
```

型システムは偽値の型を自動的に除外します。

```typescript
import { compact } from 'es-toolkit/array';

const mixed: (string | number | false | null)[] = ['text', 0, false, null, 5];
const result = compact(mixed);
// result の型は (string | number)[]
```

#### パラメータ

- `arr` (`T[]`): 偽値を削除する配列。

#### 戻り値

(`Array<Exclude<T, false | null | 0 | 0n | '' | undefined>>`): 偽値が削除された新しい配列。
