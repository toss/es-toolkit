# median

숫자 배열의 중앙값을 계산하는 함수에요.

빈 배열에 대해서는 `NaN`을 반환해요.
배열의 요소 수가 홀수인 경우, 중앙 요소를 반환해요.
배열의 요소 수가 짝수인 경우, 중앙의 두 요소의 평균을 반환해요.

## 인터페이스

```typescript
function median(nums: readonly number[]): number;
```

### 파라미터

- `nums` (`readonly number[]`): 중앙값을 계산할 숫자 배열이에요.

### 반환 값

(`number`): 배열에 있는 모든 숫자의 중앙값을 반환해요.

## 예시

```typescript
const arrayWithOddNumberOfElements = [1, 2, 3, 4, 5];
const result = median(arrayWithOddNumberOfElements);
// result는 3이 되어요.

const arrayWithEvenNumberOfElements = [1, 2, 3, 4];
const result = median(arrayWithEvenNumberOfElements);
// result는 2.5가 되요.
```
