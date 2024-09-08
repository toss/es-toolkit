# at

값이 배열이 아닌 경우 배열로 변환하여 반환해요.

## 인터페이스

```typescript
function castArray<T>(value?: unknown): T[];
```

### 파라미터

- `value` (`unknown`): 배열로 변환할 값.

### 반환 값

(`T[]`): 입력값이 배열이 아니라면 해당 값을 포함하는 배열을 반환하고, 이미 배열이라면 원래의 배열을 반환해요.

## Examples

```typescript
import { castArray } from 'es-toolkit/array';

const arr1 = castArray(1);
// [1]을 반환해요.

const arr2 = castArray([1]);
// [1]을 반환해요.

const arr3 = castArray({ a: 1 });
// [{'a': 1}]을 반환해요.

const arr4 = castArray(null);
// [null]을 반환해요.

const arr5 = castArray(undefined);
// [undefined]을 반환해요.

const arr6 = castArray();
// []을 반환해요.
```
