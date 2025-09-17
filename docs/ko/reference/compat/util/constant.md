# constant (Lodash 호환성)

::: warning 화살표 함수를 사용하세요

이 `constant` 함수는 단순한 작업을 위해 추가적인 함수 래퍼를 만들어서 불필요한 오버헤드가 발생해요.

대신 더 간단하고 직관적인 화살표 함수를 사용하세요.

:::

주어진 값을 항상 반환하는 함수를 만들어요.

```typescript
const constantFunction = constant(value);
```

## 레퍼런스

### `constant(value)`

특정 값을 항상 반환하는 함수가 필요할 때 `constant`를 사용하세요. 함수형 프로그래밍에서 기본값을 제공하거나 콜백 함수로 사용할 때 유용해요.

```typescript
import { constant } from 'es-toolkit/compat';

// 기본 사용법
const always42 = constant(42);
console.log(always42()); // 42

const alwaysHello = constant('hello');
console.log(alwaysHello()); // "hello"
```

배열의 map이나 다른 고차 함수와 함께 사용할 때 편리해요:

```typescript
import { constant } from 'es-toolkit/compat';

// 모든 요소를 0으로 채우기
const numbers = [1, 2, 3, 4, 5];
const zeros = numbers.map(constant(0));
console.log(zeros); // [0, 0, 0, 0, 0]

// 모든 요소를 같은 객체로 바꾸기
const users = ['alice', 'bob', 'charlie'];
const defaultUser = users.map(constant({ role: 'user', active: true }));
console.log(defaultUser);
// [{ role: 'user', active: true }, { role: 'user', active: true }, { role: 'user', active: true }]
```

화살표 함수와 비교:

```typescript
// constant 사용
const getValue = constant(42);

// 화살표 함수 사용 (더 간단하고 직관적)
const getValue = () => 42;

// 또는 콜백에서 직접 사용
numbers.map(() => 0); // constant(0) 대신
```

조건부 기본값 제공에도 활용할 수 있어요:

```typescript
import { constant } from 'es-toolkit/compat';

function processData(data, fallback = constant('기본값')) {
  return data || fallback();
}

console.log(processData(null)); // "기본값"
console.log(processData('실제 데이터')); // "실제 데이터"
```

객체 참조를 유지해요:

```typescript
import { constant } from 'es-toolkit/compat';

const obj = { a: 1 };
const getObj = constant(obj);

console.log(getObj() === obj); // true (같은 객체 참조)
```

#### 파라미터

- `value` (`T`, 선택): 함수가 반환할 값이에요. 제공하지 않으면 `undefined`를 반환해요.

### 반환 값

(`() => T | undefined`): 주어진 값을 항상 반환하는 새로운 함수를 반환해요.
