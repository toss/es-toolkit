# setWith (Lodash 호환성)

::: warning 직접 할당을 사용하세요

이 `setWith` 함수는 내부적으로 `updateWith` 함수를 호출하여 복잡한 경로 처리와 커스터마이저 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 직접 할당이나 구조 분해 할당을 사용하세요.

:::

커스터마이저 함수로 객체 생성 방식을 제어하면서 지정된 경로에 값을 설정해요.

```typescript
const result = setWith(obj, path, value, customizer);
```

## 레퍼런스

### `setWith(object, path, value, customizer)`

객체의 특정 경로에 값을 설정하되, 중간에 생성되는 객체의 타입을 커스터마이저 함수로 제어하고 싶을 때 `setWith`를 사용하세요. 커스터마이저가 `undefined`를 반환하면 기본 로직(배열 인덱스면 배열, 아니면 객체)이 사용돼요.

```typescript
import { setWith } from 'es-toolkit/compat';

// 기본 사용법 (커스터마이저 없음)
const obj1 = {};
setWith(obj1, 'a.b.c', 4);
console.log(obj1);
// 결과: { a: { b: { c: 4 } } }

// 배열 생성을 강제하는 커스터마이저
const obj2 = {};
setWith(obj2, '[0][1]', 'value', () => []);
console.log(obj2);
// 결과: { '0': [undefined, 'value'] }

// 특정 조건에서만 커스터마이징
const obj3 = {};
setWith(obj3, 'a[0].b.c', 'nested', (value, key) => {
  // 숫자 키(배열 인덱스)일 때만 빈 객체 반환
  return typeof key === 'string' && /^\d+$/.test(key) ? {} : undefined;
});
console.log(obj3);
// 결과: { a: { '0': { b: { c: 'nested' } } } }

// Object 생성자를 커스터마이저로 사용
const obj4 = {};
setWith(obj4, 'x[0].y', 42, Object);
console.log(obj4);
// 결과: { x: [{ y: 42 }] }

// 복잡한 커스터마이저 로직
const obj5 = {};
setWith(obj5, 'data.items[0].props.config', 'value', (value, key, object) => {
  console.log('Creating:', key, 'in', object);

  // 특정 키에서는 Map 사용
  if (key === 'props') {
    return new Map();
  }

  // 숫자 키면 배열
  if (typeof key === 'string' && /^\d+$/.test(key)) {
    return [];
  }

  // 기본적으로는 일반 객체
  return {};
});

// WeakMap을 중간 객체로 사용
const obj6 = {};
setWith(obj6, 'cache.user.profile', 'data', (value, key) => {
  if (key === 'cache') {
    return new WeakMap();
  }
  return undefined; // 기본 동작 사용
});
```

커스터마이저 함수는 세 개의 매개변수를 받아요.

```typescript
import { setWith } from 'es-toolkit/compat';

const obj = {};
setWith(obj, 'a.b[0].c', 'value', (nsValue, key, nsObject) => {
  console.log('nsValue:', nsValue); // 현재 값 (보통 undefined)
  console.log('key:', key); // 생성할 키
  console.log('nsObject:', nsObject); // 부모 객체

  // 특정 조건에 따라 다른 객체 타입 반환
  return key === 'b' ? [] : {};
});
```

#### 파라미터

- `object` (`T`): 값을 설정할 객체예요.
- `path` (`PropertyPath`): 값을 설정할 속성의 경로예요.
- `value` (`any`): 설정할 값이에요.
- `customizer` (`(nsValue: any, key: string, nsObject: T) => any`, 선택): 중간 객체 생성을 커스터마이즈하는 함수예요.

#### 반환 값

(`T | R`): 수정된 객체를 반환해요.
