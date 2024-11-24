# intersectionWith

두 요소가 일치하는지 여부를 판단하는 커스텀 함수를 기준으로, 두 배열의 교집합을 반환해요.

이 함수는 파라미터로 두 개의 배열과 커스텀 일치 함수를 받아요.
이 함수는 커스텀 일치 함수의 반환 값을 기준으로, 두 배열에 모두 포함된 요소들을 새로운 배열로 반환해요.
실제 구현을 살펴보면, 첫 번째 배열의 요소들 중에서 두 번째 배열의 어떤 요소와도 일치 함수를 기준으로 같지 않은 요소들을 제외한 새로운 배열을 반환해요.

## 인터페이스

```typescript
function intersectionWith<T, U>(firstArr: T[], secondArr: U[], areItemsEqual: (x: T, y: U) => boolean): T[];
```

### 파라미터

- `firstArr` (`T[]`): 비교할 첫 번째 배열.
- `secondArr` (`U[]`): 비교할 두 번째 배열.
- `areItemsEqual` (`(x: T, y: U) => boolean`): 두 요소가 일치하는지 판단하는 일치 함수예요. 두 요소가 일치한다면 `true`를, 일치하지 않는다면 `false`를 반환하게 해주세요.

### 반환 값

(`T[]`): 커스텀 일치 함수의 반환 값을 기준으로, 두 배열에 모두 포함된 요소들을 포함하는 새로운 배열.

## 예시

```typescript
const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const areItemsEqual = (a, b) => a.id === b.id;
const result = intersectionWith(array1, array2, areItemsEqual);
// `areItemsEqual` 기준으로 array1과 array2에 모두 포함되어 있는 요소들로 이루어진 [{ id: 2 }] 이 반환돼요.

const array1 = [
  { id: 1, name: 'jane' },
  { id: 2, name: 'amy' },
  { id: 3, name: 'michael' },
];
const array2 = [2, 4];
const areItemsEqual = (a, b) => a.id === b;
const result = intersectionWith(array1, array2, areItemsEqual);
// `areItemsEqual` 기준으로 array1의 `id`와 array2의 요소가 일치하는 [{ id: 2, name: 'amy' }] 이 반환돼요.
```
