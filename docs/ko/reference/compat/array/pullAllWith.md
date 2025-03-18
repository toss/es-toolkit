# pullAllWith

원본 배열(`array`)과 비교하고자 하는 요소들을 가진 배열(`values`)을 비교 함수(`comparator`)를 통해 비교하고, 원본 배열에서 비교 함수의 리턴값이 true인 요소들을 제거해요.

또한, 원본 배열에서 원하는 요소가 제거된 배열을 반환해요.

## 인터페이스

```typescript
function pullAllWith<T>(array: T[], values: T[], comparator: (a: T, b: T) => boolean): T[];
```

### 파라미터

- `array` (`T[]`): 요소를 제거할 원본 배열이에요.
- `values` (`T[]`): 비교 함수에서 비교에 사용될 값들의 배열이에요.
- `comparator` (`(a: T, b: T) => boolean`): array와 values의 요소를 비교하는 함수로, true를 반환하면 해당 요소는 제거해요.

### 반환 값

(`T[]`): 원본 배열에서 원하는 요소들이 제거된 배열. 모든 요소가 제거되거나, 제거할 요소가 없었다면 빈 배열(`[]`)을 반환해요.

## 예시

```typescript
import { pullAllWith } from 'es-toolkit/array';

const array = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
  { x: 5, y: 6 },
];

const removed = pullAllWith(array, [{ x: 3, y: 4 }], (a, b) => JSON.stringify(a) === JSON.stringify(b));

console.log(removed); // [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
console.log(array); // [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
```
