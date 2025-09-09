# values

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

`object` 객체의 열거 가능한 프로퍼티 값들을 반환해요.

객체가 아닌 값은 객체로 변환해요.

## 인터페이스

```typescript
function values<T>(object: Record<PropertyKey, T> | null | undefined): T[];
function values<T>(arr: ArrayLike<T>): T[];
function values<T extends object>(object: T | null | undefined): Array<T[keyof T]>;
```

### 파라미터

- `object` (`Record<PropertyKey, T> | ArrayLike<T>`): 프로퍼티 값들을 구할 객체.

### 반환 값

(`T[]`): 프로퍼티 값의 배열.

## 예시

```typescript
const obj = { a: 1, b: 2, c: 3 };
values(obj); // => [1, 2, 3]
```
