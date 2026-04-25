# remove (Lodash 互換性)

::: warning `es-toolkit`の`remove`を使用してください

この`remove`関数は、Lodashとの互換性のために様々な形式の述語をサポートするため、複雑に実装されています。メインライブラリの`remove`関数はシンプルな関数述語のみをサポートするため、より高速に動作します。

代わりに、より高速で現代的な`es-toolkit`の[remove](../../array/remove.md)を使用してください。

:::

配列から条件に一致する要素を削除し、削除された要素を配列として返します。

```typescript
const removedElements = remove(array, predicate);
```

## 使用法

### `remove(array, predicate)`

配列を反復処理し、与えられた条件に一致する要素を元の配列から削除し、削除された要素を新しい配列として返します。元の配列が直接変更されることに注意してください。

```typescript
import { remove } from 'es-toolkit/compat';

// 関数を使用した条件で削除
const numbers = [1, 2, 3, 4, 5];
const evens = remove(numbers, n => n % 2 === 0);
console.log(numbers); // => [1, 3, 5]
console.log(evens); // => [2, 4]

// 部分オブジェクトのマッチングで削除
const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
const removed = remove(objects, { a: 1 });
console.log(objects); // => [{ a: 2 }, { a: 3 }]
console.log(removed); // => [{ a: 1 }]

// プロパティ-値ペアで削除
const items = [{ name: 'apple' }, { name: 'banana' }, { name: 'cherry' }];
const cherries = remove(items, ['name', 'cherry']);
console.log(items); // => [{ name: 'apple' }, { name: 'banana' }]
console.log(cherries); // => [{ name: 'cherry' }]
```

この関数は様々な形式の述語をサポートします。

```typescript
import { remove } from 'es-toolkit/compat';

// 関数を使用した条件
remove(users, user => user.active === false);

// 部分オブジェクトのマッチング
remove(users, { status: 'inactive' });

// プロパティ-値配列
remove(users, ['type', 'guest']);

// プロパティ名で真値を確認
remove(users, 'isDeleted');
```

#### パラメータ

- `array` (`ArrayLike<T>`): 変更する配列です。
- `predicate` (`((value: T, index: number, array: ArrayLike<T>) => boolean) | Partial<T> | [keyof T, unknown] | keyof T`, オプション): 各要素に対して実行する条件です。デフォルトは`identity`です。

#### 戻り値

(`T[]`): 条件に一致して削除された要素で構成された新しい配列を返します。
