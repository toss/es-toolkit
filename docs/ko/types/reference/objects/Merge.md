# Merge

두 객체 타입을 깊이 병합한 타입을 만들어요.

```typescript
type Result = Merge<Target, Source>;
```

## 사용법

### `Merge<T, S>`

두 객체를 깊이 병합한 결과의 타입이 필요할 때 사용해요. 예를 들어 [merge](../../../reference/object/merge.md)로 기본 설정에 덮어쓰기를 적용한 결과의 타입을 표현할 수 있어요.

```typescript
import type { Merge } from 'es-toolkit/types';

type Defaults = { host: string; port: number };
type Overrides = { debug: boolean };

type Config = Merge<Defaults, Overrides>;
// => { host: string; port: number; debug: boolean }
```

중첩 객체도 병합할 수 있어요. TypeScript 기본 병합 타입 `T & S`에서는 중첩 객체가 병합되지 않지만, `Merge` 타입을 사용하면 병합할 수 있어요.

```typescript
import type { Merge } from 'es-toolkit/types';

type Target = { server: { host: string; port: number } };
type Source = { server: { tls: boolean } };

type Result = Merge<Target, Source>;
// => { server: { host: string; port: number; tls: boolean } }
```

겹치는 키가 있을 때는 두 번째 객체의 값 타입을 사용해요. TypeScript 기본 병합 타입 `T & S`에서는 겹치는 키에 해당하는 값이 `never`로 표시되지만, `Merge` 타입을 사용하면 두 번째 객체의 값 타입이 사용돼요.

```typescript
import type { Merge } from 'es-toolkit/types';

type Target = { id: string; value: string };
type Source = { value: number };

type Result = Merge<Target, Source>;
// => { id: string; value: number }

type Broken = Target & Source;
// => { id: string; value: never } (string & number는 never가 돼요)
```

### 결과 타입이 정해지는 규칙

아래 규칙 중 먼저 해당하는 것이 적용돼요. 두 객체가 공유하는 키마다 같은 규칙이 다시 적용돼요.

1. 두 타입이 완전히 같으면 그 타입을 그대로 돌려줘요.
2. 둘 다 평범한 객체면 키 단위로 병합해요. 한쪽에만 있는 키는 유지돼요.
3. 한쪽 타입이 다른 쪽에 대입할 수 있으면 더 넓은 타입을 사용해요. 양쪽 모두 서로 대입할 수 있으면 첫 번째 타입을 사용해요.
4. 그 외에는 튜플은 인덱스별로 병합하고, 일반 배열은 두 원소 타입의 배열이 되고, 나머지 값(원시 타입, `Date`, `Map`, 함수 등)은 두 번째 값으로 교체돼요.

1번과 3번 규칙 덕분에 유니온 타입이 그대로 유지돼요. 이 규칙이 없으면 `string | string[] | string[][]` 같은 유니온이 멤버별로 병합되어 입력보다 넓은 타입이 나와요.

```typescript
import type { Merge } from 'es-toolkit/types';

type Options = { color: string | string[] | string[][]; label: 'a' | 'b' | (string & {}) };

type Same = Merge<Options, Options>;
// => Options (규칙 1)

type Override = Merge<Options, { color: string[] }>;
// => Options (규칙 3: string[]은 Options['color']에 대입할 수 있어요)

type Extra = Merge<{ a: number }, { a: number; b: string }>;
// => { a: number; b: string } (규칙 2가 규칙 3보다 먼저 적용되어 `b`가 유지돼요)
```

#### 타입 파라미터

- `T`: 타깃 객체의 타입이에요.
- `S`: `T`에 병합할 소스 객체의 타입이에요.
