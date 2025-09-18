# keyBy (Lodash 호환성)

::: warning `es-toolkit`의 [keyBy](../../array/keyBy.md)를 사용하세요

이 `keyBy` 함수는 `null`이나 `undefined` 처리, 다양한 매개변수 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [keyBy](../../array/keyBy.md)를 사용하세요.

:::

컬렉션의 요소들을 지정된 키를 기준으로 객체로 구성해요.

```typescript
const result = keyBy(collection, iteratee);
```

## 레퍼런스

### `keyBy(collection, iteratee)`

배열이나 객체의 각 요소를 지정된 키 생성 함수나 속성 이름을 사용해서 객체로 구성해요. 같은 키를 가진 요소가 여러 개 있으면 마지막 요소가 사용돼요.

```typescript
import { keyBy } from 'es-toolkit/compat';

// 속성 이름으로 키 생성하기
const array = [
  { dir: 'left', code: 97 },
  { dir: 'right', code: 100 },
];

keyBy(array, 'dir');
// => { left: { dir: 'left', code: 97 }, right: { dir: 'right', code: 100 } }

// 함수로 키 생성하기
keyBy(array, o => String.fromCharCode(o.code));
// => { a: { dir: 'left', code: 97 }, d: { dir: 'right', code: 100 } }

// 객체에서도 사용 가능해요
const obj = {
  a: { id: 1, name: 'john' },
  b: { id: 2, name: 'jane' },
};
keyBy(obj, 'name');
// => { john: { id: 1, name: 'john' }, jane: { id: 2, name: 'jane' } }
```

`null`이나 `undefined`는 빈 객체로 처리해요.

```typescript
import { keyBy } from 'es-toolkit/compat';

keyBy(null, 'id'); // {}
keyBy(undefined, 'id'); // {}
```

#### 파라미터

- `collection` (`ArrayLike<T> | null | undefined`): 키로 구성할 배열이나 객체예요.
- `iteratee` (`ValueIterateeCustom<T, PropertyKey>`, 선택): 키를 생성할 함수나 속성 이름이에요. 생략하면 요소 자체를 키로 사용해요.

### 반환 값

(`Record<string, T>`): 각 요소가 생성된 키에 매핑된 새로운 객체를 반환해요.
