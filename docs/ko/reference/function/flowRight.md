# flowRight

주어진 함수들을 오른쪽에서 왼쪽으로 순서대로 실행하는 새로운 함수를 만들어요.

```typescript
const combined = flowRight(func1, func2, func3);
```

## 사용법

### `flowRight(...funcs)`

여러 함수를 오른쪽에서 왼쪽으로 순서대로 실행하는 새로운 함수를 만들고 싶을 때 `flowRight`를 사용하세요. 이전 함수의 반환 값이 다음 함수의 파라미터로 전달돼요.

함수를 역순으로 조합하여 데이터 변환 파이프라인을 만들 때 유용해요. `flow`와 반대 방향으로 함수를 실행해요.

```typescript
import { flowRight } from 'es-toolkit/function';

const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;
const double = (n: number) => n * 2;

// 오른쪽에서 왼쪽으로 실행: double -> square -> add
const combined = flowRight(double, square, add);
console.log(combined(1, 2)); // 18
// 실행 순서: add(1, 2) = 3, square(3) = 9, double(9) = 18

// 단일 함수로도 사용 가능해요
const single = flowRight((x: number) => x + 1);
console.log(single(5)); // 6
```

`this` 컨텍스트도 함수들에게 전달돼요.

```typescript
import { flowRight } from 'es-toolkit/function';

const context = {
  multiplier: 3,
};

function multiply(this: typeof context, x: number) {
  return x * this.multiplier;
}

const add = (x: number) => x + 10;

const combined = flowRight(multiply, add).bind(context);
console.log(combined(5)); // 45
// 실행 순서: add(5) = 15, multiply(15) = 45
```

#### 파라미터

- `funcs` (`(...args: any[]) => any`): 조합할 함수들이에요.

#### 반환 값

(`(...args: any[]) => any`): 주어진 함수들을 오른쪽에서 왼쪽으로 순서대로 실행하는 새로운 함수를 반환해요.
