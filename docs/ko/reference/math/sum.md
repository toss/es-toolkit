# sum

숫자 배열의 모든 요소를 더한 합계를 반환해요.

```typescript
const total = sum(numbers);
```

## 사용법

### `sum(nums)`

숫자들의 합계를 구하고 싶을 때 `sum`을 사용하세요. 배열의 모든 숫자를 더해서 총합을 계산해요.

```typescript
import { sum } from 'es-toolkit/math';

// 기본적인 숫자 합계
const numbers = [1, 2, 3, 4, 5];
const total = sum(numbers);
console.log(total); // 15

// 소수점 숫자들의 합계
const prices = [19.99, 25.5, 3.75];
const totalPrice = sum(prices);
console.log(totalPrice); // 49.24

// 음수와 양수 섞인 합계
const values = [-10, 5, -3, 8];
const result = sum(values);
console.log(result); // 0

// 단일 숫자 배열
const single = [42];
const singleSum = sum(single);
console.log(singleSum); // 42
```

빈 배열이나 실제 사용 예시들이에요.

```typescript
import { sum } from 'es-toolkit/math';

// 빈 배열은 0을 반환해요.
const empty = sum([]);
console.log(empty); // 0

// 점수 합계 계산
const scores = [85, 92, 78, 96, 88];
const totalScore = sum(scores);
const averageScore = totalScore / scores.length;
console.log(totalScore); // 439
console.log(averageScore); // 87.8

// 월별 매출 합계
const monthlySales = [12000, 15000, 18000, 14000, 16000];
const totalSales = sum(monthlySales);
console.log(totalSales); // 75000

// 장바구니 총 금액
const cartItems = [29.99, 15.5, 8.75, 42.0];
const cartTotal = sum(cartItems);
console.log(cartTotal); // 96.24
```

계산 결과를 다른 함수와 함께 사용할 수 있어요.

```typescript
import { sum } from 'es-toolkit/math';
import { round } from 'es-toolkit/math';

// 합계 후 반올림
const measurements = [1.234, 2.567, 3.891];
const total = sum(measurements);
const rounded = round(total, 2);
console.log(rounded); // 7.69

// 퍼센트 계산
const votes = [45, 32, 23];
const totalVotes = sum(votes);
const percentages = votes.map(vote => round((vote / totalVotes) * 100, 1));
console.log(percentages); // [45.0, 32.0, 23.0]
```

#### 파라미터

- `nums` (`readonly number[]`): 합계를 계산할 숫자 배열이에요.

#### 반환 값

(`number`): 배열에 있는 모든 숫자의 합계를 반환해요. 빈 배열인 경우 `0`을 반환해요.
