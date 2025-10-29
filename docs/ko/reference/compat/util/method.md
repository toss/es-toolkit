# method (Lodash 호환성)

지정된 경로의 메서드를 인자와 함께 호출하는 함수를 만들어요.

```typescript
const methodFunc = method(path, ...args);
```

## 레퍼런스

### `method(path, ...args)`

객체에서 특정 경로의 메서드를 미리 정의된 인자와 함께 호출하는 함수를 생성해요. 함수형 프로그래밍에서 메서드 호출을 재사용하거나 배열의 `map` 등에서 유용해요.

```typescript
import { method } from 'es-toolkit/compat';

const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

// 메서드 호출 함수를 만들어요
const add = method('a.b', 1, 2);
console.log(add(object)); // => 3

// 배열에서 각 객체의 메서드를 호출해요
const objects = [{ calc: { sum: (a, b) => a + b } }, { calc: { sum: (a, b) => a * b } }];

const calculate = method('calc.sum', 5, 3);
objects.map(calculate); // => [8, 15]
```

중첩된 경로도 처리할 수 있어요.

```typescript
import { method } from 'es-toolkit/compat';

const obj = {
  users: {
    getName: function (prefix) {
      return prefix + this.name;
    },
    name: 'John',
  },
};

const getUserName = method('users.getName', 'Mr. ');
getUserName(obj); // => 'Mr. John'
```

#### 파라미터

- `path` (`PropertyKey | PropertyKey[]`): 호출할 메서드의 경로예요.
- `...args` (`any[]`): 메서드에 전달할 인자들이에요.

#### 반환 값

(`(object: any) => any`): 객체를 받아서 지정된 경로의 메서드를 인자와 함께 호출하는 함수를 반환해요.
