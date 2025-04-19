# setWith

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

커스터마이저 함수를 사용하여 지정된 경로에 값을 설정해요. 이 메서드는 중첩된 객체를 생성하기 위한 커스터마이저를 받는다는 점에서 `set`과 다릅니다.

커스터마이저가 `undefined`를 반환하면, 경로 생성은 메서드에서 처리돼요. 커스터마이저는 세 가지 인수(nsValue, key, nsObject)와 함께 호출됩니다.

## 인터페이스

```typescript
function setWith<T extends object | null | undefined>(
  obj: T,
  path: PropertyKey | readonly PropertyKey[],
  value: unknown,
  customizer?: (value: unknown) => unknown
): T;
```

### 파라미터

- `obj` (`T`): 값을 설정할 객체.
- `path` (`PropertyKey | readonly PropertyKey[]`): 값을 설정할 프로퍼티 경로.
- `value` (`unknown`): 설정할 값.
- `customizer` (`(value: unknown) => unknown`): 경로 생성을 커스터마이즈하는 함수.

### 반환 값

(`T`): 수정된 객체를 반환해요.

## 예시

```typescript
import { setWith } from 'es-toolkit/compat';
import { isObject } from 'es-toolkit/compat';

// 커스터마이저를 사용하여 중첩된 배열에 값 설정
const object = {};
setWith(object, '[0][1][2]', 3, value => (isObject(value) ? undefined : {}));
console.log(object); // => { '0': { '1': { '2': 3 } } }

// 배열용 객체를 생성하기 위해 Object를 커스터마이저로 사용
const obj2 = {};
setWith(obj2, 'a[0].b.c', 4, Object);
console.log(obj2); // => { a: [{ b: { c: 4 } }] }

// 커스터마이저 없이 경로 생성 (set 사용과 동일)
const obj3 = {};
setWith(obj3, 'a.b.c', 4);
console.log(obj3); // => { a: { b: { c: 4 } } }
```
