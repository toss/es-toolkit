# unary

함수가 첫 번째 파라미터만 받도록 제한하는 새로운 함수를 만들어요.

```typescript
const unaryFunc = unary(func);
```

## 레퍼런스

### `unary(func)`

함수가 하나의 파라미터만 받도록 제한하고 싶을 때 `unary`를 사용하세요. 추가로 전달되는 파라미터들은 모두 무시돼요.

배열의 `map`, `filter`, `forEach` 같은 메서드에서 콜백 함수가 예상보다 많은 파라미터를 받는 것을 방지하거나, 함수형 프로그래밍에서 함수의 아리티(arity)를 제한하고 싶을 때 유용해요.

```typescript
import { unary } from 'es-toolkit/function';

// 기본 사용법
function greet(name: string, age?: number, city?: string) {
  console.log(`안녕하세요, ${name}님!`);
  if (age) console.log(`나이: ${age}`);
  if (city) console.log(`도시: ${city}`);
}

const greetOnlyName = unary(greet);
greetOnlyName('철수', 25, '서울'); // '안녕하세요, 철수님!'만 출력

// 배열 메서드와 함께 사용
const numbers = ['1', '2', '3', '4', '5'];

// parseInt는 두 번째 파라미터로 기수를 받는데,
// map의 콜백에서는 (value, index, array)를 전달함
console.log(numbers.map(parseInt)); // [1, NaN, NaN, NaN, NaN] (예상치 못한 결과)

// unary를 사용해서 첫 번째 파라미터만 전달
console.log(numbers.map(unary(parseInt))); // [1, 2, 3, 4, 5] (예상된 결과)

// 다른 예시: 함수가 여러 파라미터를 받지만 하나만 사용하고 싶을 때
function logValue(value: any, prefix: string = 'Value:', suffix: string = '') {
  console.log(`${prefix} ${value} ${suffix}`);
}

const data = ['apple', 'banana', 'cherry'];

// prefix와 suffix 없이 값만 출력하고 싶을 때
data.forEach(unary(logValue)); 
// Value: apple
// Value: banana  
// Value: cherry
```

함수 컴포지션에서도 유용해요.

```typescript
import { unary } from 'es-toolkit/function';

// 여러 파라미터를 받는 함수
function multiply(a: number, b: number = 1, c: number = 1) {
  return a * b * c;
}

// 첫 번째 파라미터만 사용하도록 제한
const multiplyOne = unary(multiply);

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => multiplyOne(x, 2, 3)); // b와 c는 무시됨
console.log(doubled); // [1, 2, 3, 4, 5] (1 * 1 * 1의 결과)
```

#### 파라미터

- `func` (`F`): 첫 번째 파라미터만 받도록 제한할 함수예요.

#### 반환 값

(`(...args: any[]) => ReturnType<F>`): 첫 번째 파라미터만 원래 함수에 전달하는 새로운 함수를 반환해요.
