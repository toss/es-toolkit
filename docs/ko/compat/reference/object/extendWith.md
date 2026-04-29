# extendWith (Lodash 호환성)

::: warning `Object.assign()`과 사용자 정의 함수를 사용하세요

이 `extendWith` 함수는 프로토타입 체인에서 상속된 속성 처리와 사용자 정의 병합 로직으로 인해 복잡하고 느리게 동작해요.

대신 더 빠르고 현대적인 `Object.assign()`과 사용자 정의 함수를 사용하세요.

:::

객체의 고유 속성과 상속된 속성을 사용자 정의 함수로 처리하여 다른 객체에 복사해요.

```typescript
const result = extendWith(object, source, customizer);
```

## 사용법

### `extendWith(object, ...sources, customizer)`

객체의 속성을 사용자 정의 로직으로 병합할 때 `extendWith`를 사용하세요. `extend`와 비슷하지만 각 속성을 어떻게 병합할지 직접 결정할 수 있어요. 이 함수는 `assignInWith`의 별칭이에요.

```typescript
import { extendWith } from 'es-toolkit/compat';

// 사용자 정의 병합 로직으로 속성 복사
const target = { a: 1, b: 2 };
extendWith(target, { b: 3, c: 4 }, (objValue, srcValue) => {
  return objValue === undefined ? srcValue : objValue;
});
// 반환값: { a: 1, b: 2, c: 4 }

// 배열을 연결하는 사용자 정의 병합
const obj1 = { a: [1, 2] };
const obj2 = { a: [3, 4], b: [5, 6] };
extendWith(obj1, obj2, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// 반환값: { a: [1, 2, 3, 4], b: [5, 6] }
```

여러 소스 객체를 사용할 수 있어요.

```typescript
import { extendWith } from 'es-toolkit/compat';

extendWith({ a: 1 }, { b: 2 }, { c: 3 }, (objValue, srcValue) => srcValue * 2);
// 반환값: { a: 1, b: 4, c: 6 }
```

#### 파라미터

- `object` (`any`): 속성을 복사받을 대상 객체예요.
- `...sources` (`any[]`): 속성을 제공하는 소스 객체들이에요.
- `customizer` (`function`): 각 속성에 대해 할당할 값을 결정하는 함수예요. `(objValue, srcValue, key, object, source)`를 받아요.

#### 반환 값

(`any`): 속성이 복사된 객체를 반환해요. 첫 번째 인수인 `object`가 수정돼요.
