# updateWith (Lodash 호환성)

::: warning 직접 할당을 사용하세요

이 `updateWith` 함수는 복잡한 경로 파싱과 커스터마이저 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 직접 속성 할당이나 옵셔널 체이닝을 사용하세요.

:::

객체의 지정된 경로에 있는 값을 업데이터 함수로 수정하되, 커스터마이저로 경로 생성을 제어해요.

```typescript
const updated = updateWith(obj, path, updater, customizer);
```

## 레퍼런스

### `updateWith(obj, path, updater, customizer?)`

`update` 함수와 비슷하지만, 경로가 존재하지 않을 때 생성되는 중간 객체의 형태를 커스터마이저 함수로 제어할 수 있어요.

```typescript
import { updateWith } from 'es-toolkit/compat';

// 기본 동작 (update와 동일)
const object = { a: [{ b: { c: 3 } }] };
updateWith(object, 'a[0].b.c', n => n * n);
// => { a: [{ b: { c: 9 } }] }

// 배열 경로로 업데이트
updateWith(object, ['a', 0, 'b', 'c'], n => n + 10);
// => { a: [{ b: { c: 13 } }] }
```

커스터마이저를 사용해서 생성되는 중간 객체의 형태를 제어할 수 있어요.

```typescript
import { updateWith } from 'es-toolkit/compat';

const object = {};

// Object 생성자를 커스터마이저로 사용 (배열 대신 객체 생성)
updateWith(object, '[0][1]', () => 'a', Object);
// => { '0': { '1': 'a' } }
// (기본 동작이라면 { '0': ['a'] }가 됨)
```

커스터마이저는 생성할 값, 키, 객체를 인자로 받아요.

```typescript
import { updateWith } from 'es-toolkit/compat';

const customizer = (value: any, key: string, object: any) => {
  // 숫자 키면 배열 대신 객체 생성
  if (!isNaN(Number(key))) {
    return {};
  }
};

const result = {};
updateWith(result, '[0][1]', () => 'value', customizer);
// => { '0': { '1': 'value' } }
```

경로가 이미 존재하면 커스터마이저는 호출되지 않아요.

```typescript
import { updateWith } from 'es-toolkit/compat';

const object = { a: { b: 1 } };
updateWith(
  object,
  'a.b',
  n => n * 2,
  () => {
    console.log('Not called'); // 호출되지 않음
    return {};
  }
);
// => { a: { b: 2 } }
```

#### 파라미터

- `obj` (`T`): 수정할 객체예요.
- `path` (`PropertyKey | readonly PropertyKey[]`): 업데이트할 속성의 경로예요. 문자열이나 배열로 지정할 수 있어요.
- `updater` (`(oldValue: any) => any`): 기존 값을 받아서 새로운 값을 반환하는 함수예요.
- `customizer` (`(value: any, key: string, object: T) => any`, 선택): 경로가 존재하지 않을 때 생성될 중간 객체를 반환하는 함수예요. `undefined`를 반환하면 기본 동작을 사용해요.

#### 반환 값

(`T`): 수정된 객체를 반환해요.
