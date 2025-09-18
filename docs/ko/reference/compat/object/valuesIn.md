# valuesIn (Lodash 호환성)

::: warning `for...in` 루프나 `Object.values`를 사용하세요

이 `valuesIn` 함수는 상속된 속성 처리와 배열형 객체 처리 등의 복잡한 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `for...in` 루프나 필요에 따라 `Object.values()`를 사용하세요.

:::

객체의 모든 열거 가능한 속성 값들을 상속된 속성까지 포함해서 배열로 반환해요.

```typescript
const allValues = valuesIn(object);
```

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
