# mapValuesAsync

비동기 함수를 통해 값을 변환한 새로운 객체를 반환해요.

```typescript
const newObj = await mapValuesAsync(object, getNewValue);
```

## 사용법

### `mapValuesAsync(object, getNewValue, options?)`

각 값을 비동기적으로 변환하여 새로운 객체를 만들고 싶을 때 `mapValuesAsync`를 사용하세요. 키는 그대로 유지되고, 값만 `getNewValue` 함수가 반환하는 Promise 안의 값으로 변경돼요.

```typescript
import { mapValuesAsync } from 'es-toolkit/object';

// 모든 값을 두 배로 늘려요
const numbers = { a: 1, b: 2, c: 3 };
const doubled = await mapValuesAsync(numbers, async value => value * 2);
// doubled는 { a: 2, b: 4, c: 6 }이 돼요

// 문자열 값을 대문자로 변환해요
const strings = { first: 'hello', second: 'world' };
const uppercased = await mapValuesAsync(strings, async value => value.toUpperCase());
// uppercased는 { first: 'HELLO', second: 'WORLD' }가 돼요

// 키와 값을 함께 활용해요
const scores = { alice: 85, bob: 90, charlie: 95 };
const grades = await mapValuesAsync(scores, async (value, key) => `${key}: ${value >= 90 ? 'A' : 'B'}`);
// grades는 { alice: 'alice: B', bob: 'bob: A', charlie: 'charlie: A' }가 돼요

// 동시에 실행되는 작업 수를 제한해요
const items = { a: 1, b: 2, c: 3 };
await mapValuesAsync(items, async item => await processItem(item), { concurrency: 2 });
// 최대 2개의 값만 동시에 처리돼요
```

#### 파라미터

- `object` (`T extends object`): 값을 변환할 객체예요.
- `getNewValue` (`(value: T[K], key: K, object: T) => Promise<V>`): 새로운 값을 생성하는 비동기 함수예요. 값, 키, 전체 객체를 파라미터로 받아요.
- `options` (`MapValuesAsyncOptions`, 선택): 동시에 실행되는 작업 수를 제어하는 옵션이에요.
  - `concurrency` (`number`, 선택): 동시에 실행할 수 있는 최대 작업 수예요. 지정하지 않으면 모든 작업이 동시에 실행돼요.

#### 반환 값

(`Promise<Record<K, V>>`): 값이 변환된 새로운 객체를 담은 Promise를 반환해요.
