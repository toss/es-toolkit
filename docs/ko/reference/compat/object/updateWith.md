# updateWith

::: info
이 함수는 호환성 이유로 `es-toolkit/compat`에서만 사용할 수 있어요. 이 함수는 대체 가능한 네이티브 JavaScript API가 있거나 아직 완전히 최적화되지 않았어요.

`es-toolkit/compat`에서 임포트할 때, 이 함수는 lodash와 정확히 같은 방식으로 동작하며 동일한 기능을 제공해요.
:::

객체의 지정된 경로에 있는 값을 `updater` 함수가 반환한 값으로 업데이트해요. 경로의 일부가 존재하지 않을 때, 어떻게 새로운 객체를 생성할지를 `customizer` 함수로 지정할 수 있어요.

## 인터페이스

```typescript
function updateWith<T extends object | null | undefined>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  updater: (value: unknown) => unknown,
  customizer: (value: unknown) => unknown
): T;
```

### 파라미터

- `obj` (`T`): 수정할 객체예요.
- `path` (`PropertyKey | readonly PropertyKey[]`): 업데이트할 속성의 경로예요.
- `updater` (`(value: unknown) => unknown`): 업데이트된 값을 생성하는 함수예요.
- `customizer` (`(value: unknown) => unknown`): 업데이트 프로세스를 커스터마이즈하는 함수예요.

### 반환 값

(`T`): 수정된 객체예요.

## 예시

```typescript
import { updateWith } from 'es-toolkit/compat';

const object = {};

// 커스터마이저 함수를 사용하여 사용자 정의 경로 구조 생성하기
updateWith(object, '[0][1]', () => 'a', Object);
// => { '0': { '1': 'a' } }

// 경로 생성 커스터마이즈하기
updateWith(
  object,
  '[0][2]',
  () => 'b',
  value => {
    if (typeof value === 'number') {
      return [];
    }
  }
);
// => { '0': { '1': 'a', '2': 'b' } }
```
