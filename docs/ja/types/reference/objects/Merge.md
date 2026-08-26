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

#### 型パラメータ

- `T`: ターゲットオブジェクトの型です。
- `S`: `T` にマージするソースオブジェクトの型です。
