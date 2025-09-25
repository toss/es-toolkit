# invert (Lodash 호환성)

::: warning `es-toolkit`의 `invert`를 사용하세요

이 `invert` 함수는 Lodash 호환성을 위한 복잡한 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [invert](../../object/invert.md)를 사용하세요.

:::

객체의 키와 값을 뒤바꿔요.

```typescript
const inverted = invert(object);
```

## 레퍼런스

### `invert(object)`

객체의 키와 값을 서로 바꾸고 싶을 때 `invert`를 사용하세요. 원래 객체의 키는 새 객체의 값이 되고, 원래 객체의 값은 새 객체의 키가 돼요.

```typescript
import { invert } from 'es-toolkit/compat';

// 기본 키-값 뒤바꾸기
const object = { a: 1, b: 2, c: 3 };
invert(object);
// => { '1': 'a', '2': 'b', '3': 'c' }

// 문자열 값들 뒤바꾸기
const colors = { red: '#ff0000', green: '#00ff00', blue: '#0000ff' };
invert(colors);
// => { '#ff0000': 'red', '#00ff00': 'green', '#0000ff': 'blue' }

// 혼합된 키와 값 타입
const mixed = { a: 1, 2: 'b', c: 3, 4: 'd' };
invert(mixed);
// => { '1': 'a', 'b': '2', '3': 'c', 'd': '4' }
```

중복된 값이 있을 때는 마지막 키가 사용돼요.

```typescript
import { invert } from 'es-toolkit/compat';

// 중복된 값이 있는 경우
const object = { a: 1, b: 1, c: 2 };
invert(object);
// => { '1': 'b', '2': 'c' }
// 'a'는 덮어쓰여져서 사라져요
```

#### 파라미터

- `object` (`object`): 뒤바꿀 객체예요.

#### 반환 값

(`Record<string, string>`): 키와 값이 뒤바뀐 새로운 객체를 반환해요.
