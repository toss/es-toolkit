# find (`Set`)

述語関数がtrueを返すSetの最初の要素を見つけます。

```typescript
const element = find(set, doesMatch);
```

::: info

この関数は、他のコレクション型の類似関数との潜在的な競合を避けるため、`es-toolkit/set`から独占的に利用できます。

:::

## 使用法

### `find(set, doesMatch)`

特定の条件に一致するSetの最初の要素を見つけたい場合は `find` を使用してください。各要素をテストする述語関数を提供すると、最初に一致した要素を返すか、見つからない場合はundefinedを返します。

```typescript
import { find } from 'es-toolkit/set';

const set = new Set([
  { name: 'apple', quantity: 10 },
  { name: 'banana', quantity: 5 },
  { name: 'grape', quantity: 15 },
]);

const result = find(set, value => value.quantity > 10);
// 結果: { name: 'grape', quantity: 15 }
```

様々な基準で検索できます。

```typescript
import { find } from 'es-toolkit/set';

// 値のプロパティで検索します。
const users = new Set([
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
]);

const senior = find(users, user => user.age >= 35);
// 結果: { id: 3, name: 'Charlie', age: 35 }

// 文字列のパターンで検索します。
const emails = new Set(['user@example.com', 'admin@example.com', 'info@company.com']);

const adminEmail = find(emails, email => email.startsWith('admin'));
// 結果: 'admin@example.com'
```

#### パラメータ

- `set` (`Set<T>`): 検索するSetです。
- `doesMatch` (`(value: T, value2: T, set: Set<T>) => boolean`): 各要素をテストする述語関数です。

#### 戻り値

(`T | undefined`): 述語を満たす最初の要素を返すか、見つからない場合はundefinedを返します。
