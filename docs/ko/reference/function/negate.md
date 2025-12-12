# negate

참 또는 거짓을 반환하는 함수의 반환 값을 반대로 바꾸는 새로운 함수를 만들어요.

```typescript
const negatedFunc = negate(booleanFunc);
```

## 사용법

### `negate(func)`

참 또는 거짓 값을 반환하는 함수의 결과를 반대로 바꾸고 싶을 때 `negate`를 사용하세요.

조건부 함수나 필터링 로직을 반전시킬 때 유용해요. 예를 들어, 짝수를 찾는 함수를 홀수를 찾는 함수로 바꿀 수 있어요.

```typescript
import { negate } from 'es-toolkit/function';

// 기본 사용법
const isEven = (n: number) => n % 2 === 0;
const isOdd = negate(isEven);

console.log(isEven(2)); // true
console.log(isOdd(2)); // false

console.log(isEven(3)); // false
console.log(isOdd(3)); // true

// 배열 필터링에서 사용
const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.filter(isEven);
console.log(evenNumbers); // [2, 4, 6]

const oddNumbers = numbers.filter(negate(isEven));
console.log(oddNumbers); // [1, 3, 5]
```

복잡한 조건 함수도 반전시킬 수 있어요.

```typescript
import { negate } from 'es-toolkit/function';

const isLongString = (str: string) => str.length > 5;
const isShortString = negate(isLongString);

const words = ['hi', 'hello', 'world', 'javascript'];

const longWords = words.filter(isLongString);
console.log(longWords); // ['hello', 'javascript']

const shortWords = words.filter(isShortString);
console.log(shortWords); // ['hi', 'world']
```

#### 파라미터

- `func` (`F`): 불린 값을 반환하는 함수예요.

#### 반환 값

(`F`): 원래 함수와 같은 인수를 받지만 반대의 불린 값을 반환하는 새로운 함수를 반환해요.
