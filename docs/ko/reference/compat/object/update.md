# update (Lodash 호환성)

::: warning 직접 할당을 사용하세요

이 `update` 함수는 복잡한 경로 파싱과 중첩 객체 생성 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 직접 속성 할당이나 옵셔널 체이닝을 사용하세요.

:::

객체의 지정된 경로에 있는 값을 업데이터 함수로 수정해요.

```typescript
const updated = update(obj, path, updater);
```

## 레퍼런스

### `update(obj, path, updater)`

중첩된 객체의 특정 경로에 있는 값을 함수로 변환하고 싶을 때 `update`를 사용하세요. 경로가 존재하지 않으면 자동으로 생성돼요.

```typescript
import { update } from 'es-toolkit/compat';

// 중첩 속성 값 변환
const object = { a: [{ b: { c: 3 } }] };
update(object, 'a[0].b.c', n => (n as number) * 2);
// => { a: [{ b: { c: 6 } }] }

// 배열 경로로 업데이트
update(object, ['a', 0, 'b', 'c'], n => (n as number) + 10);
// => { a: [{ b: { c: 13 } }] }
```

경로가 존재하지 않으면 필요한 중첩 구조를 자동으로 생성해요.

```typescript
import { update } from 'es-toolkit/compat';

// 빈 객체에서 중첩 구조 생성
update({}, 'a.b.c', () => 'hello');
// => { a: { b: { c: 'hello' } } }

// 배열도 자동 생성
update({}, 'a.b[0]', () => 'value');
// => { a: { b: ['value'] } }
```

기존 값을 기반으로 새로운 값을 계산할 수 있어요.

```typescript
import { update } from 'es-toolkit/compat';

const stats = { score: 100 };
update(stats, 'score', score => score * 1.1); // 10% 증가
// => { score: 110 }
```

#### 파라미터

- `obj` (`object`): 수정할 객체예요.
- `path` (`PropertyKey | PropertyKey[]`): 업데이트할 속성의 경로예요. 문자열이나 배열로 지정할 수 있어요.
- `updater` (`(value: any) => any`): 기존 값을 받아서 새로운 값을 반환하는 함수예요.

#### 반환 값

(`any`): 수정된 객체를 반환해요.
