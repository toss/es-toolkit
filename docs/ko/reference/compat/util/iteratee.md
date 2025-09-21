# iteratee (Lodash 호환성)

::: warning 직접적인 함수나 속성 접근을 사용하세요

이 `iteratee` 함수는 복잡한 타입 변환과 다양한 경우 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 직접적인 함수나 속성 접근을 사용하세요.

:::

요소에서 값을 반환하는 함수를 만들어요.

```typescript
const getter = iteratee(source);
```

## 레퍼런스

### `iteratee(value?)`

컬렉션의 요소에서 값을 추출하거나 조건을 확인하는 함수를 만들고 싶을 때 `iteratee`를 사용하세요. 제공하는 인자의 타입에 따라 다른 동작을 수행해요.

```typescript
import { iteratee } from 'es-toolkit/compat';

// 함수: 주어진 함수를 그대로 반환
const func = iteratee(object => object.a);
[{ a: 1 }, { a: 2 }, { a: 3 }].map(func);
// Returns: [1, 2, 3]

// 속성 이름: 해당 속성의 값을 반환하는 함수
const getA = iteratee('a');
[{ a: 1 }, { a: 2 }, { a: 3 }].map(getA);
// Returns: [1, 2, 3]

// 객체: 주어진 객체와 일치하는지 확인하는 함수
const matchesObj = iteratee({ a: 1 });
[
  { a: 1, b: 2 },
  { a: 2, b: 3 },
  { a: 1, c: 4 },
].find(matchesObj);
// Returns: { a: 1, b: 2 }

// 속성-값 쌍: 해당 속성이 특정 값과 일치하는지 확인하는 함수
const matchesProperty = iteratee(['a', 1]);
[{ a: 1 }, { a: 2 }, { a: 3 }].find(matchesProperty);
// Returns: { a: 1 }

// null이나 인자 없음: 요소를 그대로 반환하는 함수
const identity = iteratee();
[{ a: 1 }, { a: 2 }, { a: 3 }].map(identity);
// Returns: [{ a: 1 }, { a: 2 }, { a: 3 }]
```

인자의 종류에 따른 동작:

- **함수**: 주어진 함수를 있는 그대로 반환해요.
- **속성 이름**: 요소에서 주어진 속성의 값을 반환해요.
- **속성-값 쌍**: 요소의 속성이 주어진 값과 일치하는지 여부를 나타내는 참/거짓 값을 반환해요.
- **부분 객체**: 요소가 부분 객체의 속성과 값에 일치하는지 여부를 나타내는 참/거짓 값을 반환해요.
- **null이나 인자 없음**: 요소를 있는 그대로 반환하는 함수를 반환해요.

#### 파라미터

- `value` (`symbol | number | string | object | null | ((...args: any[]) => unknown)`, 선택): 반복자로 변환할 값이에요. 기본값은 `null`이에요.

### 반환 값

(`(...args: any[]) => any`): 새로운 반복자 함수를 반환해요.
