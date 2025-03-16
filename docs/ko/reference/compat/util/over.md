# over

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

제공된 반복자(iteratees)들을 인자와 함께 호출하고 그 결과를 배열로 반환하는 함수를 생성해요.

다양한 타입의 반복자를 사용할 수 있어요:

- **함수**: 각 함수는 동일한 인자로 호출되고 결과가 수집돼요.
- **속성 이름**: 각 속성 이름은 제공된 객체에서 값을 추출하는 데 사용돼요.
- **객체**: 각 객체는 제공된 객체가 해당 속성과 일치하는지 확인하는 데 사용돼요.
- **속성-값 쌍**: 각 쌍은 제공된 객체의 특정 속성이 값과 일치하는지 확인해요.

## 인터페이스

```typescript
// 함수 반복자 사용
function over<T extends unknown[], R>(iteratees: Array<(...args: T) => R>): (...args: T) => R[];

// 속성-값 쌍 사용
function over<T extends [object]>(iteratees: Array<[PropertyKey, unknown]>): (...args: T) => boolean[];

// 객체 매처 사용
function over<T extends [object]>(iteratees: object[]): (...args: T) => boolean[];

// 속성 접근자 사용
function over<T extends [object]>(iteratees: PropertyKey[]): (...args: T) => unknown[];
```

### 파라미터

- `iteratees`: 호출할 반복자들이에요. 다음과 같은 형태가 가능해요:
  - **함수 배열**: 각 함수는 동일한 인자로 호출돼요.
  - **속성-값 쌍 배열**: 각 쌍은 지정된 속성이 주어진 값과 일치하는지 확인해요.
  - **객체 배열**: 각 객체는 제공된 객체가 일치하는지 확인하는 데 사용돼요.
  - **속성 키 배열**: 각 속성 키는 제공된 객체에서 값을 접근하는 데 사용돼요.

::: info nullish 값 처리
반복자 배열에 `null`이나 `undefined` 값이 포함된 경우, 런타임에서는 항등 함수(identity function)로 처리돼요. 하지만 적절한 타입 정의 없이는 TypeScript 타입 에러가 발생해요. 이 동작은 lodash의 기능과 정확히 일치하도록 의도적으로 구현되었어요.
:::

### 반환 값

인자가 주어졌을 때 모든 반복자를 해당 인자로 호출하고 결과 배열을 반환하는 함수예요.

## 예시

### 함수 반복자 사용

```typescript
import { over } from 'es-toolkit/compat';

// 표준 함수 사용
const func = over([Math.max, Math.min]);
console.log(func(1, 2, 3, 4)); // => [4, 1]

// 커스텀 함수 사용
const greet = name => `Hello, ${name}!`;
const shout = name => `HEY, ${name.toUpperCase()}!!!`;
const greeter = over([greet, shout]);
console.log(greeter('world')); // => ['Hello, world!', 'HEY, WORLD!!!']

// this 바인딩 사용
const obj = {
  a: 1,
  b: 2,
  func: over([
    function () {
      return this.a;
    },
    function () {
      return this.b;
    },
  ]),
};
console.log(obj.func()); // => [1, 2]
```

### 속성 접근자 사용

```typescript
import { over } from 'es-toolkit/compat';

// 객체에서 속성 접근
const prop = over(['a', 'b']);
console.log(prop({ a: 1, b: 2 })); // => [1, 2]

// 숫자 속성도 작동해요
const items = ['apple', 'banana', 'cherry'];
const getItems = over([0, 2]);
console.log(getItems(items)); // => ['apple', 'cherry']
```

### 객체 매처 사용

```typescript
import { over } from 'es-toolkit/compat';

// 객체가 패턴과 일치하는지 확인
const matcher = over([{ a: 1 }, { b: 2 }]);
console.log(matcher({ a: 1, b: 2 })); // => [true, false]
console.log(matcher({ a: 1, b: 1 })); // => [true, false]

// 빈 객체는 모든 것과 일치해요
const alwaysTrue = over([{}]);
console.log(alwaysTrue({ a: 1 })); // => [true]
```

### 속성-값 쌍 사용

```typescript
import { over } from 'es-toolkit/compat';

// 속성이 값과 일치하는지 확인
const matchProp = over([
  ['a', 1],
  ['b', 2],
]);
console.log(matchProp({ a: 1, b: 2 })); // => [true, true]
console.log(matchProp({ a: 2, b: 1 })); // => [false, false]
```

### 특수 케이스

```typescript
import { over } from 'es-toolkit/compat';

// 빈 반복자 배열
const emptyFunc = over([]);
console.log(emptyFunc(1, 2, 3)); // => []

// null 또는 undefined 값 (항등 함수로 처리됨)
// 참고: 타입 단언 없이는 TypeScript 에러가 발생해요.
const nullFunc = over([null, undefined]);
console.log(nullFunc('a', 'b', 'c')); // => ['a', 'a']
```
