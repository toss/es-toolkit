# flowRight (Lodash 호환성)

::: warning `es-toolkit`의 `flowRight`를 사용하세요

이 `flowRight` 함수는 Lodash 호환성을 위해 배열 평탄화 처리가 추가되어 복잡해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [flowRight](../../function/flowRight.md)를 사용하세요.

:::

주어진 함수들을 오른쪽부터 왼쪽으로 순차적으로 실행하는 새로운 함수를 만들어요.

```typescript
const combinedFunc = flowRight(...functions);
```

## 레퍼런스

### `flowRight(...functions)`

여러 함수를 오른쪽부터 왼쪽으로 순차적으로 실행하는 하나의 합성 함수를 만들고 싶을 때 `flowRight`를 사용하세요. 데이터 변환 파이프라인을 만들 때 유용해요.

```typescript
import { flowRight } from 'es-toolkit/compat';

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

// 오른쪽부터 왼쪽으로 실행: double(square(add(x, y)))
const calculate = flowRight(double, square, add);
console.log(calculate(1, 2)); // double(square(add(1, 2))) = double(square(3)) = double(9) = 18

// 배열로 함수 전달
const calculate2 = flowRight([double, square], add);
console.log(calculate2(2, 3)); // 50

// 현대적인 대안 (권장)
const modernCalculate = (x, y) => double(square(add(x, y)));
console.log(modernCalculate(1, 2)); // 18

// 또는 함수 체이닝 사용
const chainedCalculate = (x, y) => [x, y]
  .reduce((acc, val, idx) => idx === 0 ? val : acc + val)
  .valueOf()
  |> (n => n * n)
  |> (n => n * 2);
```

일반적으로 `flow`와 반대 순서로 동작해요. 합성 함수와 비슷한 방식으로 동작하여 직관적입니다.

#### 파라미터

- `...functions` (`Array<Function | Function[]>`): 오른쪽부터 왼쪽으로 실행할 함수들이에요. 배열로 전달할 수도 있어요.

### 반환 값

(`Function`): 모든 함수를 오른쪽부터 왼쪽으로 순차적으로 실행하는 새로운 합성 함수를 반환해요.
