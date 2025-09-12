# countBy (Lodash 호환성)

::: warning `es-toolkit`의 `countBy`를 사용하세요

이 `countBy` 함수는 `null`이나 `undefined` 처리, `iteratee` 유연한 처리, 객체 지원 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [countBy](../../array/countBy.md)를 사용하세요.

:::

배열이나 객체의 각 요소를 변환한 결과를 기준으로 개수를 세어요.

```typescript
const counts = countBy(collection, iteratee);
```

## 레퍼런스

### `countBy(collection, iteratee)`

배열이나 객체의 각 요소를 변환 함수에 적용한 후, 같은 결과값끼리 개수를 세고 싶을 때 `countBy`를 사용하세요. 변환된 값을 키로, 개수를 값으로 하는 객체가 반환돼요.

```typescript
import { countBy } from 'es-toolkit/compat';

// 숫자 배열에서 소수점을 버린 값으로 그룹화해요.
countBy([6.1, 4.2, 6.3], Math.floor);
// Returns: { '4': 1, '6': 2 }

// 문자열 배열을 길이로 그룹화해요.
countBy(['one', 'two', 'three'], 'length');
// Returns: { '3': 2, '5': 1 }

// 함수를 사용해서 홀수/짝수로 분류해요.
countBy([1, 2, 3, 4, 5], n => n % 2 === 0 ? '짝수' : '홀수');
// Returns: { '홀수': 3, '짝수': 2 }
```

객체도 입력값으로 사용할 수 있어요. 객체의 값들이 변환 함수에 전달돼요.

```typescript
import { countBy } from 'es-toolkit/compat';

const users = {
  a: { name: 'foo', age: 24 },
  b: { name: 'bar', age: 24 },
  c: { name: 'baz', age: 32 }
};

countBy(users, 'age');
// Returns: { '24': 2, '32': 1 }
```

#### 파라미터

- `collection` (`ArrayLike<T> | T | null | undefined`): 개수를 셀 배열이나 객체예요.
- `iteratee` (`ValueIteratee<T>`, 선택): 각 요소를 변환하는 함수나 속성 이름이에요. 생략하면 요소 자체가 키로 사용돼요.

### 반환 값

(`Record<string, number>`): 변환된 값을 키로, 개수를 값으로 하는 객체를 반환해요.