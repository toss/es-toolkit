# at

배열에서 주어진 인덱스에 있는 요소들을 선택해서, 새 배열을 반환해요.

이 함수는 음수 인덱스를 지원해요. 인덱스가 음수일 경우, 배열의 마지막부터 계산해요.

## 인터페이스

```typescript
function at<T>(arr: T[], indices: number[]): Array<T | undefined>;
```

### 파라미터

- `arr` (`T[]`): 요소를 가져올 배열.
- `indices` (`number[]`): 요소를 가져올 인덱스.

### 반환 값

(`Array<T | undefined>`): 주어진 인덱스에 있는 요소들을 가지는 새 배열.

## 예시

```typescript
import { at } from 'es-toolkit/array';

const numbers = [10, 20, 30, 40, 50];
const result = at(numbers, [1, 3, 4]);
console.log(result); // [20, 40, 50]
```
