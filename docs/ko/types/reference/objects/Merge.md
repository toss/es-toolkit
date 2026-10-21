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

같은 타입끼리 병합하면 그 타입이 그대로 나와요. `string[] | string[][]` 같은 유니온 타입이 들어 있어도 마찬가지예요.

```typescript
import type { Merge } from 'es-toolkit/types';

type Options = { value: string[] | string[][] };

type Result = Merge<Options, Options>;
// => { value: string[] | string[][] }
```

소스 배열이 타깃의 배열 타입에 들어맞으면 타깃 타입이 유지돼요. `string[] | string[][]`를 `string[]`으로 덮어써도 `string[] | string[][]`가 유지되기 때문에, 병합된 설정을 원래 옵션 타입에 그대로 대입할 수 있어요. 문자열이나 숫자처럼 병합되지 않는 값은 위에서 본 것처럼 소스 타입을 사용해요.

```typescript
import type { Merge } from 'es-toolkit/types';

type Options = { value: string[] | string[][] };

type Result = Merge<Options, { value: string[] }>;
// => { value: string[] | string[][] }
```

두 번째 객체에만 있는 키는 항상 유지돼요. 두 번째 객체가 첫 번째 객체의 서브타입이어도 마찬가지예요. 평범한 객체끼리는 타입 전체를 비교하기 전에 키 단위로 먼저 병합하기 때문이에요.

```typescript
import type { Merge } from 'es-toolkit/types';

type Result = Merge<{ a: number }, { a: number; b: string }>;
// => { a: number; b: string }
```

#### 타입 파라미터

- `T`: 타깃 객체의 타입이에요.
- `S`: `T`에 병합할 소스 객체의 타입이에요.
