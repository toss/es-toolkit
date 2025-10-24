# pull

배열에서 지정된 값들을 모두 제거해요.

```typescript
const result = pull(arr, valuesToRemove);
```

## 레퍼런스

### `pull(arr, valuesToRemove)`

배열에서 특정 값들을 모두 제거하고 싶을 때 `pull`을 사용하세요. 이 함수는 원본 배열을 직접 수정하고, 수정된 배열을 반환해요.

```typescript
import { pull } from 'es-toolkit/array';

// 숫자 배열에서 특정 값들을 제거해요.
const numbers = [1, 2, 3, 4, 5, 2, 4];
pull(numbers, [2, 4]);
console.log(numbers); // [1, 3, 5]

// 문자열 배열에서 특정 문자열들을 제거해요.
const fruits = ['apple', 'banana', 'cherry', 'banana', 'date'];
pull(fruits, ['banana', 'cherry']);
console.log(fruits); // ['apple', 'date']

// 객체 배열에서 참조가 같은 객체를 제거해요.
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 3 };
const objects = [obj1, obj2, obj3, obj1];
pull(objects, [obj1]);
console.log(objects); // [{ id: 2 }, { id: 3 }]
```

원본 배열을 수정하지 않고 새로운 배열을 만들고 싶다면 `difference` 함수를 사용하세요.

```typescript
import { pull } from 'es-toolkit/array';
import { difference } from 'es-toolkit/array';

const original = [1, 2, 3, 4, 5];

// pull은 원본 배열을 수정해요.
const arr1 = [...original];
pull(arr1, [2, 4]);
console.log(arr1); // [1, 3, 5]

// difference는 새로운 배열을 반환해요.
const arr2 = difference(original, [2, 4]);
console.log(original); // [1, 2, 3, 4, 5] (변경되지 않음)
console.log(arr2); // [1, 3, 5]
```

#### 파라미터

- `arr` (`T[]`): 값을 제거할 배열이에요.
- `valuesToRemove` (`readonly unknown[]`): 배열에서 제거할 값들의 배열이에요.

#### 반환 값

(`T[]`): 지정된 값들이 제거된 원본 배열이에요. 원본 배열이 수정되어 반환돼요.
