# result (Lodash 호환성)

::: warning `get` 함수나 옵셔널 체이닝을 사용하세요

이 `result` 함수는 복잡한 경로 처리와 함수 호출 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `get` 함수나 옵셔널 체이닝(`?.`)을 사용하세요.

:::

객체의 경로에서 값을 가져오되, 함수를 만나면 호출하고 결과를 반환해요.

```typescript
const result = result(obj, path, defaultValue);
```

## 사용법

### `result(object, path, defaultValue)`

객체의 경로에서 값을 가져오는데, 경로상의 함수들을 자동으로 호출하고 싶을 때 `result`를 사용하세요. `get` 함수와 비슷하지만 함수를 만나면 실행하고, 최종 값도 함수라면 호출해서 결과를 반환해요.

```typescript
import { result } from 'es-toolkit/compat';

// 기본 사용법 (일반 값)
const obj = { a: { b: { c: 3 } } };
const value = result(obj, 'a.b.c');
// 결과: 3

// 함수 자동 호출
const objWithFunc = {
  compute: () => ({ value: 42 }),
  getValue: function () {
    return this.compute().value;
  },
};
const computed = result(objWithFunc, 'getValue');
// 결과: 42 (getValue 함수가 호출됨)

// 경로상의 함수 호출
const nested = {
  data: () => ({ user: { getName: () => 'John' } }),
};
const name = result(nested, 'data.user.getName');
// 결과: 'John' (data()와 getName() 모두 호출됨)

// 기본값 사용
const incomplete = { a: { b: null } };
const withDefault = result(incomplete, 'a.b.c', 'default value');
// 결과: 'default value'

// 기본값이 함수인 경우
const withFuncDefault = result(incomplete, 'a.b.c', () => 'computed default');
// 결과: 'computed default' (기본값 함수가 호출됨)

// 배열 경로 사용
const arrayPath = result(objWithFunc, ['getValue']);
// 결과: 42

// 동적 기본값
const dynamic = result(incomplete, 'missing.path', function () {
  return `Generated at ${new Date().toISOString()}`;
});
// 결과: 현재 시간이 포함된 문자열
```

함수 호출 시 `this` 컨텍스트가 유지돼요.

```typescript
import { result } from 'es-toolkit/compat';

const calculator = {
  multiplier: 2,
  compute: function () {
    return 10 * this.multiplier;
  },
};

const calculatedValue = result(calculator, 'compute');
// 결과: 20 (this.multiplier가 올바르게 참조됨)
```

#### 파라미터

- `object` (`any`): 값을 검색할 객체예요.
- `path` (`PropertyPath`): 속성을 가져올 경로예요. 문자열, 배열, 또는 키의 배열이 될 수 있어요.
- `defaultValue` (`R | ((...args: any[]) => R)`, 선택): 값이 `undefined`일 때 반환할 기본값이에요. 함수인 경우 호출해서 결과를 반환해요.

#### 반환 값

(`R`): 해결된 값을 반환해요. 경로상의 함수들이 호출되고, 최종 값도 함수라면 호출된 결과를 반환해요.
