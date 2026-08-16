# forOwnRight (Lodash 호환성)

::: warning `Object.keys`와 반복문을 사용하세요

이 `forOwnRight` 함수는 내부적으로 `keys` 함수를 호출하고 객체 변환 과정, 역순 순회 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Object.keys`와 반복문을 사용하세요.

:::

객체의 고유 속성만 역순으로 반복하면서 각 속성에 대해 함수를 호출해요.

```typescript
const result = forOwnRight(obj, iteratee);
```

## 사용법

### `forOwnRight(object, iteratee)`

객체의 고유 속성만 역순으로 반복하면서 `iteratee` 함수를 호출해요. 상속된 속성이나 `Symbol` 키는 제외하고 객체가 직접 소유한 속성만 역순으로 반복해요. 키를 배열로 모은 뒤 역순으로 순회하기 때문에 일반적인 순회보다 느려요. `iteratee` 함수가 `false`를 반환하면 반복을 중단해요.

```typescript
import { forOwnRight } from 'es-toolkit/compat';

// 객체의 고유 속성만 역순 반복
const obj = { a: 1, b: 2 };
forOwnRight(obj, (value, key) => {
  console.log(key, value);
});
// 출력: 'b' 2, 'a' 1

// 상속된 속성은 제외하여 역순 반복
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.protoProperty = 'proto';

const child = new Parent();
child.own = 'ownValue';

forOwnRight(child, (value, key) => {
  console.log(key, value);
});
// 출력: 'own' 'ownValue', 'inherited' 'value' (protoProperty는 제외)

// 조건에 따른 조기 종료
forOwnRight(obj, (value, key) => {
  console.log(key, value);
  return key !== 'a'; // 'a'에서 중단
});
// 출력: 'b' 2, 'a' 1
```

`null`이나 `undefined`는 그대로 반환해요.

```typescript
import { forOwnRight } from 'es-toolkit/compat';

forOwnRight(null, iteratee); // null
forOwnRight(undefined, iteratee); // undefined
```

#### 파라미터

- `object` (`T | null | undefined`): 반복할 객체예요.
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`, 선택): 각 속성에 대해 호출할 함수예요. 기본값은 `identity` 함수예요.

#### 반환 값

(`T | null | undefined`): 원본 객체를 반환해요.
