# keys (Lodash 호환성)

::: warning `Object.keys`를 사용하세요

이 `keys` 함수는 복잡한 배열 같은 객체 처리, 프로토타입 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Object.keys`를 사용하세요.

:::

객체의 열거 가능한 자체 속성 이름들을 배열로 반환해요.

```typescript
const result = keys(object);
```

## 레퍼런스

### `keys(object)`

객체의 모든 열거 가능한 자체 속성의 이름들을 배열로 가져오고 싶을 때 `keys`를 사용하세요. 배열이나 문자열 같은 배열형 객체도 처리할 수 있어요.

```typescript
import { keys } from 'es-toolkit/compat';

// 일반 객체
const obj = { a: 1, b: 2, c: 3 };
keys(obj);
// Returns: ['a', 'b', 'c']

// 배열
keys([1, 2, 3]);
// Returns: ['0', '1', '2']

// 문자열
keys('hello');
// Returns: ['0', '1', '2', '3', '4']

// 함수 객체
function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;
keys(new Foo());
// Returns: ['a', 'b'] (프로토타입의 속성은 제외)
```

객체가 아닌 값들은 객체로 변환되어 처리돼요.

```typescript
import { keys } from 'es-toolkit/compat';

keys(null); // []
keys(undefined); // []
keys(42); // []
keys(true); // []
```

#### 파라미터

- `object` (`object`, 선택): 속성 이름을 가져올 객체예요.

### 반환 값

(`string[]`): 객체의 열거 가능한 자체 속성 이름들을 담은 배열을 반환해요.