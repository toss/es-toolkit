# spread

파라미터 배열을 펼쳐서 함수의 개별 파라미터로 전달하는 새로운 함수를 만들어요.

```typescript
const spreadFunc = spread(func);
```

## 레퍼런스

### `spread(func)`

배열 형태의 파라미터를 개별 파라미터로 펼쳐서 함수에 전달하고 싶을 때 `spread`를 사용하세요.

JavaScript의 스프레드 연산자(`...`)와 비슷한 역할을 하지만, 함수를 변환해서 배열을 받도록 만드는 방식이에요. `apply` 메서드를 자주 사용하는 상황에서 유용해요.

```typescript
import { spread } from 'es-toolkit/function';

// 기본 사용법
function add(a: number, b: number) {
  return a + b;
}

const spreadAdd = spread(add);
console.log(spreadAdd([5, 3])); // 8

// 여러 파라미터가 있는 함수
function greet(greeting: string, name: string, punctuation: string) {
  return `${greeting}, ${name}${punctuation}`;
}

const spreadGreet = spread(greet);
console.log(spreadGreet(['Hello', 'World', '!'])); // 'Hello, World!'

// Math 함수와 함께 사용
const numbers = [1, 2, 3, 4, 5];
const spreadMax = spread(Math.max);
console.log(spreadMax(numbers)); // 5

const spreadMin = spread(Math.min);
console.log(spreadMin(numbers)); // 1
```

`this` 컨텍스트도 유지돼요.

```typescript
import { spread } from 'es-toolkit/function';

const calculator = {
  multiply: function(a: number, b: number, c: number) {
    return a * b * c;
  }
};

const spreadMultiply = spread(calculator.multiply);
console.log(spreadMultiply.call(calculator, [2, 3, 4])); // 24
```

#### 파라미터

- `func` (`F`): 배열을 개별 파라미터로 펼쳐서 받을 함수예요.

#### 반환 값

(`(args: Parameters<F>) => ReturnType<F>`): 파라미터 배열을 받아서 펼쳐진 형태로 원래 함수에 전달하는 새로운 함수를 반환해요.

## Lodash와의 호환성

`es-toolkit/compat`에서 `spread`를 가져오면 lodash와 호환돼요.

- `spread`는 `argsIndex`라고 하는 숫자 인자를 추가로 받아요. 이 인자는 펼칠 인자 배열이 주어진 인덱스를 나타내요.
  - 만약 `argsIndex`이 음수이거나 `NaN`이라면, 기본값 `0`으로 취급돼요. 소수라면, 가까운 정수로 내림해요.

```typescript
import { spread } from 'es-toolkit/compat';

function fn(a: unknown, b: unknown, c: unknown) {
  return Array.from(arguments);
}

spread(fn, -1)([1, 2]); // Returns [1, 2]
spread(fn, NaN)([1, 2]); // Returns [1, 2]
spread(fn, 'a')([1, 2]); // Returns [1, 2]
spread(fn, 1.6)(1, [2, 3]); // Returns [1, 2, 3]
```
