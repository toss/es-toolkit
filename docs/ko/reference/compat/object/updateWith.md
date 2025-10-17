# updateWith (Lodash 호환성)

::: warning 직접 할당을 사용하세요

이 `updateWith` 함수는 복잡한 경로 파싱과 커스터마이저 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 직접 속성 할당이나 옵셔널 체이닝을 사용하세요.

:::

객체의 지정된 경로에 있는 값을 업데이터 함수로 수정하되, 커스터마이저로 경로 생성을 제어해요.

```typescript
const updated = updateWith(object, path, updater, customizer);
```

## 인터페이스

```typescript
function updateWith<T extends object>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  updater: (oldValue: any) => any,
  customizer?: (value: any, key: string, object: T) => any
): T;
```

### 파라미터

- `obj` (`T`): 수정할 객체예요.
- `path` (`PropertyKey | readonly PropertyKey[]`): 업데이트할 속성의 경로예요.
- `updater` (`(oldValue: any) => any`): 업데이트된 값을 생성하는 함수예요.
- `customizer` (`(value: any, key: string, object: T) => any`, 선택 사항): 업데이트 프로세스를 커스터마이즈하는 함수예요.

#### 반환 값

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
