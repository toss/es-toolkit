# over (Lodash 호환성)

::: warning `Array.map`을 사용하세요

이 `over` 함수는 내부 `iteratee` 함수 변환이나 복잡한 인자 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.map`을 사용하세요.

:::

주어진 함수들을 호출하고 그 결과를 배열로 반환하는 함수를 만들어요.

```typescript
const executor = over(func1, func2);
```

## 레퍼런스

### `over(...iteratees)`

여러 함수를 동시에 실행하고 결과를 배열로 받고 싶을 때 `over`를 사용하세요. 다양한 타입의 반복자를 사용할 수 있어요.

```typescript
import { over } from 'es-toolkit/compat';

// 함수들을 사용해서 최댓값과 최솟값을 동시에 구하기
const getMaxAndMin = over([Math.max, Math.min]);
const result1 = getMaxAndMin(1, 2, 3, 4);
// Returns: [4, 1]

// 함수들을 개별 인자로도 전달 가능
const getMaxAndMin2 = over(Math.max, Math.min);
const result2 = getMaxAndMin2(1, 2, 3, 4);
// Returns: [4, 1]

// 속성 이름을 사용해서 객체에서 값 추출하기
const getProps = over(['a', 'b']);
getProps({ a: 1, b: 2 });
// Returns: [1, 2]

// 객체를 사용해서 속성 일치 여부 확인하기
const matchObjects = over([{ a: 1 }, { b: 2 }]);
matchObjects({ a: 1, b: 2 });
// Returns: [true, false]

// 속성-값 쌍을 사용해서 특정 속성값 일치 여부 확인하기
const matchProperties = over([['a', 1], ['b', 2]]);
matchProperties({ a: 1, b: 2 });
// Returns: [true, true]
```

다양한 타입의 반복자를 사용할 수 있어요:
- **함수**: 각 함수는 동일한 인자로 호출되고 결과가 수집돼요.
- **속성 이름**: 각 속성 이름은 제공된 객체에서 값을 추출하는 데 사용돼요.
- **객체**: 각 객체는 제공된 객체가 해당 속성과 일치하는지 확인하는 데 사용돼요.
- **속성-값 쌍**: 각 쌍은 제공된 객체의 특정 속성이 값과 일치하는지 확인해요.

#### 파라미터

- `iteratees` (`Array<Iteratee | Iteratee[]>`): 호출할 반복자들이에요. 함수, 속성 이름, 객체, 속성-값 쌍 등이 될 수 있어요.

### 반환 값

(`(...args: any[]) => unknown[]`): 새로운 함수를 반환해요. 이 함수는 인자를 받아서 각 반복자의 결과를 배열로 반환해요.