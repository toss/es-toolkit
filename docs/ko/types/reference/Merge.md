# Merge

두 객체 타입을 깊이 병합한 타입을 만들어요. [`merge`](../../reference/object/merge.md)의 반환 타입이에요. 기본 교차 타입 `T & S`는 겹치는 중첩 프로퍼티가 `never`로 무너질 수 있지만, `Merge<T, S>`는 `merge`가 런타임에 하는 것과 똑같이 프로퍼티 하나하나를 병합해요.

```typescript
type Result = Merge<Target, Source>;
```

## 사용법

### `Merge<T, S>`

소스 객체를 타깃 객체에 깊이 병합한 결과의 타입이 필요할 때 사용해요. 예를 들어 [`merge`](../../reference/object/merge.md)로 기본 설정에 덮어쓰기를 적용한 설정 객체의 타입을 표현할 수 있어요.

```typescript
import type { Merge } from 'es-toolkit/types';

type Defaults = {
  server: { host: string; port: number };
  debug: boolean;
};

type Overrides = {
  server: { port: 8080; tls: boolean };
};

type Config = Merge<Defaults, Overrides>;
// => { server: { host: string; port: 8080; tls: boolean }; debug: boolean }
```

#### 병합 규칙

`merge`가 런타임에 적용하는 규칙을 그대로 따라요.

- **한쪽에만 있는 키**: 선택적(optional) 여부를 유지한 채 그대로 남아요.
- **양쪽 다 일반 객체**: 재귀적으로 병합해요.
- **양쪽 다 배열**: 튜플은 인덱스 단위로 병합하고, 그 외 배열은 두 요소 타입을 합친 배열이 돼요.
- **소스 값이 `undefined`일 수 있는 경우**: `merge`는 정의된 값을 `undefined`로 덮어쓰지 않으므로, 타깃 타입을 유지해요.
- **병합할 수 없는 값** (함수, `Date`, `RegExp`, `Map`, `Set` 같은 일반 객체가 아닌 값): 소스 값이 타깃 값을 대체해요.
- **배열과 일반 객체가 만나는 경우**: `merge`가 소스의 프로퍼티를 타깃에 할당하므로, 양쪽 프로퍼티를 모두 유지해요(`T & S`).

```typescript
import type { Merge } from 'es-toolkit/types';

// 튜플은 인덱스 단위로 병합해요.
type A = Merge<{ a: [1, 2] }, { a: [3] }>; // { a: [3, 2] }

// undefined일 수 있는 소스 값은 타깃을 덮어쓰지 않아요.
type B = Merge<{ a: number }, { a?: string }>; // { a: number | string }

// 일반 객체가 아닌 값은 병합하지 않고 대체해요.
type C = Merge<{ at: { x: number } }, { at: Date }>; // { at: Date }
```

#### 타입 파라미터

- `T`: 타깃 객체의 타입이에요.
- `S`: `T`에 병합할 소스 객체의 타입이에요.
