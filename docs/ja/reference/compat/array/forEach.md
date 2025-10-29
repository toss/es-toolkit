# forEach (Lodash 互換性)

::: warning `Array.prototype.forEach()`を使用してください

この`forEach`関数は、複雑なオブジェクト処理、早期終了ロジックなどにより、動作が遅くなります。

代わりに、より高速でモダンな`Array.prototype.forEach()`を使用してください。

:::

配列またはオブジェクトの各要素に対して関数を実行します。

```typescript
forEach(collection, callback);
```

## 参照

### `forEach(collection, callback)`

配列またはオブジェクトのすべての要素を走査し、各要素に対してコールバック関数を実行したい場合は`forEach`を使用してください。コールバックが`false`を返すと走査を中断します。

```typescript
import { forEach } from 'es-toolkit/compat';

// 配列の走査
const numbers = [1, 2, 3, 4, 5];
const results: number[] = [];

forEach(numbers, value => {
  results.push(value * 2);
});
// resultsは[2, 4, 6, 8, 10]

// 早期終了
const numbers2 = [1, 2, 3, 4, 5];
const results2: number[] = [];

forEach(numbers2, value => {
  if (value > 3) {
    return false; // 走査を中断
  }
  results2.push(value);
});
// results2は[1, 2, 3]
```

オブジェクトに対しても同様に動作します。

```typescript
import { forEach } from 'es-toolkit/compat';

const obj = { a: 1, b: 2, c: 3 };
const keys: string[] = [];
const values: number[] = [];

forEach(obj, (value, key) => {
  keys.push(key);
  values.push(value);
});
// keysは['a', 'b', 'c']
// valuesは[1, 2, 3]
```

`null`または`undefined`は空のコレクションとして扱われます。

```typescript
import { forEach } from 'es-toolkit/compat';

forEach(null, value => {
  console.log(value); // 実行されません
});

forEach(undefined, value => {
  console.log(value); // 実行されません
});
```

#### パラメータ

- `collection` (`ArrayLike<T> | Record<string, unknown> | null | undefined`): 走査する配列またはオブジェクトです。
- `callback` (`(value: T, index: number | string, collection: any) => void | false`): 各要素に対して実行する関数です。`false`を返すと走査を中断します。

#### 戻り値

(`T`): 走査した元のコレクションを返します。
