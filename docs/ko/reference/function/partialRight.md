# partialRight

일부 파라미터를 뒤쪽에서부터 미리 적용한 새로운 함수를 만들어요.

```typescript
const partialRightFunc = partialRight(func, arg1, arg2);
```

## 레퍼런스

### `partialRight(func, ...args)`

함수의 일부 파라미터를 뒤쪽에서부터 고정하고 싶을 때 `partialRight`를 사용하세요. `partial`과 반대로, 미리 제공된 파라미터들이 함수 뒤쪽에 배치되고, 나중에 전달되는 파라미터들은 앞쪽에 추가돼요.

함수의 마지막 파라미터들을 고정하고 앞쪽 파라미터들만 동적으로 변경하고 싶을 때 유용해요.

`partialRight.placeholder`를 사용하면 특정 위치의 파라미터를 나중에 전달할 수 있어요.

```typescript
import { partialRight } from 'es-toolkit/function';

// 기본 사용법
function greet(greeting: string, name: string) {
  return `${greeting}, ${name}!`;
}

const greetJohn = partialRight(greet, 'John');
console.log(greetJohn('Hello')); // 'Hello, John!'
console.log(greetJohn('Hi')); // 'Hi, John!'

// 여러 파라미터 적용
function subtract(a: number, b: number, c: number) {
  return a - b - c;
}

const subtractFrom10And5 = partialRight(subtract, 5, 2);
console.log(subtractFrom10And5(10)); // 10 - 5 - 2 = 3

// 수학 연산에서 상수 적용
function divide(dividend: number, divisor: number) {
  return dividend / divisor;
}

const divideBy2 = partialRight(divide, 2);
console.log(divideBy2(10)); // 10 / 2 = 5
console.log(divideBy2(20)); // 20 / 2 = 10
```

플레이스홀더를 사용해서 파라미터 순서를 조정할 수 있어요.

```typescript
import { partialRight } from 'es-toolkit/function';

function formatMessage(level: string, message: string, timestamp: string) {
  return `[${level}] ${message} at ${timestamp}`;
}

// 마지막 파라미터만 고정하고 나머지는 나중에 전달
const logWithTime = partialRight(formatMessage, partialRight.placeholder, '2023-01-01');
console.log(logWithTime('INFO', 'Application started'));
// '[INFO] Application started at 2023-01-01'

// 배열과 함께 사용
const numbers = [1, 2, 3, 4, 5];
const appendSuffix = partialRight((num: number, suffix: string) => `${num}${suffix}`, 'th');
const result = numbers.map(appendSuffix);
console.log(result); // ['1th', '2th', '3th', '4th', '5th']
```

#### 파라미터

- `func` (`F`): 파라미터를 부분적으로 적용할 함수예요.
- `args` (`any[]`, 선택): 뒤쪽부터 미리 적용할 파라미터들이에요.

#### 반환 값

(`(...args: any[]) => ReturnType<F>`): 일부 파라미터가 뒤쪽에서부터 미리 적용된 새로운 함수를 반환해요.
