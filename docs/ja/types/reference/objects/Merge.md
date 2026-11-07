# Merge

2つのオブジェクト型を深くマージした型を作ります。

```typescript
type Result = Merge<Target, Source>;
```

## 使用法

### `Merge<T, S>`

2つのオブジェクトを深くマージした結果の型が必要なときに使います。たとえば、[merge](../../../reference/object/merge.md)でデフォルト設定に上書きを適用した結果の型を表現できます。

```typescript
import type { Merge } from 'es-toolkit/types';

type Defaults = { host: string; port: number };
type Overrides = { debug: boolean };

type Config = Merge<Defaults, Overrides>;
// => { host: string; port: number; debug: boolean }
```

ネストされたオブジェクトもマージできます。TypeScript標準のマージ型 `T & S` ではネストされたオブジェクトはマージされませんが、`Merge` 型を使うとマージできます。

```typescript
import type { Merge } from 'es-toolkit/types';

type Target = { server: { host: string; port: number } };
type Source = { server: { tls: boolean } };

type Result = Merge<Target, Source>;
// => { server: { host: string; port: number; tls: boolean } }
```

2つの配列型をマージすると、タプルはインデックスごとにマージされ、それ以外の配列は両方の要素型を含む配列型になります。

```typescript
import type { Merge } from 'es-toolkit/types';

type Result = Merge<{ list: number[] }, { list: string[] }>;
// => { list: Array<string | number> }

type Tuple = Merge<[1, 2, 3], ['a']>;
// => ['a', 2, 3]
```

キーが重なる場合は、2番目のオブジェクトの値の型が使われます。TypeScript標準のマージ型 `T & S` では重なったキーの値が `never` と表示されることがありますが、`Merge` 型を使うと2番目のオブジェクトの値の型が使われます。

```typescript
import type { Merge } from 'es-toolkit/types';

type Target = { id: string; value: string };
type Source = { value: number };

type Result = Merge<Target, Source>;
// => { id: string; value: number }

type Broken = Target & Source;
// => { id: string; value: never } (string & number は never になります)
```

同じ型の2つのオブジェクトをマージすると、その型がそのまま返ります。`string[] | string[][]` のようなユニオン型が含まれていても同じです。

```typescript
import type { Merge } from 'es-toolkit/types';

type Options = { value: string[] | string[][] };

type Result = Merge<Options, Options>;
// => { value: string[] | string[][] }
```

同じキーがある場合、2番目のオブジェクトの型がそのまま結果になります。

プリミティブ、`Date`、`Map`、`Set`、関数など、プレーンなオブジェクトではない型をマージすると、2番目の値の型が使われます。

```typescript
import type { Merge } from 'es-toolkit/types';

type Target = { createdAt: Date; onChange: () => void; label: string };
type Source = { createdAt: string; onChange: (value: string) => void; label: 'a' | 'b' };

type Result = Merge<Target, Source>;
// => { createdAt: string; onChange: (value: string) => void; label: 'a' | 'b' }
```

1番目のオブジェクトで`null`や`undefined`になりえた値も、2番目のオブジェクトに値があれば結果の型からは消えます。

```typescript
import type { Merge } from 'es-toolkit/types';

type Defaults = { retry?: { count: number }; tags: string[] | null };
type Overrides = { retry: { count: number }; tags: string[] };

type Result = Merge<Defaults, Overrides>;
// => { retry: { count: number }; tags: string[] }
```

#### 型パラメータ

- `T`: ターゲットオブジェクトの型です。
- `S`: `T` にマージするソースオブジェクトの型です。
