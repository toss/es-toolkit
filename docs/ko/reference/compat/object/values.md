# values (Lodash 호환성)

::: warning `Object.values`를 사용하세요

이 `values` 함수는 단순히 `Object.values`를 호출하므로 불필요한 오버헤드가 있어요.

대신 더 빠르고 현대적인 `Object.values()`를 직접 사용하세요.

:::

객체의 자체 열거 가능한 속성 값들을 배열로 반환해요.

```typescript
const valueArray = values(object);
```

## 인터페이스

```typescript
function values<T>(object: Record<PropertyKey, T> | null | undefined): T[];
function values<T>(arr: ArrayLike<T>): T[];
function values<T extends object>(object: T | null | undefined): Array<T[keyof T]>;
```

### 파라미터

- `object` (`Record<PropertyKey, T> | ArrayLike<T>`): 프로퍼티 값들을 구할 객체.

#### 반환 값

(`T[]`): 프로퍼티 값의 배열.

## 예시

```typescript
const obj = { a: 1, b: 2, c: 3 };
values(obj); // => [1, 2, 3]
```
