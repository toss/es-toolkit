# curry (Lodash 호환성)

::: warning `es-toolkit`의 `curry`나 수동 클로저를 사용하세요

이 `curry` 함수는 복잡한 placeholder 처리, arity 검증, 인수 합성 로직으로 인해 느리게 동작해요.

placeholder가 필요하지 않다면 대신 더 빠른 `es-toolkit`의 [`curry`](../../function/curry.md)나 간단한 클로저를 사용하세요.

:::

함수를 커링해서 인수를 하나씩 받거나 여러 개씩 받을 수 있는 함수를 만들어요.

```typescript
const curriedFunction = curry(func, arity);
```

## 레퍼런스

### `curry(func, arity)`

함수를 커링해서 부분 적용을 쉽게 하고 싶을 때 `curry`를 사용하세요. 인수를 단계적으로 제공하거나 placeholder를 사용해서 특정 위치의 인수를 나중에 제공할 때 유용해요.

```typescript
import { curry } from 'es-toolkit/compat';

// 기본 사용법
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

// 다양한 방식으로 호출 가능
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6
```

메인 라이브러리 curry와 비교:

```typescript
// compat 버전 (유연함, 하지만 느림)
import { curry } from 'es-toolkit/compat';
const curriedCompat = curry(add);
curriedCompat(1, 2)(3); // 지원됨
curriedCompat(1)(curry.placeholder, 3)(2); // placeholder 지원

// 메인 라이브러리 버전 (더 빠름, 하지만 한 번에 하나씩만)
import { curry } from 'es-toolkit';
const curriedMain = curry(add);
curriedMain(1)(2)(3); // 지원됨
curriedMain(1, 2)(3); // 지원되지 않음
```

placeholder 기능 사용:

```typescript
import { curry } from 'es-toolkit/compat';

function greet(greeting, name, punctuation) {
  return `${greeting}, ${name}${punctuation}`;
}

const curriedGreet = curry(greet);

// placeholder로 중간 인수 건너뛰기
const greetWithExclamation = curriedGreet(curry.placeholder, curry.placeholder, '!');
console.log(greetWithExclamation('Hello', '김철수')); // "Hello, 김철수!"

const sayHello = curriedGreet('Hello');
console.log(sayHello(curry.placeholder, '~')('이영희')); // "Hello, 이영희~"
```

함수형 프로그래밍에서 활용:

```typescript
import { curry } from 'es-toolkit/compat';

// 맵핑 함수 만들기
const map = curry((fn, array) => array.map(fn));
const filter = curry((predicate, array) => array.filter(predicate));

const numbers = [1, 2, 3, 4, 5];

// 재사용 가능한 함수들 생성
const double = x => x * 2;
const isEven = x => x % 2 === 0;

const mapDouble = map(double);
const filterEven = filter(isEven);

console.log(mapDouble(numbers)); // [2, 4, 6, 8, 10]
console.log(filterEven(numbers)); // [2, 4]

// 함수 합성
const processNumbers = nums => mapDouble(filterEven(nums));
console.log(processNumbers(numbers)); // [4, 8]
```

API 클라이언트 구성:

```typescript
import { curry } from 'es-toolkit/compat';

function apiRequest(method, baseUrl, endpoint, options) {
  return fetch(`${baseUrl}${endpoint}`, {
    method,
    ...options,
  });
}

const curriedApiRequest = curry(apiRequest);

// 기본 설정으로 특화된 함수들 생성
const apiGet = curriedApiRequest('GET', 'https://api.example.com');
const apiPost = curriedApiRequest('POST', 'https://api.example.com');

// 인증 헤더 포함
const authenticatedPost = apiPost(curry.placeholder, {
  headers: { Authorization: 'Bearer token123' },
});

// 사용
apiGet('/users'); // GET https://api.example.com/users
authenticatedPost('/users'); // POST with auth headers
```

수학 연산 함수:

```typescript
import { curry } from 'es-toolkit/compat';

const calculate = curry((operation, a, b) => {
  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      throw new Error('지원하지 않는 연산');
  }
});

// 특화된 연산 함수들
const add = calculate('+');
const subtract = calculate('-');
const multiply = calculate('*');

console.log(add(5, 3)); // 8
console.log(subtract(10)(4)); // 6
console.log(multiply(3, 4)); // 12

// placeholder로 두 번째 피연산자 고정
const addFive = calculate('+', curry.placeholder, 5);
console.log(addFive(10)); // 15
```

Arity 지정:

```typescript
import { curry } from 'es-toolkit/compat';

function variableArgsFunction(a, b, c, ...rest) {
  return [a, b, c, rest];
}

// arity를 3으로 제한
const curriedFixed = curry(variableArgsFunction, 3);

console.log(curriedFixed(1)(2)(3)); // [1, 2, 3, []]
console.log(curriedFixed(1, 2)(3)); // [1, 2, 3, []]

// arity 없이 사용 (기본값: function.length)
const curriedDefault = curry(variableArgsFunction); // arity = 3
```

간단한 커링 대안:

```typescript
// curry 사용
const curriedAdd = curry((a, b, c) => a + b + c);

// 수동 클로저 (더 빠름)
const manualCurry = a => b => c => a + b + c;

// 둘 다 같은 결과
console.log(curriedAdd(1)(2)(3)); // 6
console.log(manualCurry(1)(2)(3)); // 6
```

생성자 함수도 지원:

```typescript
import { curry } from 'es-toolkit/compat';

function Person(name, age, city) {
  this.name = name;
  this.age = age;
  this.city = city;
}

const CurriedPerson = curry(Person);
const SeoulPerson = CurriedPerson(curry.placeholder, curry.placeholder, '서울');

const person1 = new SeoulPerson('김철수', 30);
const person2 = new SeoulPerson('이영희', 25);

console.log(person1.city); // "서울"
console.log(person2.city); // "서울"
```

#### 파라미터

- `func` (`Function`): 커링할 함수예요.
- `arity` (`number`, 선택): 함수의 arity(인수 개수)예요. 생략하면 `func.length`를 사용해요.

#### 반환 값

(`Function & { placeholder: symbol }`): 커링된 함수를 반환해요. `placeholder` 속성으로 인수 위치를 제어할 수 있어요.
