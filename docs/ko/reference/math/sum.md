# sum

숫자 배열의 합계를 계산하는 함수예요.

이 함수는 숫자 배열을 받아서 배열의 모든 요소를 더한 합계를 반환해요.

## 인터페이스

```typescript
function sum(nums: number[]): number;
```

### 파라미터

- `nums` (`number[]`): 합계를 계산할 숫자 배열이에요.

### 반환 값

(`number`): 배열에 있는 모든 숫자의 합계를 반환해요.

## 예시

```typescript
const numbers = [1, 2, 3, 4, 5];
const result = sum(numbers);
// result는 15가 되어요.
```
