# valuesIn (Lodash 호환성)

::: warning `Object.values`를 사용하세요

이 `valuesIn` 함수는 프로토타입 속성까지 포함해서 처리하는 복잡한 로직으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Object.values`를 사용하세요.

:::

객체의 모든 속성 값들을 배열로 반환하며, 상속된 프로토타입 속성도 포함해요.

```typescript
const values = valuesIn(obj);
```

## 레퍼런스

### `valuesIn(object)`

객체의 모든 속성 값들을 배열로 가져오고 싶을 때 `valuesIn`을 사용하세요. 일반적인 `Object.values`와는 다르게 프로토타입 체인에서 상속된 속성의 값들도 함께 포함해요.

```typescript
import { valuesIn } from 'es-toolkit/compat';

const obj = { a: 1, b: 2, c: 3 };
valuesIn(obj); // [1, 2, 3]

// 배열도 처리해요
valuesIn([1, 2, 3]); // [1, 2, 3]
```

프로토타입에서 상속된 속성도 포함해요.

```typescript
import { valuesIn } from 'es-toolkit/compat';

function Parent() {
  this.a = 1;
}
Parent.prototype.inherited = 'fromParent';

function Child() {
  Parent.call(this);
  this.b = 2;
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.childProp = 'childValue';

const obj = new Child();
valuesIn(obj); // [1, 2, 'childValue', 'fromParent'] (constructor 제외)
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { valuesIn } from 'es-toolkit/compat';

valuesIn(null); // []
valuesIn(undefined); // []
```

#### 파라미터

- `object` (`any`): 값들을 가져올 객체예요.

#### 반환 값

(`any[]`): 객체의 모든 속성 값들을 포함한 배열을 반환해요. 상속된 프로토타입 속성의 값들도 포함돼요.
