# toPlainObject (Lodash 호환성)

::: warning Object.assign이나 스프레드 연산자를 사용하세요

이 `toPlainObject` 함수는 복잡한 프로토타입 처리와 키 열거로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 Object.assign({}, obj)나 {...obj}를 사용하세요.

:::

값을 일반 객체로 변환해요.

```typescript
const plainObj = toPlainObject(value);
```

## 레퍼런스

### `toPlainObject(value)`

값을 일반 객체로 변환해요. 상속받은 열거 가능한 문자열 키 속성들을 자체 속성으로 평탄화해요.

```typescript
import { toPlainObject } from 'es-toolkit/compat';

// 생성자 함수와 프로토타입
function Foo() {
  this.b = 2;
}
Foo.prototype.c = 3;

const foo = new Foo();
toPlainObject(foo);
// Returns: { b: 2, c: 3 }

// 배열을 객체로 변환
toPlainObject([1, 2, 3]);
// Returns: { 0: 1, 1: 2, 2: 3 }
```

다양한 객체 타입을 처리해요.

```typescript
import { toPlainObject } from 'es-toolkit/compat';

// 문자열을 객체로 변환
toPlainObject('abc');
// Returns: { 0: 'a', 1: 'b', 2: 'c' }

// 이미 일반 객체인 경우
const obj = { a: 1, b: 2 };
toPlainObject(obj);
// Returns: { a: 1, b: 2 }
```

#### 파라미터

- `value` (`any`): 변환할 값이에요.

#### 반환 값

(`any`): 상속받은 열거 가능한 속성들이 자체 속성으로 평탄화된 일반 객체를 반환해요.
