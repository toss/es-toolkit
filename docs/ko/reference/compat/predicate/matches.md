# matches (Lodash 호환성)

주어진 패턴과 부분적으로 일치하는지 확인하는 함수를 만들어요.

```typescript
const matcher = matches(pattern);
```

## 레퍼런스

### `matches(source)`

객체나 배열의 구조와 값이 특정 패턴과 일치하는지 확인하는 함수를 만들 때 `matches`를 사용하세요. 배열 필터링이나 객체 검색에서 유용해요.

```typescript
import { matches } from 'es-toolkit/compat';

// 객체 패턴 매칭
const userMatcher = matches({ age: 25, department: 'Engineering' });

const users = [
  { name: 'Alice', age: 25, department: 'Engineering' },
  { name: 'Bob', age: 30, department: 'Marketing' },
  { name: 'Charlie', age: 25, department: 'Engineering' },
];

const engineeringUsers = users.filter(userMatcher);
// [{ name: 'Alice', age: 25, department: 'Engineering' },
//  { name: 'Charlie', age: 25, department: 'Engineering' }]

// 중첩된 객체 패턴
const profileMatcher = matches({
  profile: { city: 'Seoul', verified: true },
});

const profiles = [
  { name: 'Kim', profile: { city: 'Seoul', verified: true, score: 100 } },
  { name: 'Lee', profile: { city: 'Busan', verified: true } },
  { name: 'Park', profile: { city: 'Seoul', verified: false } },
];

const seoulVerifiedUsers = profiles.filter(profileMatcher);
// [{ name: 'Kim', profile: { city: 'Seoul', verified: true, score: 100 } }]

// 배열 패턴 매칭
const arrayMatcher = matches([2, 4]);
const arrays = [
  [1, 2, 3, 4, 5],
  [2, 4, 6],
  [1, 3, 5],
];
const matchingArrays = arrays.filter(arrayMatcher);
// [[1, 2, 3, 4, 5], [2, 4, 6]]

// 빈 패턴은 모든 값과 매치
const emptyMatcher = matches({});
emptyMatcher({ anything: 'value' }); // true
emptyMatcher([]); // true
emptyMatcher(null); // true
```

#### 파라미터

- `source` (`unknown`): 일치 패턴이 되는 객체나 값이에요.

### 반환 값

(`(target: unknown) => boolean`): 주어진 값이 패턴과 부분적으로 일치하는지 확인하는 함수를 반환해요.
