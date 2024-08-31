# pullAt

특정 인덱스에 있는 요소들을 제거하고, 제거된 요소들을 반환해요.

이 함수는 음수 인덱스를 지원해요. 인덱스가 음수일 경우, 배열의 마지막부터 계산해요.

## 인터페이스

```typescript
function pullAt<T>(arr: T[], indicesToRemove: number[]): Array<T | undefined>;
```

### 파라미터

- `arr` (`T[]`): 요소를 제거할 배열.
- `indicesToRemove` (`number[]`): 요소를 제거할 인덱스.

### 반환 값

(`Array<T | undefined>`): 제거된 요소들의 배열.

## 예시

```typescript
import { pullAt } from 'es-toolkit/array';

const numbers = [10, 20, 30, 40, 50];
const removed = pullAt(numbers, [1, 3, 4]);
console.log(removed); // [20, 40, 50]
console.log(numbers); // [10, 30]
```
