# matches (Lodash 兼容性)

创建一个函数来检查给定模式的部分匹配。

```typescript
const matcher = matches(pattern);
```

## 用法

### `matches(source)`

当您想创建一个函数来检查对象或数组的结构和值是否与特定模式匹配时使用 `matches`。在数组过滤或对象搜索中很有用。

```typescript
import { matches } from 'es-toolkit/compat';

// 对象模式匹配
const userMatcher = matches({ age: 25, department: 'Engineering' });

const users = [
  { name: 'Alice', age: 25, department: 'Engineering' },
  { name: 'Bob', age: 30, department: 'Marketing' },
  { name: 'Charlie', age: 25, department: 'Engineering' },
];

const engineeringUsers = users.filter(userMatcher);
// [{ name: 'Alice', age: 25, department: 'Engineering' },
//  { name: 'Charlie', age: 25, department: 'Engineering' }]

// 嵌套对象模式
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

// 数组模式匹配
const arrayMatcher = matches([2, 4]);
const arrays = [
  [1, 2, 3, 4, 5],
  [2, 4, 6],
  [1, 3, 5],
];
const matchingArrays = arrays.filter(arrayMatcher);
// [[1, 2, 3, 4, 5], [2, 4, 6]]

// 空模式匹配所有值
const emptyMatcher = matches({});
emptyMatcher({ anything: 'value' }); // true
emptyMatcher([]); // true
emptyMatcher(null); // true
```

#### 参数

- `source` (`unknown`): 作为匹配模式的对象或值。

#### 返回值

(`(target: unknown) => boolean`): 返回一个函数，用于检查给定值是否与模式部分匹配。
