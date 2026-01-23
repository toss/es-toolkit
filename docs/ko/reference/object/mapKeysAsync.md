# mapKeysAsync

비동기 함수를 통해 키를 변환한 새 객체를 반환해요.

```typescript
const newObj = await mapKeysAsync(object, getNewKey);
```

## 사용법

### `mapKeysAsync(object, getNewKey, options?)`

각 키를 비동기적으로 변환하여 새 객체를 만들 때 `mapKeysAsync`를 사용하세요. 값은 그대로 유지되며 키만 `getNewKey` 함수의 해결 결과로 변경돼요.

```typescript
import { mapKeysAsync } from 'es-toolkit/object';

// 키에 접두사 추가
const obj = { a: 1, b: 2 };
const prefixed = await mapKeysAsync(obj, (value, key) => `prefix_${key}`);
// prefixed는 { prefix_a: 1, prefix_b: 2 }가 됨

// 키와 값을 결합하여 새 키 생성
const combined = await mapKeysAsync(obj, (value, key) => `${key}${value}`);
// combined는 { a1: 1, b2: 2 }가 됨

// 키를 대문자로 변환
const uppercased = await mapKeysAsync(obj, (value, key) => key.toString().toUpperCase());
// uppercased는 { A: 1, B: 2 }가 됨

// 동시 실행 수 제한
await mapKeysAsync(obj, async (value, key) => await processKey(key, value), { concurrency: 2 });
// 최대 2개의 키가 동시에 처리됨
```

#### 매개변수

- `object` (`T extends Record<PropertyKey, any>`): 키를 변환할 원본 객체예요.
- `getNewKey` (`(value: T[keyof T], key: keyof T, object: T) => Promise<K>`): 새 키를 생성하는 비동기 함수예요. 값, 키, 전체 객체를 매개변수로 받아요.
- `options` (`MapKeysAsyncOptions`, 선택사항): 동시 실행 수를 제어하는 옵션이에요.
  - `concurrency` (`number`, 선택사항): 최대 동시 실행 수예요. 지정하지 않으면 모든 작업이 동시에 실행돼요.

#### 반환값

(`Promise<Record<K, T[keyof T]>>`): 변환된 키를 가진 새 객체로 해결되는 프로미스예요.
