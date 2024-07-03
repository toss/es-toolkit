# countBy

배열에 속해 있는 요소를 `mapper` 함수가 반환하는 값 기준으로 분류하고, 개수를 세요. 

## 인터페이스

```typescript
function countBy<T>(arr: T[], transformer: (item: T) => string): Record<string, number>
```

### 파라미터

- `arr` (`T[]`): 각 요소의 갯수를 세고자 하는 배열
- `transformer` (`(item: T) => string`): 각 요소를 key로 변환하는 함수

### 반환 값

(`Record<string, number>`) 각 요소와 그 갯수를 key-value로 가지는 객체

## 예시

```javascript
import {countBy} from 'es-toolkit/array';

const array = [1, 2, 3, 4, 5, 6];
const result = countBy(array, x => x % 2 === 0 ? 'even' : 'odd');

console.log(result);
// 출력: { 'odd': 3, 'even': 3 }
```
