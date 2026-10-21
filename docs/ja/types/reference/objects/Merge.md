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

同じ型どうしをマージすると、その型がそのまま返ります。これは `string | string[] | string[][]` のようなユニオン型で特に重要です。そうでなければ TypeScript はユニオンメンバーのあらゆる組み合わせをマージして入力より広い型を作り、結果を元の型に代入できなくなります。

```typescript
import type { Merge } from 'es-toolkit/types';

type Options = { color: string | string[] | string[][]; label: 'a' | 'b' | (string & {}) };

type Result = Merge<Options, Options>;
// => Options
```

2つの値の型に関係がある場合は、広い方が保たれます。デフォルト値をより狭い値で上書きしてもデフォルトの型が保たれるため、マージした設定を元のオプション型にそのまま代入できます。

```typescript
import type { Merge } from 'es-toolkit/types';

type Options = { color: string | string[] | string[][]; size: number };

type Result = Merge<Options, { color: string[]; size: 12 }>;
// => Options
```

2番目のオブジェクトにしかないキーは常に保持されます。2番目のオブジェクトが1番目のサブタイプであっても同じです。プレーンなオブジェクトどうしは、型全体を比較する前にキーごとにマージされるためです。

```typescript
import type { Merge } from 'es-toolkit/types';

type Result = Merge<{ a: number }, { a: number; b: string }>;
// => { a: number; b: string }
```

#### 型パラメータ

- `T`: ターゲットオブジェクトの型です。
- `S`: `T` にマージするソースオブジェクトの型です。
