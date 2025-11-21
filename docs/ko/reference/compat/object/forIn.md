# forIn (Lodash 호환성)

::: warning `Object.keys`와 `for...in` 반복문을 사용하세요

이 `forIn` 함수는 `null`이나 `undefined` 처리, 기본 `iteratee` 설정 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Object.keys`와 `for...in` 반복문을 사용하세요.

:::

객체의 모든 속성(상속된 속성 포함)을 반복하면서 각 속성에 대해 함수를 호출해요.

```typescript
const result = forIn(obj, iteratee);
```

## 사용법

### `forIn(object, iteratee)`

객체의 모든 속성을 반복하면서 `iteratee` 함수를 호출해요. 객체의 고유 속성뿐만 아니라 프로토타입 체인을 통해 상속된 속성까지 모두 반복해요. `iteratee` 함수가 `false`를 반환하면 반복을 중단해요.

```typescript
import { forIn } from 'es-toolkit/compat';

// 객체의 모든 속성 반복
const obj = { a: 1, b: 2 };
forIn(obj, (value, key) => {
  console.log(key, value);
});
// 출력: 'a' 1, 'b' 2

// 상속된 속성도 포함하여 반복
function Parent() {
  this.inherited = 'value';
}
Parent.prototype.protoProperty = 'proto';

const child = new Parent();
child.own = 'ownValue';

forIn(child, (value, key) => {
  console.log(key, value);
});
// 출력: 'inherited' 'value', 'own' 'ownValue', 'protoProperty' 'proto'

// 조건에 따른 조기 종료
forIn(obj, (value, key) => {
  console.log(key, value);
  return key !== 'a'; // 'a' 이후 중단
});
// 출력: 'a' 1
```

`null`이나 `undefined`는 그대로 반환해요.

```typescript
import { forIn } from 'es-toolkit/compat';

forIn(null, iteratee); // null
forIn(undefined, iteratee); // undefined
```

#### 파라미터

- `object` (`T | null | undefined`): 반복할 객체예요.
- `iteratee` (`(value: T[keyof T], key: string, collection: T) => any`, 선택): 각 속성에 대해 호출할 함수예요. 기본값은 `identity` 함수예요.

#### 반환 값

(`T | null | undefined`): 원본 객체를 반환해요.
