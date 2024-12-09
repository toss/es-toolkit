# median

숫자 배열의 중앙값을 계산하는 함수예요.

중앙값이란 배열을 정렬했을 때 중앙에 위치하는 요소를 말해요.
배열이 홀수 개의 요소를 가진다면, 중앙에 있는 요소를 반환해요.
배열이 짝수 개의 요소를 가진다면, 중앙에 있는 두 요소의 평균을 반환해요.

빈 배열이 주어지면 `NaN`을 반환해요.

## 인터페이스

```typescript
function median(nums: number[]): number;
```

### 파라미터

- `nums` (`number[]`): 중앙값을 계산할 숫자 배열이에요.

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
