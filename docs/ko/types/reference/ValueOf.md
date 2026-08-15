# ValueOf

객체의 모든 값 타입을 유니온으로 만들어요. `keyof`가 키를 모아준다면, `ValueOf`는 값을 모아줘요.

```typescript
type Values = ValueOf<T>;
```

## 사용법

### `ValueOf<T>`

객체 타입에서 값 쪽 타입만 뽑아 유니온으로 얻고 싶을 때 사용하세요. `as const` 객체에서 값 유니온을 만들 때 특히 유용해요.

```typescript
import type { ValueOf } from 'es-toolkit/types';

const STATUS = { IDLE: 'idle', LOADING: 'loading', ERROR: 'error' } as const;

// keyof는 키를, ValueOf는 값을 모아요.
type StatusKey = keyof typeof STATUS; // 'IDLE' | 'LOADING' | 'ERROR'
type Status = ValueOf<typeof STATUS>; // 'idle' | 'loading' | 'error'

// 일반 객체 타입에서도 값 타입을 뽑아요.
type Values = ValueOf<{ id: number; name: string }>; // number | string

// Record는 값 타입으로 좁혀져요.
type Numbers = ValueOf<Record<string, number>>; // number
```

#### 타입 파라미터

- `T`: 값 타입을 읽어올 객체 타입이에요.
