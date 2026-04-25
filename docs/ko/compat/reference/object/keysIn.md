# keysIn (Lodash 호환성)

::: warning `for...in` 루프나 `Object.keys`를 사용하세요

이 `keysIn` 함수는 배열형 객체 처리, 프로토타입 체인 순회 등의 복잡한 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `for...in` 루프나 필요에 따라 `Object.keys()`를 사용하세요.

:::

객체의 모든 열거 가능한 속성 이름들을 상속된 속성까지 포함해서 배열로 반환해요.

```typescript
const allKeys = keysIn(object);
```

## 사용법

### `keysIn(object)`

객체의 모든 속성 이름들을 상속된 속성까지 포함해서 가져오고 싶을 때 `keysIn`을 사용하세요. `keys`와 달리 프로토타입 체인의 속성들도 함께 반환해요.

```typescript
import { keysIn } from 'es-toolkit/compat';

// 기본 객체의 키들
const object = { a: 1, b: 2 };
keysIn(object);
// => ['a', 'b']

// 배열의 인덱스들
const array = [1, 2, 3];
keysIn(array);
// => ['0', '1', '2']

// 문자열의 인덱스들
keysIn('hello');
// => ['0', '1', '2', '3', '4']
```

상속된 속성들도 포함해요.

```typescript
import { keysIn } from 'es-toolkit/compat';

function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;

keysIn(new Foo());
// => ['a', 'b', 'c'] (프로토타입 속성 'c'도 포함)

// constructor는 제외해요
class MyClass {
  constructor() {
    this.prop = 1;
  }
  method() {}
}
MyClass.prototype.inherited = 2;

keysIn(new MyClass());
// => ['prop', 'method', 'inherited'] (constructor는 제외됨)
```

배열형 객체들을 특별히 처리해요.

```typescript
import { keysIn } from 'es-toolkit/compat';

// TypedArray
const typedArray = new Uint8Array([1, 2, 3]);
keysIn(typedArray);
// => ['0', '1', '2'] (buffer, byteLength 등은 제외)

// arguments 객체
function example() {
  return keysIn(arguments);
}
example('a', 'b', 'c');
// => ['0', '1', '2']
```

`null`이나 `undefined`를 안전하게 처리해요.

```typescript
import { keysIn } from 'es-toolkit/compat';

keysIn(null);
// => []

keysIn(undefined);
// => []
```

#### 파라미터

- `object` (`any`): 키를 가져올 객체예요.

#### 반환 값

(`string[]`): 객체의 모든 열거 가능한 속성 이름들(자체 속성과 상속된 속성 모두 포함)의 배열을 반환해요.
