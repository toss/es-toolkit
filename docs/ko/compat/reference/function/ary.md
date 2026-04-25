# ary (Lodash 호환성)

::: warning `es-toolkit`의 [`ary`](../../function/ary.md)를 사용하세요

이 `ary` 함수는 파라미터를 복잡하게 검증하고 있어서 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [ary](../../function/ary.md)를 사용하세요.

:::

함수가 받을 수 있는 인수의 개수를 제한하는 함수를 만들어요.

```typescript
const cappedFunction = ary(func, n);
```

## 사용법

### `ary(func, n)`

함수가 받는 인수의 개수를 제한하고 싶을 때 `ary`를 사용하세요. 너무 많은 인수를 받는 함수를 안전하게 사용하거나, 콜백 함수에서 불필요한 인수를 무시할 때 유용해요.

```typescript
import { ary } from 'es-toolkit/compat';

// 기본 사용법
function greet(name, age, city) {
  return `안녕하세요, ${name}님! ${age}세, ${city}에서 오셨군요.`;
}

const limitedGreet = ary(greet, 2);
console.log(limitedGreet('김철수', 30, '서울', '추가인수'));
// "안녕하세요, 김철수님! 30세, undefined에서 오셨군요."
// 3번째 인수부터는 무시됨
```

배열 메서드와 함께 사용할 때 콜백 함수에 불필요한 인자가 전달되지 않도록 할 수 있어요.

```typescript
import { ary } from 'es-toolkit/compat';

// parseInt는 두 번째 인수(기수)를 받지만, map의 콜백은 3개 인수를 전달함
const numbers = ['1', '2', '3', '4', '5'];

// 잘못된 사용 - parseInt가 인덱스를 기수로 받음
console.log(numbers.map(parseInt)); // [1, NaN, NaN, NaN, NaN]

// ary를 사용해서 첫 번째 인수만 전달
console.log(numbers.map(ary(parseInt, 1))); // [1, 2, 3, 4, 5]
```

함수가 원하는 파라미터 인자 숫자만 받도록 제한할 수 있어요.

```typescript
import { ary } from 'es-toolkit/compat';

function sum(...args) {
  return args.reduce((total, num) => total + num, 0);
}

const sum0 = ary(sum, 0);
const sum1 = ary(sum, 1);
const sum2 = ary(sum, 2);
const sum3 = ary(sum, 3);

console.log(sum0(1, 2, 3, 4, 5)); // 0 (인수 없음)
console.log(sum1(1, 2, 3, 4, 5)); // 1 (첫 번째 인수만)
console.log(sum2(1, 2, 3, 4, 5)); // 3 (첫 두 인수만)
console.log(sum3(1, 2, 3, 4, 5)); // 6 (첫 세 인수만)
```

음수나 `NaN`을 전달하면 0으로 처리되어 모든 인수가 무시돼요.

```typescript
import { ary } from 'es-toolkit/compat';

const func = (a, b, c) => [a, b, c];

console.log(ary(func, -1)(1, 2, 3)); // [] (음수는 0으로 처리)
console.log(ary(func, NaN)(1, 2, 3)); // [] (NaN은 0으로 처리)
```

#### 파라미터

- `func` (`Function`): 인수 개수를 제한할 함수예요.
- `n` (`number`, 선택): 허용할 최대 인수 개수예요. 생략하면 함수의 `length` 속성을 사용해요.

#### 반환 값

(`Function`): 최대 `n`개의 인수만 받는 새로운 함수를 반환해요.
