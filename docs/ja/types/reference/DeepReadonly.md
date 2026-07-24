# DeepReadonly

`T` のすべてのプロパティを再帰的に `readonly` にします。最初の階層だけを変える組み込みの `Readonly` と異なり、ネストしたオブジェクトの内側まですべて読み取り専用にします。

```typescript
type Frozen = DeepReadonly<T>;
```

## 使用法

### `DeepReadonly<T>`

イミュータブルな状態を型レベルで表現するときに便利です。

```typescript
import type { DeepReadonly } from 'es-toolkit/types';

type State = { user: { name: string; tags: string[] } };

type FrozenState = DeepReadonly<State>;
// => { readonly user: { readonly name: string; readonly tags: readonly string[] } }

declare const state: FrozenState;
state.user.name = 'x'; // エラー: name は readonly です。
```

#### 再帰のルール

- **踏み込むもの**: 通常のオブジェクト、配列/タプル（→ `readonly` 配列/タプル）、`Map`/`Set`（→ `ReadonlyMap`/`ReadonlySet`）。
- **そのまま通すもの**: 関数、`Date`、`RegExp` は変更せずに通します。

```typescript
import type { DeepReadonly } from 'es-toolkit/types';

// 配列/タプルは readonly になります。
type A = DeepReadonly<number[]>; // readonly number[]

// Map/Set は読み取り専用版になります。
type B = DeepReadonly<Map<string, number>>; // ReadonlyMap<string, number>
type C = DeepReadonly<Set<number>>; // ReadonlySet<number>
```

#### 型パラメータ

- `T`: 深く読み取り専用にする型です。
