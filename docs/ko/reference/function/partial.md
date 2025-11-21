# partial

일부 인수를 미리 적용한 새로운 함수를 만들어요.

```typescript
const partialFunc = partial(func, arg1, arg2);
```

## 사용법

### `partial(func, ...args)`

함수의 일부 인수를 미리 고정하고 싶을 때 `partial`을 사용하세요. 미리 제공된 인수들이 함수 앞쪽에 배치되고, 나중에 전달되는 인수들은 뒤쪽에 추가돼요.

함수형 프로그래밍에서 자주 사용되는 커링(currying)과 비슷한 개념이에요. `bind`와 달리 `this` 컨텍스트를 고정하지 않아요.

`partial.placeholder`를 사용하면 특정 위치의 인수를 나중에 전달할 수 있어요.

```typescript
import { partial } from 'es-toolkit/function';

// 기본 사용법
function greet(greeting: string, name: string) {
  return `${greeting}, ${name}!`;
}

const sayHello = partial(greet, 'Hello');
console.log(sayHello('John')); // 'Hello, John!'
console.log(sayHello('Jane')); // 'Hello, Jane!'

// 여러 인수 적용
function multiply(a: number, b: number, c: number) {
  return a * b * c;
}

const double = partial(multiply, 2);
console.log(double(3, 4)); // 24

const doubleAndTriple = partial(multiply, 2, 3);
console.log(doubleAndTriple(4)); // 24
```

플레이스홀더를 사용해서 인수 순서를 조정할 수 있어요.

```typescript
import { partial } from 'es-toolkit/function';

function subtract(a: number, b: number, c: number) {
  return a - b - c;
}

// 두 번째 인수만 고정하고 첫 번째와 세 번째는 나중에 전달
const subtractFrom5 = partial(subtract, partial.placeholder, 5, partial.placeholder);
console.log(subtractFrom5(10, 2)); // 10 - 5 - 2 = 3

// 배열 메소드와 함께 사용
const numbers = [1, 2, 3, 4, 5];
const addTen = partial((x: number, y: number) => x + y, 10);
const result = numbers.map(addTen);
console.log(result); // [11, 12, 13, 14, 15]
```

#### 파라미터

- `func` (`F`): 인수를 부분적으로 적용할 함수예요.
- `args` (`any[]`, 선택): 미리 적용할 인수들이에요.

#### 반환 값

(`(...args: any[]) => ReturnType<F>`): 일부 인수가 미리 적용된 새로운 함수를 반환해요.
