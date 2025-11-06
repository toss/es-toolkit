# uniq

배열에서 중복된 요소들을 제거한 새로운 배열을 반환해요.

```typescript
const uniqueArray = uniq(arr);
```

## 사용법

### `uniq(arr)`

배열에서 중복된 값들을 제거하고 고유한 값들만 남기고 싶을 때 `uniq`를 사용하세요. 원본 배열에서 처음 나타나는 순서를 유지해요.

```typescript
import { uniq } from 'es-toolkit/array';

// 숫자 배열에서 중복을 제거해요.
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = uniq(numbers);
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]

// 문자열 배열에서 중복을 제거해요.
const words = ['apple', 'banana', 'apple', 'cherry', 'banana'];
const uniqueWords = uniq(words);
console.log(uniqueWords); // ['apple', 'banana', 'cherry']

// 객체 배열에서 참조가 같은 객체를 제거해요.
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 3 };
const objects = [obj1, obj2, obj1, obj3, obj2];
const uniqueObjects = uniq(objects);
console.log(uniqueObjects); // [{ id: 1 }, { id: 2 }, { id: 3 }]
```

빈 배열에서는 빈 배열을 반환해요.

```typescript
import { uniq } from 'es-toolkit/array';

const emptyArray = uniq([]);
console.log(emptyArray); // []
```

#### 파라미터

- `arr` (`readonly T[]`): 중복을 제거할 배열이에요.

#### 반환 값

(`T[]`): 중복이 제거된 새로운 배열이에요. 원본 배열에서 처음 나타나는 순서를 유지해요.
