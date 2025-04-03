# update

::: info
이 함수는 호환성 이유로 `es-toolkit/compat`에서만 사용할 수 있어요. 이 함수는 대체 가능한 네이티브 JavaScript API가 있거나 아직 완전히 최적화되지 않았어요.

`es-toolkit/compat`에서 임포트할 때, 이 함수는 lodash와 정확히 같은 방식으로 동작하며 동일한 기능을 제공해요.
:::

객체의 지정된 경로에 있는 값을 `updater` 함수가 반환한 값으로 업데이트해요. 경로의 일부가 존재하지 않으면 생성돼요.

## 인터페이스

```typescript
function update<T extends object | null | undefined>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  updater: (value: unknown) => unknown
): T;
```

### 파라미터

- `obj` (`T`): 수정할 객체.
- `path` (`PropertyKey | readonly PropertyKey[]`): 업데이트할 속성의 경로.
- `updater` (`(value: unknown) => unknown`): 업데이트된 값을 생성하는 함수.

### 반환 값

(`T`): 수정된 객체.

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
