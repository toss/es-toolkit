# mergeWith (Lodash 호환성)

::: warning `es-toolkit`의 `mergeWith`를 사용하세요

이 `mergeWith` 함수는 복잡한 타입 체크와 순환 참조 처리, 특수 객체 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [mergeWith](../../object/mergeWith.md)를 사용하세요.

:::

사용자 정의 함수로 병합 방식을 제어하면서 여러 객체를 깊게 병합해요.

```typescript
const result = mergeWith(target, ...sources, customizer);
```

## 사용법

### `mergeWith(object, ...sources, customizer)`

대상 객체에 하나 이상의 소스 객체를 깊게 병합하되, 커스터마이저 함수로 병합 방식을 제어해요. 커스터마이저 함수가 `undefined`를 반환하면 기본 병합 로직이 사용돼요. 배열 합치기나 특별한 병합 규칙이 필요할 때 유용해요.

```typescript
import { mergeWith } from 'es-toolkit/compat';

// 숫자 더하기
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const result = mergeWith(obj1, obj2, (objValue, srcValue) => {
  if (typeof objValue === 'number' && typeof srcValue === 'number') {
    return objValue + srcValue;
  }
});
// 결과: { a: 1, b: 5, c: 4 }

// 배열 합치기
const arr1 = { items: [1, 2] };
const arr2 = { items: [3, 4] };
const merged = mergeWith(arr1, arr2, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// 결과: { items: [1, 2, 3, 4] }

// 문자열 연결
const str1 = { message: 'Hello' };
const str2 = { message: 'World' };
const combined = mergeWith(str1, str2, (objValue, srcValue, key) => {
  if (key === 'message' && typeof objValue === 'string') {
    return objValue + ' ' + srcValue;
  }
});
// 결과: { message: 'Hello World' }

// 여러 소스 객체와 커스터마이저
const base = { scores: [80] };
const quiz1 = { scores: [90] };
const quiz2 = { scores: [85] };
const final = mergeWith(base, quiz1, quiz2, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// 결과: { scores: [80, 90, 85] }
```

커스터마이저 함수는 다양한 매개변수를 받아요.

```typescript
import { mergeWith } from 'es-toolkit/compat';

const customizer = (objValue, srcValue, key, object, source, stack) => {
  console.log('병합 중:', key, objValue, '->', srcValue);

  // 특정 키에 대해서만 커스터마이징
  if (key === 'specialField') {
    return `${objValue}_${srcValue}`;
  }

  // undefined를 반환하면 기본 병합 로직 사용
  return undefined;
};
```

#### 파라미터

- `object` (`any`): 병합 대상이 되는 객체예요. 이 객체가 수정돼요.
- `...sources` (`any[]`): 병합할 소스 객체들이에요.
- `customizer` (`MergeWithCustomizer`): 값 할당을 커스터마이즈하는 함수예요. `(objValue, srcValue, key, object, source, stack) => any` 형태예요.

#### 반환 값

(`any`): 병합된 대상 객체를 반환해요.
