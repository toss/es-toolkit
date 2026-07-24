# DeepPartial

`T`의 모든 프로퍼티를 재귀적으로 선택적(optional)으로 만들어요. 첫 단계만 바꾸는 기본 `Partial`과 달리, 중첩된 객체 안쪽까지 전부 선택적으로 만들어요.

```typescript
type Patch = DeepPartial<T>;
```

## 사용법

### `DeepPartial<T>`

중첩된 설정 객체의 일부만 덮어쓰는 패치 타입을 만들 때 유용해요.

```typescript
import type { DeepPartial } from 'es-toolkit/types';

type Config = {
  server: { host: string; port: number };
  debug: boolean;
};

type ConfigPatch = DeepPartial<Config>;
// => { server?: { host?: string; port?: number }; debug?: boolean }

const patch: ConfigPatch = { server: { port: 8080 } }; // ok, host 생략 가능
```

#### 재귀 규칙

어디까지 파고들고 어디서 멈추는지 정해져 있어요.

- **파고드는 것**: 일반 객체, 배열/튜플, `Map`/`Set`의 내용. 단, 배열 요소는 선택적으로 만들지 않아요(희소 배열이 되지 않아요).
- **그대로 두는 것**: 함수, `Date`, `RegExp`는 통과시켜요.

```typescript
import type { DeepPartial } from 'es-toolkit/types';

// 배열은 요소 타입만 재귀하고, 희소 배열이 되지 않아요.
type A = DeepPartial<{ tags: string[] }>; // { tags?: string[] }

// Map/Set은 내용까지 재귀해요.
type B = DeepPartial<Map<string, { x: number }>>; // Map<string, { x?: number }>

// 함수와 Date는 그대로 통과해요.
type C = DeepPartial<{ at: Date; run: () => void }>; // { at?: Date; run?: () => void }
```

#### 타입 파라미터

- `T`: 깊게 선택적으로 만들 타입이에요.
