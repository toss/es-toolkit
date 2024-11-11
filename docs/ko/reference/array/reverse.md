# reverse

배열의 요소들을 제자리에서 반전시켜요

이 함수는 배열을 반전시키면서 원본 배열을 직접 수정해요. 입력이 null 또는 undefined일 경우, 입력 값을 그대로 반환해요.

## 인터페이스

```typescript
function reverse<T>(array: T[] | null | undefined): T[] | null | undefined;
```

### 파라미터

- `array` (`T[] | null | undefined`): 반전할 배열

### 반환 값

(`T[] | null | undefined`): 제거된 요소들의 배열.

## 예시

```typescript
const array = [1, 2, 3, 4, 5];
const reversedArray = reverse(array);
console.log(reversedArray); // [5, 4, 3, 2, 1]
console.log(array); // [5, 4, 3, 2, 1] (원본 배열이 수정되요)

const emptyArray = reverse([]);
console.log(emptyArray); // []

const nullArray = reverse(null);
console.log(nullArray); // null
```
