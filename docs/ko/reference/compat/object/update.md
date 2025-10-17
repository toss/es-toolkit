# update (Lodash 호환성)

::: warning 직접 할당을 사용하세요

이 `update` 함수는 복잡한 경로 파싱과 중첩 객체 생성 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 직접 속성 할당이나 옵셔널 체이닝을 사용하세요.

:::

객체의 지정된 경로에 있는 값을 업데이터 함수로 수정해요.

```typescript
const updated = update(object, path, updater);
```

## 인터페이스

```typescript
function update(obj: object, path: PropertyKey | PropertyKey[], updater: (value: any) => any): any;
```

### 파라미터

- `obj` (`object`): 수정할 객체.
- `path` (`PropertyKey | PropertyKey[]`): 업데이트할 속성의 경로.
- `updater` (`(value: any) => any`): 업데이트된 값을 생성하는 함수.

#### 반환 값

(`any`): 수정된 객체.

## 예시

```typescript
import { update } from 'es-toolkit/compat';

const object = { a: [{ b: { c: 3 } }] };

// 업데이터 함수를 사용하여 값 업데이트하기
update(object, 'a[0].b.c', n => (n as number) * 2);
// => { a: [{ b: { c: 6 } }] }

// 경로가 존재하지 않는 경우 값 생성하기
update({}, 'a.b[0]', () => 'c');
// => { a: { b: ['c'] } }
```
