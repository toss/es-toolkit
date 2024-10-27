# sum

숫자 배열의 합계를 계산하는 함수에요.

이 함수는 숫자 배열을 받아서 배열의 모든 요소를 더한 합계를 반환해요.

배열이 비어있으면 이 함수는 `0`을 반환해요.

배열에 `bigint` 값이 포함되어 있으면 함수는 `bigint` 값을 반환해요.

## 인터페이스

```typescript
function sum(nums: number[]): number;
function sum(nums: bigint[]): bigint;
```

### 파라미터

- `nums` (`readonly number[] | readonly bigint[]`): 합계를 계산할 숫자 배열이에요.

### 반환 값

(`number | bigint`): 배열에 있는 모든 숫자의 합계를 반환해요.

## 예시

```typescript
sum([1, 2, 3, 4, 5]); // 15
sum([1n, 2n, 3n, 4n, 5n]); // 15n
sum([]); // 0
```
