# create (Lodash 호환성)

::: warning `Object.create`를 사용하세요

이 `create` 함수는 복잡한 속성 처리 로직으로 인해 상대적으로 느려요.

대신 더 빠르고 현대적인 `Object.create`를 사용하세요.

:::

주어진 프로토타입을 상속하는 새로운 객체를 만들어요.

```typescript
const obj = create(prototype, properties);
```

## 사용법

### `create(prototype, properties?)`

프로토타입을 기반으로 새로운 객체를 만들고 싶을 때 `create`를 사용하세요. 선택적으로 속성을 추가할 수도 있어요.

```typescript
import { create } from 'es-toolkit/compat';

// 기본 사용법
const person = {
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

const john = create(person, { name: 'John' });
john.greet(); // "Hello, my name is John"

// 메서드 상속 확인
console.log('greet' in john); // true
console.log(john.hasOwnProperty('greet')); // false (상속된 속성)
console.log(john.hasOwnProperty('name')); // true (고유 속성)

// 복잡한 프로토타입
const animal = {
  type: 'animal',
  makeSound() {
    console.log('Some generic sound');
  },
};

const dog = create(animal, {
  breed: 'Golden Retriever',
  name: 'Buddy',
  makeSound() {
    console.log('Woof!');
  },
});

console.log(dog.type); // 'animal' (상속됨)
console.log(dog.breed); // 'Golden Retriever' (고유 속성)
dog.makeSound(); // 'Woof!' (덮어쓴 메서드)

// null 프로토타입
const cleanObj = create(null, { data: 'value' });
console.log(cleanObj.toString); // ƒ toString() { [native code] } (null은 {}와 동일)

// 빈 객체 상속
const empty = create({});
console.log(Object.getPrototypeOf(empty)); // {} (빈 객체)
```

속성은 열거 가능한 문자열 키만 복사돼요.

```typescript
import { create } from 'es-toolkit/compat';

const proto = { inherited: true };
const props = {
  visible: 'yes',
  [Symbol('hidden')]: 'no', // Symbol 키는 복사되지 않음
};

// non-enumerable 속성 추가
Object.defineProperty(props, 'hidden', {
  value: 'secret',
  enumerable: false,
});

const obj = create(proto, props);
console.log(obj.visible); // 'yes'
console.log(obj.hidden); // undefined (non-enumerable)
console.log(obj[Symbol('hidden')]); // undefined (Symbol 키)
console.log(obj.inherited); // true (상속됨)
```

#### 파라미터

- `prototype` (`T extends object`): 상속할 프로토타입 객체예요.
- `properties` (`U extends object`, 선택적): 새 객체에 추가할 속성들이에요.

#### 반환 값

(`T & U`): 프로토타입을 상속하고 지정된 속성을 가진 새로운 객체를 반환해요.
