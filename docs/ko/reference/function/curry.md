# curry

함수를 커링해서 한 번에 하나의 인자로 호출할 수 있도록 해요.

```typescript
const curriedFunc = curry(func);
```

## 레퍼런스

### `curry(func)`

함수를 부분적으로 적용하고 싶을 때 `curry`를 사용하세요. 커링된 함수는 필요한 모든 인자를 받을 때까지 새로운 함수를 반환해요. 모든 인자가 제공되면 원래 함수가 실행돼요.

```typescript
import { curry } from 'es-toolkit/function';

function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curry(sum);

// 인자 `a`에 값 `10`을 제공해요
const sum10 = curriedSum(10);

// 인자 `b`에 값 `15`를 제공해요
const sum25 = sum10(15);

// 인자 `c`에 값 `5`를 제공해요
// 모든 인자를 받았으므로 이제 값을 반환해요
const result = sum25(5);
// Returns: 30
```

재사용 가능한 함수를 만들 때 유용해요.

```typescript
function multiply(a: number, b: number) {
  return a * b;
}

const curriedMultiply = curry(multiply);
const double = curriedMultiply(2);
const triple = curriedMultiply(3);

double(5); // Returns: 10
triple(5); // Returns: 15
```

#### 파라미터

- `func` (`(...args: any[]) => any`): 커링할 함수예요.

#### 반환 값

(`(...args: any[]) => any`): 한 번에 하나의 인자로 호출할 수 있는 커링된 함수예요.
