# randomInt

지정된 범위에서 무작위 정수를 생성해요.

```typescript
const randomInteger = randomInt(min, max);
```

## 사용법

### `randomInt(maximum)` / `randomInt(minimum, maximum)`

무작위 정수가 필요할 때 `randomInt`를 사용하세요. 소수점이 없는 정수만 반환해요.

```typescript
import { randomInt } from 'es-toolkit/math';

// 0 이상 5 미만의 무작위 정수를 생성해요.
const num1 = randomInt(5);
console.log(num1); // 예: 3

// 2 이상 10 미만의 무작위 정수를 생성해요.
const num2 = randomInt(2, 10);
console.log(num2); // 예: 7

// 음수 범위에서도 사용할 수 있어요.
const num3 = randomInt(-5, -1);
console.log(num3); // 예: -3

// 주사위 시뮬레이션 (1-6)
const diceRoll = randomInt(1, 7);
console.log(diceRoll); // 예: 4

// 배열에서 무작위 인덱스 선택
const items = ['apple', 'banana', 'cherry', 'date'];
const randomIndex = randomInt(items.length);
console.log(items[randomIndex]); // 예: 'banana'
```

#### 파라미터

- `maximum` (`number`): 단일 파라미터 사용 시 최댓값(미포함)이에요. 0보다 커야 해요.
- `minimum` (`number`): 최솟값(포함)이에요.
- `maximum` (`number`): 최댓값(미포함)이에요. 최솟값보다 커야 해요.

#### 반환 값

(`number`): 지정된 범위 내의 무작위 정수를 반환해요.

#### 에러

- 최댓값이 최솟값보다 작거나 같으면 에러를 던져요.
