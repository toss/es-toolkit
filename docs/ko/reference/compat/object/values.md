# values (Lodash 호환성)

::: warning `Object.values`를 사용하세요

이 `values` 함수는 단순히 `Object.values`를 호출하므로 불필요한 오버헤드가 있어요.

대신 더 빠르고 현대적인 `Object.values()`를 직접 사용하세요.

:::

객체의 자체 열거 가능한 속성 값들을 배열로 반환해요.

```typescript
const valueArray = values(obj);
```

## 레퍼런스

### `values(obj)`

객체의 모든 속성 값을 배열로 가져올 때 `values`를 사용하세요. `Object.values`와 동일하게 동작하지만, `null`이나 `undefined`를 안전하게 처리해요.

```typescript
import { values } from 'es-toolkit/compat';

// 객체의 값 가져오기
const obj = { a: 1, b: 2, c: 3 };
values(obj); // => [1, 2, 3]

// 숫자 키를 가진 객체
const numberKeyObj = { 0: 'a', 1: 'b', 2: 'c' };
values(numberKeyObj); // => ['a', 'b', 'c']
```

배열이나 배열과 유사한 객체도 처리할 수 있어요.

```typescript
import { values } from 'es-toolkit/compat';

// 배열
values([1, 2, 3]); // => [1, 2, 3]

// 문자열 (배열과 유사한 객체)
values('hello'); // => ['h', 'e', 'l', 'l', 'o']
```

`null`이나 `undefined`는 빈 배열로 처리돼요.

```typescript
import { values } from 'es-toolkit/compat';

values(null); // => []
values(undefined); // => []
```

열거 가능한 속성만 반환돼요.

```typescript
import { values } from 'es-toolkit/compat';

const obj = Object.create(
  { inherited: 'not included' },
  {
    own: { value: 'included', enumerable: true },
    nonEnum: { value: 'not included', enumerable: false },
  }
);

values(obj); // => ['included']
```

#### 파라미터

- `obj` (`Record<PropertyKey, T> | ArrayLike<T> | null | undefined`): 속성 값들을 가져올 객체예요.

#### 반환 값

(`T[]`): 객체의 열거 가능한 속성 값들의 배열을 반환해요.
