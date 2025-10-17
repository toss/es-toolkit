# pickBy

条件関数を満たすプロパティのみを含む新しいオブジェクトを返します。

```typescript
const result = pickBy(obj, shouldPick);
```

## 参照

### `pickBy(obj, shouldPick)`

条件関数を基にオブジェクトのプロパティを選択的に選択したい時に`pickBy`を使用してください。条件関数が`true`を返すプロパティのみが含まれた新しいオブジェクトを返します。

```typescript
import { pickBy } from 'es-toolkit/object';

// 文字列の値を持つプロパティのみを選択
const obj = { a: 1, b: 'select', c: 3, d: 'also select' };
const result = pickBy(obj, value => typeof value === 'string');
// resultは{ b: 'select', d: 'also select' }になります

// 偶数の値のみを選択
const numbers = { a: 1, b: 2, c: 3, d: 4 };
const evens = pickBy(numbers, value => value % 2 === 0);
// evensは{ b: 2, d: 4 }になります

// キーと値の両方を活用
const data = { user1: 25, user2: 17, admin1: 30, admin2: 28 };
const admins = pickBy(data, (value, key) => key.startsWith('admin') && value > 25);
// adminsは{ admin1: 30, admin2: 28 }になります
```

#### パラメータ

- `obj` (`T extends Record<string, any>`): プロパティをフィルタリングするオブジェクトです。
- `shouldPick` (`(value: T[keyof T], key: keyof T) => boolean`): プロパティを選択するかを決定する条件関数です。値とキーを受け取り、選択する場合は`true`、除外する場合は`false`を返します。

#### 戻り値

(`Partial<T>`): 条件関数を満たすプロパティのみを含む新しいオブジェクトを返します。
