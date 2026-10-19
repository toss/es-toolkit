# Writable

オブジェクトのすべてのプロパティから `readonly` の表示を外します。組み込みの `Readonly` の逆です。

```typescript
type Mutable = Writable<T>;
```

## 使用法

### `Writable<T>`

`as const` や `Readonly` で固定されて変更できなくなった型を、再び変更できるようにしたいときに使います。

```typescript
import type { Writable } from 'es-toolkit/types';

type Config = { readonly host: string; readonly port: number };

type MutableConfig = Writable<Config>;
// => { host: string; port: number }

const config: MutableConfig = { host: 'localhost', port: 8080 };
config.port = 3000; // ok
```

`readonly` は一番外側のプロパティからのみ外します。ネストしたオブジェクトの内側には触れないので、浅い範囲で使ってください。

#### 型パラメータ

- `T`: 変更できるようにするオブジェクト型です。
