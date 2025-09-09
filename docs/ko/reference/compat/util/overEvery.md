# overEvery

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 모든 조건 함수들에 대해 제공된 값들이 참을 반환하는지 확인하는 함수를 생성해요.

이 함수는 여러 개의 조건 함수를 받아요. 이 조건 함수들은 개별적인 함수일 수도 있고, 조건 함수들의 배열로도 이루어질 수 있어요.
제공된 값들에 대해 호출되었을 때 모든 조건 함수가 참을 반환하는지 확인하는 새로운 함수를 반환해요.

## 인터페이스

```typescript
function overEvery<T, U extends T, V extends T>(
  predicate1: (value: T) => value is U,
  predicate2: (value: T) => value is V
): (value: T) => value is U & V;
function overEvery<T>(
  ...predicates: Array<((...args: T[]) => boolean) | ReadonlyArray<(...args: T[]) => boolean>>
): (...args: T[]) => boolean;
```

### 파라미터

- `predicates` (`...Array<((...values: T[]) => boolean) | ReadonlyArray<(...values: T[]) => boolean>>`): -
  조건 함수 또는 조건 함수 배열의 목록이에요. 각 조건 함수는 하나 이상의 값 `T` 타입을 받아들이고,
  그 값들이 조건을 만족하는지 여부를 나타내는 boolean을 반환하는 함수에요.

### 반환 값

(`(...values: T[]) => boolean`): 값의 리스트를 받아 제공된 값들에 대해 모든 조건 함수가 참을 반환하면 `true`를,
그렇지 않으면 `false`를 반환하는 함수에요.

## 예시

```typescript
const func = overEvery(
  (value) => typeof value === 'string',
  (value) => value.length > 3
);

func("hello"); // true
func("hi"); // false
func(42); // false

const func = overEvery([
  (value) => value.a > 0,
  (value) => value.b > 0
]);

func({ a: 1, b: 2 }); // true
func({ a: 0, b: 2 }); // false

const func = overEvery(
  (a, b) => typeof a === 'string' && typeof b === 'string',
  (a, b) => a.length > 3 && b.length > 3
);

func("hello", "world"); // true
func("hi", "world"); // false
func(1, 10); // false
```
