# size (Lodash 호환성)

::: warning `.length` 속성을 사용하세요

이 `size` 함수는 `null`, `undefined` 처리 및 다양한 타입 지원으로 인해 복잡하게 동작해요.

대신 더 빠르고 현대적인 `.length` 속성이나 `Object.keys().length`를 사용하세요.

:::

배열, 문자열, 객체의 크기를 반환해요.

```typescript
const length = size(collection);
```

## 레퍼런스

### `size(collection)`

배열, 문자열, 객체, Map, Set의 크기를 확인할 때 `size`를 사용하세요. 다양한 타입의 컬렉션에 대해 일관된 크기 정보를 제공해요.

```typescript
import { size } from 'es-toolkit/compat';

// 배열의 요소 개수
size([1, 2, 3]);
// 3을 반환해요

// 문자열의 문자 개수
size('hello');
// 5를 반환해요

// 객체의 열거 가능한 속성 개수
size({ a: 1, b: 2, c: 3 });
// 3을 반환해요

// Map의 요소 개수
size(
  new Map([
    ['a', 1],
    ['b', 2],
  ])
);
// 2를 반환해요

// Set의 요소 개수
size(new Set([1, 2, 3]));
// 3을 반환해요
```

`null`이나 `undefined`는 0을 반환해요.

```typescript
import { size } from 'es-toolkit/compat';

size(null); // 0
size(undefined); // 0
size({}); // 0
size([]); // 0
```

#### 파라미터

- `collection` (`object | string | null | undefined`): 크기를 확인할 배열, 문자열, 객체, Map, Set이에요.

#### 반환 값

(`number`): 컬렉션의 크기를 반환해요. `null`이나 `undefined`면 0을 반환해요.
