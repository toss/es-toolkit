# functionsIn (Lodash 호환성)

::: warning `for...in` 반복문과 `typeof` 체크를 사용하세요

이 `functionsIn` 함수는 `for...in` 반복문과 함수 체크 과정을 거쳐서 느리게 동작해요.

대신 더 빠르고 현대적인 `for...in` 반복문과 `typeof` 체크를 사용하세요.

:::

객체의 모든 속성(상속된 속성 포함) 중에서 함수인 속성의 이름들을 배열로 반환해요.

```typescript
const functionNames = functionsIn(obj);
```

## 레퍼런스

### `functionsIn(object)`

객체의 모든 속성을 확인해서 함수인 속성의 이름들만 배열로 반환해요. 객체의 고유 속성뿐만 아니라 프로토타입 체인을 통해 상속된 속성까지 모두 확인해요. 객체의 모든 메서드(상속된 메서드 포함)를 찾을 때 유용해요.

```typescript
import { functionsIn } from 'es-toolkit/compat';

// 기본 사용법
const obj = {
  name: 'John',
  age: 30,
  greet: () => 'Hello',
  calculate: function (x, y) {
    return x + y;
  },
};

const functionNames = functionsIn(obj);
// 결과: ['greet', 'calculate']

// 상속된 함수도 포함
class Calculator {
  constructor() {
    this.value = 0;
    this.add = function (n) {
      this.value += n;
    };
  }

  multiply(n) {
    this.value *= n;
  }
}

Calculator.prototype.divide = function (n) {
  this.value /= n;
};

const calc = new Calculator();
const allMethods = functionsIn(calc);
// 결과: ['add', 'multiply', 'divide'] (상속된 메서드도 포함)

// 프로토타입 체인을 통한 상속
function Parent() {
  this.parentMethod = function () {
    return 'parent';
  };
}
Parent.prototype.protoMethod = function () {
  return 'proto';
};

function Child() {
  Parent.call(this);
  this.childMethod = function () {
    return 'child';
  };
}
Child.prototype = Object.create(Parent.prototype);

const child = new Child();
const inheritedFunctions = functionsIn(child);
// 결과: ['parentMethod', 'childMethod', 'protoMethod']
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { functionsIn } from 'es-toolkit/compat';

functionsIn(null); // []
functionsIn(undefined); // []
```

#### 파라미터

- `object` (`any`): 확인할 객체예요.

#### 반환 값

(`string[]`): 함수인 속성의 이름들(상속된 함수 포함)로 구성된 배열을 반환해요.
