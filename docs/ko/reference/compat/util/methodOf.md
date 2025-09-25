# methodOf (Lodash 호환성)

주어진 객체에서 경로를 받아 메서드를 인자와 함께 호출하는 함수를 만들어요.

```typescript
const pathInvoker = methodOf(object, ...args);
```

## 레퍼런스

### `methodOf(object, ...args)`

특정 객체의 메서드를 미리 정의된 인자와 함께 호출하는 함수를 생성해요. `method`와 반대로 객체는 고정하고 경로를 나중에 지정할 때 유용해요.

```typescript
import { methodOf } from 'es-toolkit/compat';

const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

// 객체와 인자를 미리 바인딩해요
const callMethod = methodOf(object, 1, 2);
console.log(callMethod('a.b')); // => 3

// 여러 경로에 대해 동일한 객체와 인자로 호출해요
const calculator = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b,
  subtract: (a, b) => a - b,
};

const compute = methodOf(calculator, 10, 5);
console.log(compute('add')); // => 15
console.log(compute('multiply')); // => 50
console.log(compute('subtract')); // => 5
```

중첩된 객체에서도 사용할 수 있어요.

```typescript
import { methodOf } from 'es-toolkit/compat';

const data = {
  users: {
    findById: function (id) {
      return `User ${id}`;
    },
    findByName: function (name) {
      return `Found ${name}`;
    },
  },
};

const userFinder = methodOf(data, 'john');
userFinder('users.findById'); // => 'User john'
userFinder('users.findByName'); // => 'Found john'
```

#### 파라미터

- `object` (`object`): 메서드를 호출할 객체예요.
- `...args` (`any[]`): 메서드에 전달할 인자들이에요.

#### 반환 값

(`(path: PropertyKey | PropertyKey[]) => any`): 경로를 받아서 지정된 객체의 메서드를 인자와 함께 호출하는 함수를 반환해요.
