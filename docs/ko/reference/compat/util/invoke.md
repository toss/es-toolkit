# invoke (Lodash 호환성)

::: warning 직접 메서드를 호출하세요

이 `invoke` 함수는 경로 해석, 객체 탐색, `get` 함수 호출 등의 복잡한 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 직접 메서드 호출을 사용하세요.

:::

객체의 경로에 있는 메서드를 주어진 인수로 호출해요.

```typescript
const result = invoke(object, path, args);
```

## 레퍼런스

### `invoke(object, path, args)`

객체의 특정 경로에 있는 메서드를 인자들과 함께 호출하고 싶을 때 `invoke`를 사용하세요. 경로는 점 표기법 문자열이나 속성 키 배열로 지정할 수 있어요.

```typescript
import { invoke } from 'es-toolkit/compat';

const object = {
  a: {
    b: function (x, y) {
      return x + y;
    },
  },
};

// 점 표기법으로 경로 지정
invoke(object, 'a.b', [1, 2]);
// Returns: 3

// 배열로 경로 지정
invoke(object, ['a', 'b'], [1, 2]);
// Returns: 3

// 존재하지 않는 경로
invoke(object, 'a.c.d', [1, 2]);
// Returns: undefined

// 다양한 타입의 인자들
const obj = {
  calculate: {
    sum: function (...numbers) {
      return numbers.reduce((a, b) => a + b, 0);
    },
    multiply: function (a, b) {
      return a * b;
    },
  },
};

invoke(obj, 'calculate.sum', [1, 2, 3, 4]);
// Returns: 10

invoke(obj, ['calculate', 'multiply'], [5, 6]);
// Returns: 30
```

#### 파라미터

- `object` (`unknown`): 메서드를 호출할 객체예요.
- `path` (`PropertyKey | PropertyKey[]`): 호출할 메서드의 경로예요. 문자열, 심볼, 숫자나 이들의 배열이 될 수 있어요.
- `args` (`any[]`): 메서드를 호출할 때 사용할 인수 배열이에요.

#### 반환 값

(`any`): 호출된 메서드의 결과를 반환해요. 메서드가 존재하지 않으면 `undefined`를 반환해요.
