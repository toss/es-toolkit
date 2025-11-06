# nthArg (Lodash 호환성)

::: warning 화살표 함수를 사용하세요

이 `nthArg` 함수는 단순히 특정 인덱스의 인자를 반환하는 래퍼 함수를 만들 뿐이에요. 화살표 함수를 사용하면 더 간결하고 명확하게 같은 기능을 구현할 수 있어요.

대신 더 빠르고 현대적인 화살표 함수를 사용하세요.

:::

지정한 인덱스의 인자를 반환하는 함수를 생성해요.

```typescript
const getNthArg = nthArg(n);
```

## 사용법

### `nthArg(n)`

함수의 특정 위치에 있는 인자만 필요할 때 `nthArg`를 사용하세요. 음수 인덱스를 사용하면 끝에서부터 계산해요.

```typescript
import { nthArg } from 'es-toolkit/compat';

// 두 번째 인자를 가져오는 함수 생성
const getSecondArg = nthArg(1);
getSecondArg('a', 'b', 'c', 'd');
// Returns: 'b'

// 마지막에서 두 번째 인자를 가져오는 함수 생성
const getPenultimateArg = nthArg(-2);
getPenultimateArg('a', 'b', 'c', 'd');
// Returns: 'c'

// 첫 번째 인자를 가져오는 함수 생성 (기본값)
const getFirstArg = nthArg();
getFirstArg('a', 'b', 'c');
// Returns: 'a'
```

배열 메소드와 함께 사용하면 유용해요.

```typescript
import { nthArg } from 'es-toolkit/compat';

// 각 배열의 두 번째 요소만 추출
const arrays = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
arrays.map(nthArg(1));
// Returns: [2, 5, 8]
```

음수 인덱스는 끝에서부터 계산해요.

```typescript
import { nthArg } from 'es-toolkit/compat';

// 마지막 인자를 가져오는 함수
const getLastArg = nthArg(-1);
getLastArg('first', 'middle', 'last');
// Returns: 'last'
```

#### 파라미터

- `n` (`number`, 선택): 반환할 인자의 인덱스예요. 음수 값은 끝에서부터 계산해요. 기본값은 `0`이에요.

#### 반환 값

(`(...args: any[]) => any`): 지정한 인덱스의 인자를 반환하는 새로운 함수를 반환해요.
