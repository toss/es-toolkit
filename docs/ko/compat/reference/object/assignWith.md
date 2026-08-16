# assignWith (Lodash 호환성)

::: warning 커스텀 로직 구현을 권장해요

이 `assignWith` 함수는 복잡한 커스터마이저 함수 처리로 인해 상대적으로 느려요.

대신 `Object.assign`과 커스텀 로직을 직접 구현하는 방식을 사용하세요.

:::

커스터마이저 함수를 사용해서 소스 객체들의 속성을 대상 객체에 할당해요.

```typescript
const result = assignWith(target, source1, source2, customizer);
```

## 사용법

### `assignWith(object, ...sources, customizer)`

속성 할당 방식을 커스터마이징할 때 `assignWith`를 사용하세요. 커스터마이저 함수로 각 속성의 최종 값을 결정할 수 있어요.

```typescript
import { assignWith } from 'es-toolkit/compat';

// 기본 사용법 - undefined일 때만 할당
const target = { a: 1, b: undefined };
const source = { b: 2, c: 3 };
const result = assignWith(target, source, (objValue, srcValue) => {
  return objValue === undefined ? srcValue : objValue;
});
// Returns: { a: 1, b: 2, c: 3 }

// 배열 병합
const target2 = { users: ['alice'] };
const source2 = { users: ['bob', 'charlie'] };
const result2 = assignWith(target2, source2, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// Returns: { users: ['alice', 'bob', 'charlie'] }

// 여러 소스와 커스터마이저
const target3 = { a: 1 };
const result3 = assignWith(target3, { b: 2 }, { c: 3 }, (objValue, srcValue) => {
  return objValue === undefined ? srcValue : objValue;
});
// Returns: { a: 1, b: 2, c: 3 }
```

#### 파라미터

- `object` (`any`): 속성이 할당될 대상 객체예요.
- `...sources` (`any[]`): 속성을 복사할 소스 객체들이에요.
- `customizer` (`function`): 할당할 값을 결정하는 함수예요. `(objValue, srcValue, key, object, source) => any` 형태예요.

#### 반환 값

(`any`): 커스터마이저 함수에 의해 결정된 값들이 할당된 대상 객체를 반환해요.
