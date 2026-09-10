# Simplify

교차 타입이나 매핑된 타입을 하나의 평평한 객체 타입으로 펼쳐요. 결과 타입은 같지만, 에디터에서 `A & B` 대신 `{ a: 1; b: 2 }`처럼 풀린 모양으로 보여요.

```typescript
type Flat = Simplify<T>;
```

## 사용법

### `Simplify<T>`

교차 타입(`&`)을 그대로 두면 에디터 툴팁에 `A & B`로 표시돼서 실제 모양을 알기 어려워요. `Simplify`로 감싸면 최종 프로퍼티들을 한 객체로 펼쳐서 보여줘요. `?`(선택)와 `readonly` 표시도 그대로 유지해요.

```typescript
import type { Simplify } from 'es-toolkit/types';

type A = { name: string };
type B = { readonly age?: number };

// 감싸지 않으면 툴팁에 'A & B'로 보여요.
type Raw = A & B;

// Simplify로 펼치면 하나의 객체로 보여요. ?, readonly 표시도 유지돼요.
type User = Simplify<A & B>;
// => { name: string; readonly age?: number }
```

#### 타입 파라미터

- `T`: 펼칠 타입이에요.
