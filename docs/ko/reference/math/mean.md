# mean

숫자 배열의 평균을 계산하는 함수예요. 빈 배열에 대해서는 `NaN`을 반환해요.

## 인터페이스

```typescript
function mean(nums: number[]): number;
```

### 파라미터

- `nums` (`number[]`): 평균을 계산할 숫자 배열이에요.

### 반환 값

(`number`): 배열에 있는 모든 숫자의 평균을 반환해요.

## 예시

```typescript
const numbers = [1, 2, 3, 4, 5];
const result = mean(numbers);
// result는 3이 되어요.
```
