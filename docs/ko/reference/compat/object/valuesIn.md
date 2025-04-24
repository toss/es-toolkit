# valuesIn

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

객체에서 접근할 수 있는 모든 프로퍼티 값을 반환해요. 프로토타입에서 상속된 속성도 포함돼요.

- 값이 객체가 아닌 경우, 객체로 변환돼요.
- [배열 같은 객체](../predicate/isArrayLike.md)는 배열처럼 다뤄요.
- 일부 인덱스가 빠져 있는 희소 배열은 밀집 배열처럼 다뤄요.
- 값이 `null` 또는 `undefined`이면, 빈 배열을 반환해요.
- 프로토타입 객체를 처리할 때는 `constructor` 프로퍼티를 결과에서 제외해요.

## 인터페이스

```typescript
function valuesIn<T>(object: Record<PropertyKey, T> | null | undefined): T[];
function valuesIn<T>(arr: ArrayLike<T>): T[];
function valuesIn<T extends object>(object: T | null | undefined): Array<T[keyof T]>;
```

### 파라미터

- `object` (`Record<PropertyKey, T> | ArrayLike<T>`): 프로퍼티 값을 찾을 객체.

### 반환 값

(`T[]`): 프로퍼티 값의 배열.

## 예시

```typescript
const obj = { a: 1, b: 2, c: 3 };
valuesIn(obj); // => [1, 2, 3]
```
