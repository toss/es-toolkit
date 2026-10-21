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

### 結果の型が決まる規則

次の規則のうち、最初に当てはまるものが適用されます。2つのオブジェクトが共有するキーごとに、同じ規則がもう一度適用されます。

1. 2つの型が完全に同じなら、その型をそのまま返します。
2. 両方がプレーンなオブジェクトなら、キーごとにマージします。片方にしかないキーは保持されます。
3. 片方の型がもう片方に代入できるなら、広い方の型を使います。互いに代入できる場合は、1つ目の型を使います。
4. それ以外は、タプルはインデックスごとにマージし、通常の配列は両方の要素型の配列になり、その他の値(プリミティブ、`Date`、`Map`、関数など)は2つ目の値で置き換えられます。

規則1と規則3によってユニオン型がそのまま保たれます。これらの規則がないと、`string | string[] | string[][]` のようなユニオンがメンバーごとにマージされ、入力より広い型になってしまいます。

```typescript
import type { Merge } from 'es-toolkit/types';

type Options = { color: string | string[] | string[][]; label: 'a' | 'b' | (string & {}) };

type Same = Merge<Options, Options>;
// => Options (規則1)

type Override = Merge<Options, { color: string[] }>;
// => Options (規則3: string[] は Options['color'] に代入できます)

type Extra = Merge<{ a: number }, { a: number; b: string }>;
// => { a: number; b: string } (規則2が規則3より先に適用されるため `b` が保持されます)
```

#### 型パラメータ

- `T`: ターゲットオブジェクトの型です。
- `S`: `T` にマージするソースオブジェクトの型です。
