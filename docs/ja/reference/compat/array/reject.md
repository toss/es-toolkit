# reject (Lodash 互換性)

::: warning `Array.filter()`を使用してください

この`reject`関数は、Lodashとの互換性のために様々な形式のpredicateをサポートするため、複雑に実装されています。シンプルな関数predicateを使用する場合は、`Array.filter()`の方がよりシンプルで高速に動作します。

代わりに、より高速で現代的な`Array.filter()`を使用してください。例えば、`reject(arr, func)`は`arr.filter(item => !func(item))`に置き換えることができます。

:::

コレクションを走査し、条件関数に一致しない要素を新しい配列として返します。

```typescript
const filtered = reject(collection, predicate);
```

## 参照

### `reject(collection, predicate)`

配列、オブジェクト、または文字列から、与えられた条件に一致しない要素のみを選んで新しい配列として返します。`filter`の反対の動作を実行します。

```typescript
import { reject } from 'es-toolkit/compat';

// 偶数でない数字をフィルタリングします
reject([1, 2, 3, 4, 5], n => n % 2 === 0);
// => [1, 3, 5]

// 特定のプロパティを持たないオブジェクトをフィルタリングします
reject([{ a: 1 }, { a: 2 }, { b: 1 }], 'a');
// => [{ b: 1 }]

// 特定のプロパティ値を持たないオブジェクトをフィルタリングします
reject([{ a: 1 }, { a: 2 }, { a: 3 }], { a: 2 });
// => [{ a: 1 }, { a: 3 }]

// 文字列から特定の文字でない文字をフィルタリングします
reject('abc', char => char === 'b');
// => ['a', 'c']
```

この関数は様々な形式のpredicateをサポートしています。

```typescript
import { reject } from 'es-toolkit/compat';

// 関数を使用した条件
reject(users, user => user.age < 18);

// オブジェクトの部分マッチング
reject(users, { active: false });

// プロパティ-値配列
reject(users, ['status', 'pending']);

// プロパティ名でtruthy値を確認
reject(users, 'premium');
```

#### パラメータ

- `collection` (`ArrayLike<T> | Record<any, any> | string | null | undefined`): 走査するコレクションです。
- `predicate` (`((item: T, index: number, collection: any) => unknown) | Partial<T> | [keyof T, unknown] | PropertyKey`, オプション): 各要素に対して実行する条件です。デフォルト値は`identity`です。

#### 戻り値

(`T[]`): predicate条件に一致しない要素で構成された新しい配列を返します。
