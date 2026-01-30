# without

배열에서 특정 값들을 제외한 새 배열을 만들어요.

```typescript
const filtered = without(arr, ...values);
```

## 사용법

### `without(arr, ...values)`

배열에서 원하지 않는 특정 값들을 제거하고 싶을 때 `without`을 사용하세요. 원본 배열은 수정되지 않고, 지정한 값들이 제외된 새 배열이 반환돼요. 리터럴 값을 넘기면 TypeScript의 타입 추론이 강화돼서 `Exclude<T, V>`를 활용해 반환 타입이 자동으로 좁혀져요.

```typescript
import { without } from 'es-toolkit/array';

// 숫자 배열에서 특정 값들을 제거해요.
without([1, 2, 3, 4, 5], 2, 4);
// Returns: [1, 3, 5]
// 타입: (1 | 3 | 5)[]

// 문자열 배열에서 특정 값을 제거해요.
without(['a', 'b', 'c', 'a'], 'a');
// Returns: ['b', 'c']
// 타입: ('b' | 'c')[]
```

`NaN` 값도 올바르게 처리해요.

```typescript
import { without } from 'es-toolkit/array';

without([1, NaN, 3, NaN, 5], NaN);
// Returns: [1, 3, 5]
```

#### 파라미터

- `arr` (`readonly T[]`): 값들을 제거할 배열이에요.
- `values` (`...readonly V[]`):: 배열에서 제거할 값들이에요. 리터럴 값을 넘기면 반환 타입이 자동으로 `Exclude<T, V>[]`로 좁혀져요.

#### 반환 값

(`Exclude<T, V>[]`): 지정된 값들이 제외된 새 배열을 반환해요. 특정 리터럴 값을 넘기지 않으면 반환 타입은 `T[]`로 유지돼요.
