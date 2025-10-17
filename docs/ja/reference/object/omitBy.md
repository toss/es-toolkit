# omitBy

条件関数を満たすプロパティを除外した新しいオブジェクトを返します。

```typescript
const result = omitBy(obj, shouldOmit);
```

## 参照

### `omitBy(obj, shouldOmit)`

条件関数を基にオブジェクトのプロパティを選択的に除外したい時に`omitBy`を使用してください。条件関数が`true`を返すプロパティは除外され、`false`を返すプロパティのみが含まれた新しいオブジェクトを返します。

```typescript
import { omitBy } from 'es-toolkit/object';

// 文字列の値を持つプロパティを除外
const obj = { a: 1, b: 'remove', c: 3, d: 'also remove' };
const result = omitBy(obj, (value) => typeof value === 'string');
// resultは{ a: 1, c: 3 }になります

// 偶数の値のみを除外
const numbers = { a: 1, b: 2, c: 3, d: 4 };
const odds = omitBy(numbers, (value) => value % 2 === 0);
// oddsは{ a: 1, c: 3 }になります

// キーと値の両方を活用
const data = { user1: 25, user2: 17, admin1: 30, admin2: 28 };
const nonAdmins = omitBy(data, (value, key) => key.startsWith('admin'));
// nonAdminsは{ user1: 25, user2: 17 }になります
```

#### パラメータ

- `obj` (`T extends Record<string, any>`): プロパティをフィルタリングするオブジェクトです。
- `shouldOmit` (`(value: T[keyof T], key: keyof T) => boolean`): プロパティを除外するかを決定する条件関数です。値とキーを受け取り、除外する場合は`true`、維持する場合は`false`を返します。

#### 戻り値

(`Partial<T>`): 条件関数を満たさないプロパティで構成された新しいオブジェクトを返します。
