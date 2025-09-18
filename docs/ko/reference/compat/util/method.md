# method (Lodash 호환성)

::: warning 직접 메서드를 호출하세요

이 `method` 함수는 경로 해석과 `invoke` 함수 호출 등의 추가 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 직접 메서드 호출을 사용하세요.

:::

주어진 객체의 경로에 있는 메서드를 제공된 인자로 호출하는 함수를 만들어요.

```typescript
const caller = method(path, ...args);
```

## 레퍼런스

### `method(path, ...args)`

객체의 특정 경로에 있는 메서드를 미리 정해진 인자들로 호출하는 함수를 만들고 싶을 때 `method`를 사용하세요. 나중에 여러 객체에 대해 동일한 메서드를 호출할 때 유용해요.

```typescript
import { method } from 'es-toolkit/compat';

const object = {
  a: {
    b: function (x, y) {
      return x + y;
    }
  }
};

// 'a.b' 경로의 메서드를 인자 1, 2로 호출하는 함수 생성
const addMethod = method('a.b', 1, 2);
console.log(addMethod(object));
// Returns: 3

// 배열로 경로를 지정할 수도 있어요
const addMethod2 = method(['a', 'b'], 1, 2);
console.log(addMethod2(object));
// Returns: 3

// 여러 객체에 대해 동일한 메서드 호출
const objects = [
  { calc: { add: (a, b) => a + b } },
  { calc: { add: (a, b) => a * 2 + b } }
];

const calculate = method('calc.add', 10, 5);
objects.map(obj => calculate(obj));
// Returns: [15, 25]
```

#### 파라미터

- `path` (`PropertyKey | PropertyKey[]`): 호출할 메서드의 경로예요. 문자열, 심볼, 숫자나 이들의 배열이 될 수 있어요.
- `args` (`...any`): 메서드를 호출할 때 사용할 인수들이에요.

### 반환 값

(`(object?: unknown) => any`): 객체를 받아서 지정된 경로의 메서드를 미리 정해진 인자들로 호출하는 새 함수를 반환해요.