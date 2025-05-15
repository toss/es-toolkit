# overSome

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 조건 함수들 중 하나라도 제공된 값에 대해 참을 반환하는지 확인하는 함수를 생성해요.

이 함수는 여러 개의 조건 함수(단일 조건 함수 또는 조건 함수 배열)를 인수로 받아, 주어진 값들에 대해 어떤 조건 함수라도 참을 반환하는지 확인하는 새로운 함수를 반환해요.

## 인터페이스

```typescript
function overSome<T, U extends T, V extends T>(
  predicate1: (value: T) => value is U,
  predicate2: (value: T) => value is V
): (value: T) => value is U | V;
function overSome<T>(
  ...predicates: Array<((...values: T[]) => boolean) | ReadonlyArray<(...values: T[]) => boolean>>
): (...values: T[]) => boolean;
```

### 파라미터

- `predicates` (`...Array<((...values: T[]) => boolean) | ReadonlyArray<(...values: T[]) => boolean>>`): -
  조건 함수 또는 조건 함수 배열의 목록이에요. 각 조건 함수는 하나 이상의 `T` 타입의 값을 받아, 그 값들이 조건을 만족하는지 여부를 나타내는 불리언 값을 반환해요.

### 반환 값

(`(...values: T[]) => boolean`): 값들의 목록을 받아, 주어진 값들에 대해 어떤 조건 함수라도 참을 반환하면 `true`를, 그렇지 않으면 `false`를 반환하는 함수를 반환해요.

## 예시

```typescript
const func = overSome(
  (value) => typeof value === 'string',
  (value) => typeof value === 'number',
  (value) => typeof value === 'symbol'
);

func("hello"); // true
func(42); // true
func(Symbol()); // true
func([]); // false

const func = overSome([
  (value) => value.a > 0,
  (value) => value.b > 0
]);

func({ a: 0, b: 2 }); // true
func({ a: 0, b: 0 }); // false

const func = overSome(
  (a, b) => typeof a === 'string' && typeof b === 'string',
  (a, b) => a > 0 && b > 0
);

func("hello", "world"); // true
func(1, 10); // true
func(0, 2); // false
```
