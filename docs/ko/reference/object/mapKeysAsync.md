# mapKeysAsync

비동기 함수를 통해 키를 변환한 새로운 객체를 반환해요.

```typescript
const newObj = await mapKeysAsync(object, getNewKey);
```

## 사용법

### `mapKeysAsync(object, getNewKey, options?)`

각 키를 비동기적으로 변환하여 새로운 객체를 만들고 싶을 때 `mapKeysAsync`를 사용하세요. 값은 그대로 유지되고, 키만 `getNewKey` 함수가 반환하는 Promise 안의 값으로 변경돼요.

```typescript
import { mapKeysAsync } from 'es-toolkit/object';

// 키에 접두사를 추가해요
const obj = { a: 1, b: 2 };
const prefixed = await mapKeysAsync(obj, async (value, key) => `prefix_${key}`);
// prefixed는 { prefix_a: 1, prefix_b: 2 }가 돼요

// 키와 값을 결합해서 새로운 키를 만들어요
const combined = await mapKeysAsync(obj, async (value, key) => `${key}${value}`);
// combined는 { a1: 1, b2: 2 }가 돼요

// 키를 대문자로 변환해요
const uppercased = await mapKeysAsync(obj, async (value, key) => key.toString().toUpperCase());
// uppercased는 { A: 1, B: 2 }가 돼요

// 동시에 실행되는 작업 수를 제한해요
await mapKeysAsync(obj, async (value, key) => await processKey(key, value), { concurrency: 2 });
// 최대 2개의 키만 동시에 처리돼요
```

#### 파라미터

- `object` (`T extends Record<PropertyKey, any>`): 키를 변환할 객체예요.
- `getNewKey` (`(value: T[keyof T], key: keyof T, object: T) => Promise<K>`): 새로운 키를 생성하는 비동기 함수예요. 값, 키, 전체 객체를 파라미터로 받아요.
- `options` (`MapKeysAsyncOptions`, 선택): 동시에 실행되는 작업 수를 제어하는 옵션이에요.
  - `concurrency` (`number`, 선택): 동시에 실행할 수 있는 최대 작업 수예요. 지정하지 않으면 모든 작업이 동시에 실행돼요.

#### 반환 값

(`Promise<Record<K, T[keyof T]>>`): 키가 변환된 새로운 객체를 담은 Promise를 반환해요.
