# spread

인자의 배열을 펼쳐서, 원래 함수의 개별 인자로 제공하는 새로운 함수를 만들어요.

## 인터페이스

```typescript
function spread<F extends (...args: any[]) => any>(func: F): (argsArr: Parameters<F>) => ReturnType<F>;
```

### 파라미터

- `func` (`F`): 인자 배열을 개별 인자로 펼쳐서 받을 함수.

### 반환 값

(`(args: Parameters<F>) => ReturnType<F>`): 인자의 배열을 펼쳐서, 원래 함수의 개별 인자로 제공하는 새로운 함수.

## 예시

```typescript
import { spread } from 'es-toolkit/function';

function add(a, b) {
  return a + b;
}
const spreadAdd = spread(add);
console.log(spreadAdd([1, 2])); // Output: 3

// Example function to spread arguments over
// Create a new function that uses `spread` to combine arguments
const spreadAdd = spread(add, 1);
// Calling `spreadAdd` with an array as the second argument
console.log(spreadAdd(1, [2])); // Output: 3

// Function with default arguments
function greet(name, greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}
// Create a new function that uses `spread` to position the argument array at index 0
const spreadGreet = spread(greet, 0);
// Calling `spreadGreet` with an array of arguments
console.log(spreadGreet(['Alice'])); // Output: Hello, Alice!
console.log(spreadGreet(['Bob', 'Hi'])); // Output: Hi, Bob!
```

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
