# overArgs (Lodash 호환성)

::: warning 화살표 함수와 직접 변환을 사용하세요

이 `overArgs` 함수는 각 인자를 변환하는 복잡한 래퍼를 만들어 느리게 동작해요. 화살표 함수를 사용해서 인자를 직접 변환하면 더 명확하고 빠른 코드를 작성할 수 있어요.

대신 더 빠르고 현대적인 화살표 함수와 직접 변환을 사용하세요.

:::

함수의 각 인자를 대응하는 변환 함수로 변환한 후 실행하는 새로운 함수를 생성해요.

```typescript
const wrapped = overArgs(func, transforms);
```

## 사용법

### `overArgs(func, ...transforms)`

함수를 호출하기 전에 각 인자를 변환하고 싶을 때 `overArgs`를 사용하세요. 각 인자는 대응하는 변환 함수에 의해 처리돼요.

```typescript
import { overArgs } from 'es-toolkit/compat';

function doubled(n) {
  return n * 2;
}

function square(n) {
  return n * n;
}

// 첫 번째 인자는 2배, 두 번째 인자는 제곱
const func = overArgs((x, y) => [x, y], [doubled, square]);
func(5, 3);
// Returns: [10, 9]
```

문자열로 속성을 추출할 수도 있어요.

```typescript
import { overArgs } from 'es-toolkit/compat';

const user1 = { name: 'John', age: 30 };
const user2 = { name: 'Jane', age: 25 };

// 각 객체에서 속성 추출
const getUserInfo = overArgs((name, age) => `${name} is ${age} years old`, ['name', 'age']);
getUserInfo(user1, user2);
// Returns: "John is 25 years old"
```

변환 함수가 제공되지 않거나 `null`/`undefined`인 경우 인자를 그대로 전달해요.

```typescript
import { overArgs } from 'es-toolkit/compat';

const func = overArgs((a, b, c) => [a, b, c], [n => n * 2, null, n => n * 3]);
func(5, 10, 15);
// Returns: [10, 10, 45]
```

변환 함수 개수보다 많은 인자는 그대로 전달돼요.

```typescript
import { overArgs } from 'es-toolkit/compat';

const func = overArgs((a, b, c) => [a, b, c], [n => n * 2]);
func(5, 10, 15);
// Returns: [10, 10, 15]
```

객체와 일치 여부를 확인할 수도 있어요.

```typescript
import { overArgs } from 'es-toolkit/compat';

const func = overArgs((match1, match2) => [match1, match2], [{ age: 30 }, { active: true }]);

func({ name: 'John', age: 30 }, { active: true, status: 'online' });
// Returns: [true, true]
```

#### 파라미터

- `func` (`(...args: any[]) => any`): 래핑할 함수예요.
- `...transforms` (`Array<(...args: any[]) => any | string | object | array>`): 인자를 변환할 함수들이에요. 각 변환은 다음 중 하나일 수 있어요:
  - 값을 받아서 반환하는 함수
  - 속성 값을 가져올 문자열 (예: 'name'은 name 속성을 가져옴)
  - 인자가 속성과 일치하는지 확인할 객체
  - 속성 일치를 확인할 [property, value] 배열

#### 반환 값

(`(...args: any[]) => any`): 인자를 변환한 후 원래 함수를 호출하는 새로운 함수를 반환해요.
