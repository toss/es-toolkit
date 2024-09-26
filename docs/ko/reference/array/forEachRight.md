# forEachRight

배열 (`arr`)의 요소들을 오른쪽에서 왼쪽으로 순회하며 각 요소에 대해 `callback` 함수를 호출해요.

## 인터페이스

```ts
function forEachRight<T>(arr: T[], callback: (value: T, index: number, arr: T[]) => void): void;
```

### 파라미터

- `arr`: (`T[]`): 순회할 배열.
- `callback`: (`(value: T, index: number, arr: T[])`): 각 반복마다 호출될 함수예요.
  - `value`: 배열에서 처리 중인 현재 요소.
  - `index`: 배열에서 처리 중인 현재 요소의 인덱스.
  - `arr`: `forEachRight` 함수가 호출된 배열.

### 반환 값

`void`

## 예시

```ts
import { forEachRight } from 'es-toolkit/array';

const array = [1, 2, 3];
const result: number[] = [];

// forEachRight 함수를 사용하여 배열을 순회하며 각 요소를 결과 배열에 추가해요.
forEachRight(array, value => {
  result.push(value);
});

console.log(result); // Output: [3, 2, 1];
```
