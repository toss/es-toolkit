# keys (Lodash 호환성)

::: warning `Object.keys`를 사용하세요

이 `keys` 함수는 배열형 객체 처리, 프로토타입 객체 처리 등의 복잡한 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Object.keys()`를 사용하세요.

:::

객체의 자체 열거 가능한 속성 이름들을 배열로 반환해요.

```typescript
const keyArray = keys(object);
```

## 레퍼런스

### `keys(object)`

객체의 자체 속성 이름들을 가져오고 싶을 때 `keys`를 사용하세요. 상속된 속성은 포함하지 않고 자체 속성만 반환해요.

```typescript
import { keys } from 'es-toolkit/compat';

// 기본 객체의 키들
const object = { a: 1, b: 2, c: 3 };
keys(object);
// => ['a', 'b', 'c']

// 배열의 인덱스들
const array = [1, 2, 3];
keys(array);
// => ['0', '1', '2']

// 문자열의 인덱스들
keys('hello');
// => ['0', '1', '2', '3', '4']
```

함수나 생성자에서 상속된 속성은 제외해요.

```typescript
import { keys } from 'es-toolkit/compat';

function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;

keys(new Foo());
// => ['a', 'b'] ('c'는 프로토타입 속성이므로 제외)
```

배열형 객체들을 특별히 처리해요.

```typescript
import { keys } from 'es-toolkit/compat';

// TypedArray
const typedArray = new Uint8Array([1, 2, 3]);
keys(typedArray);
// => ['0', '1', '2']

// arguments 객체
function example() {
  return keys(arguments);
}
example('a', 'b', 'c');
// => ['0', '1', '2']
```

`null`이나 `undefined`를 안전하게 처리해요.

```typescript
import { keys } from 'es-toolkit/compat';

keys(null);
// => []

keys(undefined);
// => []
```

#### 파라미터

- `object` (`any`): 키를 가져올 객체예요.

#### 반환 값

(`string[]`): 객체의 자체 열거 가능한 속성 이름들의 배열을 반환해요.
