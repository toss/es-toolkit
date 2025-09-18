# flow (Lodash 호환성)

::: warning `es-toolkit`의 `flow`를 사용하세요

이 `flow` 함수는 Lodash 호환성을 위해 배열 평탄화 처리가 추가되어 복잡해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [flow](../../function/flow.md)를 사용하세요.

:::

주어진 함수들을 왼쪽부터 오른쪽으로 순차적으로 실행하는 새로운 함수를 만들어요.

```typescript
const combinedFunc = flow(...functions);
```

## 레퍼런스

### `flow(...functions)`

여러 함수를 왼쪽부터 오른쪽으로 순차적으로 실행하는 하나의 합성 함수를 만들고 싶을 때 `flow`를 사용하세요. 데이터 변환 파이프라인을 만들 때 유용해요.

```typescript
import { flow } from 'es-toolkit/compat';

// 기본 사용법
function add(x, y) {
  return x + y;
}

function square(n) {
  return n * n;
}

function double(n) {
  return n * 2;
}

// 왼쪽부터 오른쪽으로 실행: double(square(add(x, y)))
const calculate = flow(add, square, double);
console.log(calculate(1, 2)); // double(square(add(1, 2))) = double(square(3)) = double(9) = 18

// 배열로 함수 전달
const calculate2 = flow([add, square], double);
console.log(calculate2(2, 3)); // 50

// 현대적인 대안 (권장)
const modernCalculate = (x, y) => double(square(add(x, y)));
console.log(modernCalculate(1, 2)); // 18

// 파이프 연산자 사용 (미래 JavaScript)
const pipeCalculate = (x, y) => add(x, y) |> square |> double;

// 또는 체이닝 패턴
class Calculator {
  constructor(value) {
    this.value = value;
  }

  add(n) {
    this.value += n;
    return this;
  }

  square() {
    this.value *= this.value;
    return this;
  }

  double() {
    this.value *= 2;
    return this;
  }

  valueOf() {
    return this.value;
  }
}

const chainedResult = new Calculator(3).square().double().valueOf(); // 18
```

#### 파라미터

- `...functions` (`Array<Function | Function[]>`): 왼쪽부터 오른쪽으로 실행할 함수들이에요. 배열로 전달할 수도 있어요.

### 반환 값

(`Function`): 모든 함수를 왼쪽부터 오른쪽으로 순차적으로 실행하는 새로운 합성 함수를 반환해요.
