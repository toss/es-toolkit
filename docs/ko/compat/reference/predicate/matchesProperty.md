# matchesProperty (Lodash 호환성)

특정 프로퍼티가 주어진 값과 일치하는지 확인하는 함수를 만들어요.

```typescript
const checker = matchesProperty(path, value);
```

## 사용법

### `matchesProperty(property, source)`

객체의 특정 프로퍼티가 주어진 값과 일치하는지 확인하는 함수를 만들 때 `matchesProperty`를 사용하세요. 배열 필터링이나 객체 검색에서 유용해요.

```typescript
import { matchesProperty } from 'es-toolkit/compat';

// 단순 프로퍼티 확인
const checkName = matchesProperty('name', 'Alice');

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Alice', age: 35 },
];

const aliceUsers = users.filter(checkName);
// [{ name: 'Alice', age: 25 }, { name: 'Alice', age: 35 }]

// 중첩된 프로퍼티 확인 (배열 경로)
const checkCity = matchesProperty(['address', 'city'], 'Seoul');

const profiles = [
  { name: 'Kim', address: { city: 'Seoul', district: 'Gangnam' } },
  { name: 'Lee', address: { city: 'Busan', district: 'Haeundae' } },
  { name: 'Park', address: { city: 'Seoul', district: 'Mapo' } },
];

const seoulUsers = profiles.filter(checkCity);
// [{ name: 'Kim', address: { city: 'Seoul', district: 'Gangnam' } },
//  { name: 'Park', address: { city: 'Seoul', district: 'Mapo' } }]

// 깊은 경로를 문자열로 표현
const checkScore = matchesProperty('stats.game.score', 100);

const players = [
  { name: 'Player1', stats: { game: { score: 100, level: 5 } } },
  { name: 'Player2', stats: { game: { score: 95, level: 4 } } },
  { name: 'Player3', stats: { game: { score: 100, level: 6 } } },
];

const perfectScorers = players.filter(checkScore);
// [{ name: 'Player1', stats: { game: { score: 100, level: 5 } } },
//  { name: 'Player3', stats: { game: { score: 100, level: 6 } } }]

// 복잡한 객체와 매칭
const checkRole = matchesProperty('role', { type: 'admin', permissions: ['read', 'write'] });

const accounts = [
  { user: 'Alice', role: { type: 'admin', permissions: ['read', 'write'] } },
  { user: 'Bob', role: { type: 'user', permissions: ['read'] } },
  { user: 'Charlie', role: { type: 'admin', permissions: ['read', 'write'] } },
];

const admins = accounts.filter(checkRole);
// [{ user: 'Alice', role: { type: 'admin', permissions: ['read', 'write'] } },
//  { user: 'Charlie', role: { type: 'admin', permissions: ['read', 'write'] } }]
```

#### 파라미터

- `property` (`PropertyKey | PropertyKey[]`): 확인할 프로퍼티의 경로예요. 문자열, 배열, 또는 점으로 구분된 경로를 사용할 수 있어요.
- `source` (`unknown`): 프로퍼티 값과 비교할 값이에요.

#### 반환 값

(`(target: unknown) => boolean`): 주어진 객체의 프로퍼티가 값과 일치하는지 확인하는 함수를 반환해요.
