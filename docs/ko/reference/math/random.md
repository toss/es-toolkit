# random

지정된 범위에서 무작위 숫자를 생성해요. 생성되는 숫자는 소수점을 포함하는 숫자예요.

```typescript
const randomNumber = random(min, max);
```

## 레퍼런스

### `random(maximum)` / `random(minimum, maximum)`

무작위 숫자가 필요할 때 `random`을 사용하세요. 소수점이 있는 숫자를 생성해요.

```typescript
import { random } from 'es-toolkit/math';

// 0 이상 5 미만의 무작위 소수를 생성해요.
const num1 = random(5);
console.log(num1); // 예: 2.718281828

// 2 이상 10 미만의 무작위 소수를 생성해요.
const num2 = random(2, 10);
console.log(num2); // 예: 7.158765432

// 음수 범위에서도 사용할 수 있어요.
const num3 = random(-5, -1);
console.log(num3); // 예: -3.842134567

// 소수 범위도 가능해요.
const num4 = random(1.5, 2.5);
console.log(num4); // 예: 1.923456789
```

범위가 잘못된 경우 에러를 던져요.

```typescript
import { random } from 'es-toolkit/math';

// 최댓값이 0 이하이면 에러가 발생해요.
try {
  random(0);
} catch (error) {
  console.error(error.message); // 'Invalid input: The maximum value must be greater than the minimum value.'
}

// 최솟값이 최댓값보다 크거나 같으면 에러가 발생해요.
try {
  random(5, 3);
} catch (error) {
  console.error(error.message); // 'Invalid input: The maximum value must be greater than the minimum value.'
}
```

#### 파라미터

- `maximum` (`number`): 단일 파라미터 사용 시 최댓값(미포함)이에요. 0보다 커야 해요.
- `minimum` (`number`): 최솟값(포함)이에요.
- `maximum` (`number`): 최댓값(미포함)이에요. 최솟값보다 커야 해요.

#### 반환 값

(`number`): 지정된 범위 내의 무작위 소수를 반환해요.

#### 에러

- 최댓값이 최솟값보다 작거나 같으면 에러를 던져요.
