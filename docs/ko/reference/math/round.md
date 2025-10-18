# round

숫자를 지정된 소수점 자릿수로 반올림해요.

```typescript
const rounded = round(value, precision?);
```

## 레퍼런스

### `round(value, precision?)`

숫자를 특정 소수점 자릿수로 반올림하고 싶을 때 `round`를 사용하세요. 정확한 계산을 위한 수학 함수예요.

```typescript
import { round } from 'es-toolkit/math';

// 기본값 - 정수로 반올림해요.
const num1 = round(1.2345);
console.log(num1); // 1

// 소수점 둘째 자리까지 반올림해요.
const num2 = round(1.2345, 2);
console.log(num2); // 1.23

// 소수점 셋째 자리까지 반올림해요.
const num3 = round(1.2387, 3);
console.log(num3); // 1.239

// 음수도 반올림할 수 있어요.
const num4 = round(-1.2345, 2);
console.log(num4); // -1.23

// 큰 숫자도 처리해요.
const num5 = round(123.456789, 4);
console.log(num5); // 123.4568
```

가격 계산이나 통계에서 유용해요.

```typescript
import { round } from 'es-toolkit/math';

// 가격 계산 (소수점 둘째 자리까지)
const price = 19.999;
const finalPrice = round(price, 2);
console.log(finalPrice); // 20.00

// 퍼센트 계산 (소수점 첫째 자리까지)
const percentage = 66.66666;
const displayPercentage = round(percentage, 1);
console.log(displayPercentage); // 66.7

// 평점 계산 (소수점 첫째 자리까지)
const rating = 4.267;
const displayRating = round(rating, 1);
console.log(displayRating); // 4.3
```

정확도가 중요한 계산에서 반올림해요.

```typescript
import { round } from 'es-toolkit/math';

// 수학 계산 결과 정리
const result = Math.PI * 2;
const cleanResult = round(result, 5);
console.log(cleanResult); // 6.28318

// 측정값 반올림
const measurement = 15.789123;
const rounded = round(measurement, 3);
console.log(rounded); // 15.789
```

잘못된 precision 값은 에러를 던져요.

```typescript
import { round } from 'es-toolkit/math';

// precision이 정수가 아니면 에러가 발생해요.
try {
  round(1.23, 2.5);
} catch (error) {
  console.error(error.message); // 'Precision must be an integer.'
}
```

#### 파라미터

- `value` (`number`): 반올림할 숫자예요.
- `precision` (`number`, 선택): 소수점 자릿수예요. 정수여야 하고, 기본값은 `0`이에요.

#### 반환 값

(`number`): 지정된 자릿수로 반올림된 숫자를 반환해요.

#### 에러

- `precision`이 정수가 아니면 에러를 던져요.
