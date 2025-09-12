# unzip

묶여있는 배열들을 풀어서 같은 위치의 요소들끼리 새로운 배열들로 만들어 반환해요.

```typescript
const unzippedArrays = unzip(zipped);
```

## 레퍼런스

### `unzip(zipped)`

여러 개의 배열이 묶여 있는 2차원 배열에서 같은 인덱스에 있는 요소들을 모아서 새로운 배열들을 만들고 싶을 때 `unzip`을 사용하세요. zip의 반대 동작이에요.

```typescript
import { unzip } from 'es-toolkit/array';

// 문자열, 참 또는 거짓, 숫자가 묶인 배열을 풀어요.
const zipped = [
  ['a', true, 1],
  ['b', false, 2],
  ['c', true, 3]
];
const result = unzip(zipped);
console.log(result); 
// [['a', 'b', 'c'], [true, false, true], [1, 2, 3]]

// 사용자 정보가 묶인 배열을 풀어요.
const users = [
  ['john', 30, 'engineer'],
  ['jane', 25, 'designer'], 
  ['bob', 35, 'manager']
];
const [names, ages, roles] = unzip(users);
console.log(names); // ['john', 'jane', 'bob']
console.log(ages); // [30, 25, 35] 
console.log(roles); // ['engineer', 'designer', 'manager']
```

길이가 다른 배열들도 처리할 수 있어요. 짧은 배열의 경우 `undefined`로 채워져요.

```typescript
import { unzip } from 'es-toolkit/array';

const mixed = [
  [1, 'a'],
  [2, 'b', true],
  [3]
];
const result = unzip(mixed);
console.log(result); 
// [[1, 2, 3], ['a', 'b', undefined], [undefined, true, undefined]]
```

빈 배열을 전달하면 빈 배열을 반환해요.

```typescript
import { unzip } from 'es-toolkit/array';

const empty = unzip([]);
console.log(empty); // []
```

#### 파라미터

- `zipped` (`ReadonlyArray<[...T]>`): 풀어낼 배열들이 묶여있는 2차원 배열이에요.

#### 반환 값

(`Unzip<T>`): 같은 위치의 요소들끼리 묶인 새로운 배열들이에요. 원본 배열들의 길이가 다르면 짧은 배열의 빈 자리는 `undefined`로 채워져요.
