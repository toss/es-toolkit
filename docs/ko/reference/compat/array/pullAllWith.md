# pullAllWith

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

제공된 비교 함수를 사용하여 제거 대상이 되는 요소를 판단하고, 배열에서 제거 및 반환해요.

비교 대상이 되는 배열(`values`)의 요소들과 비교 함수 (`comparator`)를 사용해 원본 배열(`array`)의 요소들을 비교하고, 그 결과가 `true`인 요소들을 원본 배열에서 제거해요.

## 인터페이스

```typescript
function pullAllWith<T>(array: T[], values: T[], comparator: (a: T, b: T) => boolean): T[];
```

### 파라미터

- `array` (`T[]`): 수정할 배열.
- `values` (`T[]`): 배열에서 제거할 값.
- `comparator` (`(a: T, b: T) => boolean`): `array`의 요소와 `values`의 요소를 비교하는 함수. 두 요소가 같으면 `true`를 반환해야 해요.

### 반환 값

(`T[]`): 지정된 값이 제거된 배열.

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
