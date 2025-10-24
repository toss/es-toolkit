# rearg (Lodash 互換性)

::: warning アロー関数を使用してください

この `rearg` 関数は、引数の順序を並び替える複雑なラッパーを作成するため、動作が遅くなります。アロー関数を使用して引数の順序を直接並び替えると、より明確で高速なコードを書くことができます。

代わりに、より高速で現代的なアロー関数を使用してください。

:::

関数の引数を指定した順序で並び替える新しい関数を作成します。

```typescript
const rearranged = rearg(func, ...indices);
```

## 参照

### `rearg(func, ...indices)`

関数を呼び出すときに引数の順序を変更したい場合は、`rearg` を使用してください。指定されたインデックスの順序で引数を並び替えて、元の関数を呼び出します。

```typescript
import { rearg } from 'es-toolkit/compat';

const greet = (greeting, name) => `${greeting}, ${name}!`;

// 引数の順序を入れ替える(1番目、0番目)
const rearrangedGreet = rearg(greet, 1, 0);
rearrangedGreet('World', 'Hello');
// 戻り値: "Hello, World!"

// 元の関数はそのまま
greet('Hello', 'World');
// 戻り値: "Hello, World!"
```

配列でインデックスを渡すこともできます。

```typescript
import { rearg } from 'es-toolkit/compat';

const fn = (a, b, c) => [a, b, c];

// 配列でインデックスを指定
const rearranged = rearg(fn, [2, 0, 1]);
rearranged('a', 'b', 'c');
// 戻り値: ['c', 'a', 'b']
```

一部の引数のみを並び替えて、残りはそのままにすることができます。

```typescript
import { rearg } from 'es-toolkit/compat';

const fn = (a, b, c, d) => [a, b, c, d];

// 最初の2つの引数のみを並び替え
const rearranged = rearg(fn, 1, 0);
rearranged('first', 'second', 'third', 'fourth');
// 戻り値: ['second', 'first', 'third', 'fourth']
```

存在しないインデックスは `undefined` として処理されます。

```typescript
import { rearg } from 'es-toolkit/compat';

const fn = (a, b, c) => [a, b, c];

// 存在しないインデックス5を含む
const rearranged = rearg(fn, 5, 1, 0);
rearranged('a', 'b', 'c');
// 戻り値: [undefined, 'b', 'a']
```

ネストされた配列も平坦化して処理されます。

```typescript
import { rearg } from 'es-toolkit/compat';

const fn = (a, b, c, d) => [a, b, c, d];

// ネストされた配列インデックス
const rearranged = rearg(fn, [1, [2, 0]], 3);
rearranged('a', 'b', 'c', 'd');
// 戻り値: ['b', 'c', 'a', 'd']
```

#### パラメータ

- `func` (`(...args: any[]) => any`): 引数の順序を並び替える関数です。
- `...indices` (`Array<number | number[]>`): 並び替える引数のインデックスです。ネストされた配列もサポートされています。

#### 戻り値

(`(...args: any[]) => any`): 引数の順序が並び替えられた新しい関数を返します。
