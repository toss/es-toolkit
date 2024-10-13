# sample

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

주어진 배열, 객체 또는 문자열에서 무작위로 하나의 요소를 반환해요.

## 인터페이스

```typescript
function sample<T>(collection: ArrayLike<T> | Record<string, T>): T | string | undefined;
```

### 파라미터

- `collection` (ArrayLike<T> | Record<string, T>): 샘플링할 컬렉션 (배열, 문자열 또는 객체)

### 반환 값

- (T | string | undefined): 컬렉션에서 무작위로 선택된 요소. 컬렉션이 비어있거나 유효하지 않으면 undefined를 반환해요.

### 예시

```typescript
// 배열의 경우
const array = [1, 2, 3];
const result = sample(array); // => 1, 2, 3

// 문자열의 경우
const str = 'hello';
const result = sample(str); // => 'h', 'e', 'l', 'o'

// 객체의 경우
const obj = { a: 1, b: 2, c: 3 };
const result = sample(obj); // => 1, 2, 3

// 빈 배열의 경우
const emptyArray = [];
const result = sample(emptyArray); // => undefined
```
