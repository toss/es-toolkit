# mapValuesAsync

비동기 함수를 통해 값을 변환한 새 객체를 반환해요.

```typescript
const newObj = await mapValuesAsync(object, getNewValue);
```

## 사용법

### `mapValuesAsync(object, getNewValue, options?)`

각 값을 비동기적으로 변환하여 새 객체를 만들 때 `mapValuesAsync`를 사용하세요. 키는 그대로 유지되며 값만 `getNewValue` 함수의 해결 결과로 변경돼요.

```typescript
import { mapValuesAsync } from 'es-toolkit/object';

// 모든 값을 2배로 만들기
const numbers = { a: 1, b: 2, c: 3 };
const doubled = await mapValuesAsync(numbers, async value => value * 2);
// doubled는 { a: 2, b: 4, c: 6 }이 됨

// 문자열 값을 대문자로 변환
const strings = { first: 'hello', second: 'world' };
const uppercased = await mapValuesAsync(strings, async value => value.toUpperCase());
// uppercased는 { first: 'HELLO', second: 'WORLD' }가 됨

// 키와 값 모두 사용
const scores = { alice: 85, bob: 90, charlie: 95 };
const grades = await mapValuesAsync(scores, async (value, key) => `${key}: ${value >= 90 ? 'A' : 'B'}`);
// grades는 { alice: 'alice: B', bob: 'bob: A', charlie: 'charlie: A' }가 됨

// 동시 실행 수 제한
const items = { a: 1, b: 2, c: 3 };
await mapValuesAsync(items, async item => await processItem(item), { concurrency: 2 });
// 최대 2개의 값이 동시에 처리됨
```

#### 매개변수

- `object` (`T extends object`): 값을 변환할 원본 객체예요.
- `getNewValue` (`(value: T[K], key: K, object: T) => Promise<V>`): 새 값을 생성하는 비동기 함수예요. 값, 키, 전체 객체를 매개변수로 받아요.
- `options` (`MapValuesAsyncOptions`, 선택사항): 동시 실행 수를 제어하는 옵션이에요.
  - `concurrency` (`number`, 선택사항): 최대 동시 실행 수예요. 지정하지 않으면 모든 작업이 동시에 실행돼요.

#### 반환값

(`Promise<Record<K, V>>`): 변환된 값을 가진 새 객체로 해결되는 프로미스예요.
