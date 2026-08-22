# flowAsync (関数型プログラミング)

左から右へ関数を非同期に合成し、各中間結果を待機する再利用可能な非同期関数を返します。

```typescript
const fn = flowAsync(...functions);
const result = await fn(...args);
```

::: info

`flowAsync` は [`flow`](./flow.md) の Promise 対応版です。`flow` は各関数の戻り値をそのまま次の関数に渡すため、`Promise` を返すと未解決のまま渡されてしまいます。`flowAsync` はすべてのステップを待機するため、同期関数と非同期関数を 1 つのチェーンで自由に混在させられます。

:::

## 使用法

`flowAsync` は一連の関数を受け取り、左から右へ 1 つの非同期関数に合成します。最初の関数は任意の数の引数を受け取れますが、それ以降の関数はすべて単項で、直前の関数の結果を待機した値を受け取ります。合成された関数は常に `Promise` を返します。

```typescript
import { flowAsync } from 'es-toolkit/fp';

const fetchUser = async (id: number) => ({ id, name: 'Alice' });
const getName = (user: { name: string }) => user.name;

const getUserName = flowAsync(fetchUser, getName);

await getUserName(1); // => 'Alice'
```

同期関数と非同期関数は任意の順序で混在できます。各結果は次の関数に渡される前に待機されます。

```typescript
import { flowAsync } from 'es-toolkit/fp';

const process = flowAsync(
  (x: number) => x + 1,
  async x => x * 3,
  x => `value: ${x}`
);

await process(1); // => 'value: 6'
```

いずれかの関数がエラーを投げたり、拒否された `Promise` を返したりすると、合成された関数もそのエラーで拒否されます。呼び出しを 1 つの `try`/`catch`(または `.catch`)で囲めば、すべてのステップの失敗を処理できます。

```typescript
import { flowAsync } from 'es-toolkit/fp';

const risky = flowAsync(
  async (id: number) => {
    throw new Error(`user ${id} not found`);
  },
  (user: { name: string }) => user.name
);

await risky(1); // Error: user 1 not found で拒否されます。
```

#### パラメータ

- `functions`: 左から右へ合成する関数です。最初の関数は任意の数の引数を受け取れますが、残りはすべて単項で、直前の関数の出力を待機した値を受け取ります。

#### 戻り値

(`(...args: any[]) => Promise<unknown>`): すべての関数を順番に適用し、各結果を待機する新しい非同期関数です。最初の関数と同じパラメータを受け取り、最後の関数の結果を待機した値で解決されます。公開されているオーバーロードは、チェーンから正確な型を推論します。
