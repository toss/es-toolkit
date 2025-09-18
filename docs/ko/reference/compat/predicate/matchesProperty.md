# matchesProperty (Lodash 호환성)

::: warning 직접적인 프로퍼티 접근을 사용하세요

이 `matchesProperty` 함수는 복잡한 경로 파싱과 함수 생성으로 인해 느리게 동작해요.

대신 더 빠르고 명확한 직접적인 프로퍼티 접근(`obj => obj.property === value`)을 사용하세요.

:::

특정 프로퍼티가 주어진 값과 일치하는지 확인하는 함수를 만들어요.

```typescript
const checker = matchesProperty(path, value);
```

## 레퍼런스

### `matchesProperty(property, source)`

객체의 특정 프로퍼티가 주어진 값과 일치하는지 확인하는 함수를 만들 때 `matchesProperty`를 사용하세요. 배열 필터링이나 객체 검색에서 유용해요.

```typescript
import { matchesProperty } from 'es-toolkit/compat';

// 단순 프로퍼티 확인
const checkName = matchesProperty('name', 'Alice');

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Alice', age: 35 }
];

const aliceUsers = users.filter(checkName);
// [{ name: 'Alice', age: 25 }, { name: 'Alice', age: 35 }]

// 중첩된 프로퍼티 확인 (배열 경로)
const checkCity = matchesProperty(['address', 'city'], 'Seoul');

const profiles = [
  { name: 'Kim', address: { city: 'Seoul', district: 'Gangnam' } },
  { name: 'Lee', address: { city: 'Busan', district: 'Haeundae' } },
  { name: 'Park', address: { city: 'Seoul', district: 'Mapo' } }
];

const seoulUsers = profiles.filter(checkCity);
// [{ name: 'Kim', address: { city: 'Seoul', district: 'Gangnam' } },
//  { name: 'Park', address: { city: 'Seoul', district: 'Mapo' } }]

// 깊은 경로를 문자열로 표현
const checkScore = matchesProperty('stats.game.score', 100);

const players = [
  { name: 'Player1', stats: { game: { score: 100, level: 5 } } },
  { name: 'Player2', stats: { game: { score: 95, level: 4 } } },
  { name: 'Player3', stats: { game: { score: 100, level: 6 } } }
];

const perfectScorers = players.filter(checkScore);
// [{ name: 'Player1', stats: { game: { score: 100, level: 5 } } },
//  { name: 'Player3', stats: { game: { score: 100, level: 6 } } }]

// 복잡한 객체와 매칭
const checkRole = matchesProperty('role', { type: 'admin', permissions: ['read', 'write'] });

const accounts = [
  { user: 'Alice', role: { type: 'admin', permissions: ['read', 'write'] } },
  { user: 'Bob', role: { type: 'user', permissions: ['read'] } },
  { user: 'Charlie', role: { type: 'admin', permissions: ['read', 'write'] } }
];

const admins = accounts.filter(checkRole);
// [{ user: 'Alice', role: { type: 'admin', permissions: ['read', 'write'] } },
//  { user: 'Charlie', role: { type: 'admin', permissions: ['read', 'write'] } }]
```

더 직접적이고 빠른 방법들:

```typescript
// 단순 프로퍼티 확인 (더 빠름)
const aliceUsers = users.filter(user => user.name === 'Alice');

// 중첩된 프로퍼티 확인
const seoulUsers = profiles.filter(profile => profile.address?.city === 'Seoul');

// 깊은 프로퍼티 확인
const perfectScorers = players.filter(player => player.stats?.game?.score === 100);

// 옵셔널 체이닝과 구조 분해
const admins = accounts.filter(({ role }) => 
  role?.type === 'admin' && 
  JSON.stringify(role?.permissions) === JSON.stringify(['read', 'write'])
);

// 헬퍼 함수 생성
function hasProperty(path, value) {
  return (obj) => {
    const keys = Array.isArray(path) ? path : path.split('.');
    let current = obj;
    for (const key of keys) {
      if (current?.[key] === undefined) return false;
      current = current[key];
    }
    return current === value;
  };
}
```

#### 파라미터

- `property` (`PropertyKey | PropertyKey[]`): 확인할 프로퍼티의 경로예요. 문자열, 배열, 또는 점으로 구분된 경로를 사용할 수 있어요.
- `source` (`unknown`): 프로퍼티 값과 비교할 값이에요.

### 반환 값

(`(target: unknown) => boolean`): 주어진 객체의 프로퍼티가 값과 일치하는지 확인하는 함수를 반환해요.