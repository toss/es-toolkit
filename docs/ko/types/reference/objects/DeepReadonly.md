# DeepReadonly

`T`의 모든 프로퍼티를 재귀적으로 `readonly`로 만들어요. 첫 단계만 바꾸는 기본 `Readonly`와 달리, 중첩된 객체 안쪽까지 전부 읽기 전용으로 만들어요.

```typescript
type Frozen = DeepReadonly<T>;
```

## 사용법

### `DeepReadonly<T>`

불변 상태(immutable state)를 타입으로 표현할 때 유용해요.

```typescript
import type { DeepReadonly } from 'es-toolkit/types';

type State = { user: { name: string; tags: string[] } };

type FrozenState = DeepReadonly<State>;
// => { readonly user: { readonly name: string; readonly tags: readonly string[] } }

declare const state: FrozenState;
state.user.name = 'x'; // 에러: name은 readonly예요.
```

#### 재귀 규칙

- **파고드는 것**: 일반 객체, 배열/튜플(→ `readonly` 배열/튜플), `Map`/`Set`(→ `ReadonlyMap`/`ReadonlySet`).
- **그대로 두는 것**: 함수, `Date`, `RegExp`는 통과시켜요.

```typescript
import type { DeepReadonly } from 'es-toolkit/types';

// 배열/튜플은 readonly가 돼요.
type A = DeepReadonly<number[]>; // readonly number[]

// Map/Set은 읽기 전용 버전이 돼요.
type B = DeepReadonly<Map<string, number>>; // ReadonlyMap<string, number>
type C = DeepReadonly<Set<number>>; // ReadonlySet<number>
```

#### 타입 파라미터

- `T`: 깊게 읽기 전용으로 만들 타입이에요.
