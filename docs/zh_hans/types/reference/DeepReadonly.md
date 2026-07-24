# DeepReadonly

递归地将 `T` 的所有属性变为 `readonly`。与只影响第一层的内置 `Readonly` 不同，它会一直深入到嵌套对象内部，将所有属性都变为只读。

```typescript
type Frozen = DeepReadonly<T>;
```

## 用法

### `DeepReadonly<T>`

在类型层面表达不可变状态时很方便。

```typescript
import type { DeepReadonly } from 'es-toolkit/types';

type State = { user: { name: string; tags: string[] } };

type FrozenState = DeepReadonly<State>;
// => { readonly user: { readonly name: string; readonly tags: readonly string[] } }

declare const state: FrozenState;
state.user.name = 'x'; // 错误：name 是 readonly。
```

#### 递归规则

- **深入的对象**：普通对象、数组/元组（→ `readonly` 数组/元组）、`Map`/`Set`（→ `ReadonlyMap`/`ReadonlySet`）。
- **原样通过的对象**：函数、`Date`、`RegExp` 保持不变通过。

```typescript
import type { DeepReadonly } from 'es-toolkit/types';

// 数组/元组会变为 readonly。
type A = DeepReadonly<number[]>; // readonly number[]

// Map/Set 会变为其只读版本。
type B = DeepReadonly<Map<string, number>>; // ReadonlyMap<string, number>
type C = DeepReadonly<Set<number>>;         // ReadonlySet<number>
```

#### 类型参数

- `T`：要深度变为只读的类型。
