# assignInWith (Lodash 호환성)

::: warning 커스텀 로직 구현을 권장해요

이 `assignInWith` 함수는 상속 속성 처리와 커스터마이저 함수 호출로 인해 복잡하고 느리게 동작해요.

대신 `Object.assign`과 커스텀 로직을 직접 구현하는 방식을 사용하세요.

:::

커스터마이저 함수를 사용해서 소스 객체들의 모든 속성(상속 속성 포함)을 대상 객체에 할당해요.

```typescript
const result = assignInWith(target, ...sources, customizer);
```

## 사용법

### `assignInWith(target, ...sources, customizer)`

속성 할당 방식을 커스터마이징하면서 상속된 속성까지 포함하고 싶을 때 `assignInWith`를 사용하세요. 커스터마이저 함수로 각 속성의 최종 값을 결정할 수 있어요.

```typescript
import { assignInWith } from 'es-toolkit/compat';

// 기본 사용법 - undefined일 때만 할당
const target = { a: 1, b: undefined };
const source = { b: 2, c: 3 };
const result = assignInWith(target, source, (objValue, srcValue) => {
  return objValue === undefined ? srcValue : objValue;
});
// 결과: { a: 1, b: 2, c: 3 }

// 배열 값을 합치는 커스터마이저
const target2 = { numbers: [1, 2] };
const source2 = { numbers: [3, 4], name: 'test' };
assignInWith(target2, source2, (objValue, srcValue) => {
  if (Array.isArray(objValue) && Array.isArray(srcValue)) {
    return objValue.concat(srcValue);
  }
  return srcValue;
});
// 결과: { numbers: [1, 2, 3, 4], name: 'test' }

// 상속된 속성도 포함해서 처리
function Parent() {}
Parent.prototype.inherited = 'value';
const child = Object.create(Parent.prototype);
child.own = 'ownValue';

const target3 = { existing: 'data' };
assignInWith(target3, child, (objValue, srcValue, key) => {
  if (objValue === undefined) {
    return `processed_${srcValue}`;
  }
  return objValue;
});
// 결과: { existing: 'data', own: 'processed_ownValue', inherited: 'processed_value' }
```

커스터마이저 함수가 `undefined`를 반환하면 기본 할당 동작이 사용돼요. 이 함수는 `assignIn`과 달리 각 속성에 대해 커스텀 로직을 적용할 수 있어요.

#### 파라미터

- `target` (`any`): 속성을 복사받을 대상 객체예요.
- `...sources` (`any[]`): 속성을 복사할 소스 객체들이에요. 고유 속성과 상속된 속성 모두 복사돼요.
- `customizer` (`function`): 할당할 값을 결정하는 함수예요. `(objValue, srcValue, key, object, source) => any` 형태로, `undefined`를 반환하면 기본 할당 동작을 사용해요.

#### 반환 값

(`any`): 수정된 대상 객체를 반환해요. 대상 객체 자체가 변경되어 반환돼요.
