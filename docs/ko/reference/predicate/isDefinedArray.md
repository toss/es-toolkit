# isDefinedArray

주어진 배열의 모든 요소가 `undefined`나 `null`이 아닌지 확인해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 배열의 타입을 넓은 범위 `T | undefined | null`에서 정의된 타입 `T`으로 좁혀요.

## 시그니처

```typescript
function isDefinedArray<T>(array: Array<T | undefined | null>): array is T[];
```

### 매개변수

- `array` (`Array<T | undefined | null>`): 모든 요소가 정의되어 있는지 확인할 배열.

### 반환값

(`array is T[]`): 모든 요소가 정의되어 있으면 `true`, 그렇지 않으면 `false`.

## 예시

```typescript
// 모든 요소가 정의되어 있어 true를 반환해요.
console.log(isDefinedArray([1, 2, 3])); // true

// 요소 중에 undefined나 null이 있으면 false를 반환해요.
console.log(isDefinedArray([undefined, 1, 2, 3])); // false
console.log(isDefinedArray([null, 1, 2, 3])); // false

// 빈 배열은 모든 요소가 정의되어 있다고 간주되어 true를 반환해요.
console.log(isDefinedArray([])); // true
```
