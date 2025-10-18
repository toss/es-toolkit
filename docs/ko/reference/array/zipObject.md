# zipObject

키 배열과 값 배열을 받아서 하나의 객체로 만들어요.

```typescript
const object = zipObject(keys, values);
```

## 레퍼런스

### `zipObject(keys, values)`

배열 두 개를 하나의 객체로 합치고 싶을 때 `zipObject`를 사용하세요. 첫 번째 배열의 요소가 키가 되고, 두 번째 배열의 요소가 값이 되는 새 객체를 반환해요.

```typescript
import { zipObject } from 'es-toolkit/array';

// 키와 값을 객체로 만들어요.
zipObject(['a', 'b', 'c'], [1, 2, 3]);
// Returns: { a: 1, b: 2, c: 3 }

// 키가 더 많으면 undefined가 값이 돼요.
zipObject(['a', 'b', 'c', 'd'], [1, 2, 3]);
// Returns: { a: 1, b: 2, c: 3, d: undefined }
```

값 배열이 더 길면 초과하는 값들은 무시돼요.

```typescript
import { zipObject } from 'es-toolkit/array';

zipObject(['a', 'b'], [1, 2, 3, 4]);
// Returns: { a: 1, b: 2 }
```

#### 파라미터

- `keys` (`readonly P[]`): 객체의 키가 될 배열이에요.
- `values` (`readonly V[]`): 각 키에 대응하는 값 배열이에요.

#### 반환 값

(`Record<P, V>`): 키와 값이 결합된 새 객체를 반환해요.
