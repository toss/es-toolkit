# findKey (Lodash 互換性)

::: warning `es-toolkit`の`findKey`を使用してください

この`findKey`関数は、さまざまな条件タイプの処理と互換性ロジックにより、複雑に動作します。

代わりに、より高速で現代的な`es-toolkit`の[findKey](../../object/findKey.md)を使用してください。

:::

条件に一致する最初の要素のキーを検索します。

```typescript
const key = findKey(obj, predicate);
```

## 使用法

### `findKey(obj, predicate)`

オブジェクト内で条件に一致する最初の要素のキーを検索するには`findKey`を使用してください。関数、オブジェクト、配列、文字列など、さまざまな形式の条件を使用できます。

```typescript
import { findKey } from 'es-toolkit/compat';

// 関数条件でキーを検索
const users = {
  alice: { age: 25, active: true },
  bob: { age: 30, active: false },
  charlie: { age: 35, active: true },
};

findKey(users, user => user.age > 30);
// 戻り値: 'charlie'

// オブジェクト条件でキーを検索
findKey(users, { active: false });
// 戻り値: 'bob'

// プロパティパスでキーを検索
findKey(users, 'active');
// 戻り値: 'alice'
```

条件に一致する要素がない場合は`undefined`を返します。

```typescript
import { findKey } from 'es-toolkit/compat';

findKey({ a: 1, b: 2 }, value => value > 5);
// 戻り値: undefined
```

#### パラメータ

- `obj` (`T | null | undefined`): 検索するオブジェクトです。
- `predicate` (`ObjectIteratee<T>`, オプション): 各要素に適用する条件です。関数、オブジェクト、配列、文字列を指定できます。

#### 戻り値

(`string | undefined`): 条件に一致する最初の要素のキーを返します。一致するものがない場合は`undefined`を返します。
