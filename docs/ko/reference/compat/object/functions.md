# functions (Lodash 호환성)

::: warning `Object.keys`와 `typeof` 체크를 사용하세요

이 `functions` 함수는 내부적으로 `keys` 함수와 필터링 과정을 거쳐서 느리게 동작해요.

대신 더 빠르고 현대적인 `Object.keys`와 `typeof` 체크를 사용하세요.

:::

객체의 고유 속성 중에서 함수인 속성의 이름들을 배열로 반환해요.

```typescript
const functionNames = functions(obj);
```

## 레퍼런스

### `functions(object)`

객체의 고유 속성을 확인해서 함수인 속성의 이름들만 배열로 반환해요. 상속된 속성이나 `Symbol` 키는 제외하고 객체가 직접 소유한 문자열 키 속성만 확인해요. 객체의 메서드를 찾거나 함수 속성만 따로 처리할 때 유용해요.

```typescript
import { functions } from 'es-toolkit/compat';

// 기본 사용법
const obj = {
  name: 'John',
  age: 30,
  greet: () => 'Hello',
  calculate: function (x, y) {
    return x + y;
  },
};

const functionNames = functions(obj);
// 결과: ['greet', 'calculate']

// 클래스 인스턴스에서 함수 찾기
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
const methods = functions(calc);
// 결과: ['add'] (상속된 multiply, divide는 제외)

// 함수가 없는 객체
const data = { x: 1, y: 2, z: 'text' };
const noFunctions = functions(data);
// 결과: []
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { functions } from 'es-toolkit/compat';

functions(null); // []
functions(undefined); // []
```

#### 파라미터

- `object` (`any`): 확인할 객체예요.

#### 반환 값

(`string[]`): 함수인 속성의 이름들로 구성된 배열을 반환해요.
