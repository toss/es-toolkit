# DeepPartial

`T` のすべてのプロパティを再帰的に省略可能（optional）にします。最初の階層だけを変える組み込みの `Partial` と異なり、ネストしたオブジェクトの内側まですべて省略可能にします。

```typescript
type Patch = DeepPartial<T>;
```

## 使用法

### `DeepPartial<T>`

ネストした設定オブジェクトの一部だけを上書きするパッチ型を作るときに便利です。

```typescript
import type { DeepPartial } from 'es-toolkit/types';

type Config = {
  server: { host: string; port: number };
  debug: boolean;
};

type ConfigPatch = DeepPartial<Config>;
// => { server?: { host?: string; port?: number }; debug?: boolean }

const patch: ConfigPatch = { server: { port: 8080 } }; // ok, host は省略可能
```

#### 再帰のルール

どこまで踏み込み、どこで止まるかが決まっています。

- **踏み込むもの**: 通常のオブジェクト、配列/タプル、`Map`/`Set` の中身。ただし配列の要素自体は省略可能にしません（配列がスパースになりません）。
- **そのまま通すもの**: 関数、`Date`、`RegExp` は変更せずに通します。

```typescript
import type { DeepPartial } from 'es-toolkit/types';

// 配列は要素の型だけを再帰し、スパースになりません。
type A = DeepPartial<{ tags: string[] }>; // { tags?: string[] }

// Map/Set は中身まで再帰します。
type B = DeepPartial<Map<string, { x: number }>>; // Map<string, { x?: number }>

// 関数と Date はそのまま通ります。
type C = DeepPartial<{ at: Date; run: () => void }>; // { at?: Date; run?: () => void }
```

#### 型パラメータ

- `T`: 深く省略可能にする型です。
