# mapValues

객체의 값을 함수를 통해 변환한 새로운 객체를 반환해요.

```typescript
const newObj = mapValues(object, getNewValue);
```

## 레퍼런스

### `mapValues(object, getNewValue)`

객체의 각 값을 변환하여 새로운 객체를 만들고 싶을 때 `mapValues`를 사용하세요. 키는 그대로 유지되고, 값만 `getNewValue` 함수의 결과로 변경돼요.

```typescript
import { mapValues } from 'es-toolkit/object';

// 모든 값을 두 배로 늘려요
const numbers = { a: 1, b: 2, c: 3 };
const doubled = mapValues(numbers, value => value * 2);
// doubled는 { a: 2, b: 4, c: 6 }이 돼요

// 문자열 값을 대문자로 변환해요
const strings = { first: 'hello', second: 'world' };
const uppercased = mapValues(strings, value => value.toUpperCase());
// uppercased는 { first: 'HELLO', second: 'WORLD' }가 돼요

// 키와 값을 함께 활용해요
const scores = { alice: 85, bob: 90, charlie: 95 };
const grades = mapValues(scores, (value, key) => `${key}: ${value >= 90 ? 'A' : 'B'}`);
// grades는 { alice: 'alice: B', bob: 'bob: A', charlie: 'charlie: A' }가 돼요
```

#### 파라미터

- `object` (`T extends object`): 값을 변환할 객체예요.
- `getNewValue` (`(value: T[K], key: K, object: T) => V`): 새로운 값을 생성하는 함수예요. 값, 키, 전체 객체를 파라미터로 받아요.

#### 반환 값

(`Record<K, V>`): 값이 변환된 새로운 객체를 반환해요.
