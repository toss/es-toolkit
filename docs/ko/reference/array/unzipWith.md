# unzipWith

묶여있는 배열들을 풀고, 변환 함수를 적용해서 새로운 배열을 반환해요.

```typescript
const transformedArray = unzipWith(target, iteratee);
```

## 레퍼런스

### `unzipWith(target, iteratee)`

여러 배열이 묶여 있는 2차원 배열에서 같은 위치의 요소들을 모아서 변환 함수를 적용한 결과를 얻고 싶을 때 `unzipWith`를 사용하세요. `unzip`과 비슷하지만 각 그룹의 요소들을 사용자 정의 함수로 변환할 수 있어요.

```typescript
import { unzipWith } from 'es-toolkit/array';

// 같은 위치의 숫자들을 더해요.
const numbers = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const sums = unzipWith(numbers, (a, b, c) => a + b + c);
console.log(sums); // [9, 12] (1+3+5=9, 2+4+6=12)

// 같은 위치의 문자열들을 연결해요.
const words = [
  ['hello', 'world'],
  ['foo', 'bar'],
  ['es', 'toolkit'],
];
const combined = unzipWith(words, (a, b, c) => a + b + c);
console.log(combined); // ['hellofooes', 'worldbartoolkit']

// 객체 배열에서 특정 속성의 평균을 구해요.
const scores = [
  [{ score: 80 }, { score: 90 }],
  [{ score: 85 }, { score: 95 }],
  [{ score: 75 }, { score: 88 }],
];
const averages = unzipWith(scores, (a, b, c) => (a.score + b.score + c.score) / 3);
console.log(averages); // [80, 91] (80+85+75)/3, (90+95+88)/3
```

배열의 길이가 다른 경우에는 undefined가 전달돼요.

```typescript
import { unzipWith } from 'es-toolkit/array';

const mixed = [
  [1, 4],
  [2, 5],
  [3], // 길이가 다름
];
const result = unzipWith(mixed, (a, b, c) => {
  // c는 undefined가 될 수 있어요
  return (a || 0) + (b || 0) + (c || 0);
});
console.log(result); // [6, 9] (1+2+3, 4+5+0)
```

빈 배열을 전달하면 오류가 발생합니다.

```typescript
import { unzipWith } from 'es-toolkit/array';

const empty = unzipWith([], (a, b) => a + b);
console.log(empty); // throws Error
```

#### 파라미터

- `target` (`readonly T[][]`): 풀고 변환할 배열들이 묶여있는 2차원 배열이에요.
- `iteratee` (`(...args: T[]) => R`): 같은 위치의 요소들을 받아서 새로운 값으로 변환하는 함수예요.

#### 반환 값

(`R[]`): 변환 함수를 적용한 결과들로 만들어진 새로운 배열이에요.
