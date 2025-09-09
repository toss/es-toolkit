# findLastKey

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

指定された条件を満たす最後の要素のキーを返します。

`findKey` は先頭から検索するのに対し、`findLastKey` はオブジェクトの末尾から検索します。

## インターフェース

```typescript
function findLastKey<T>(
  obj: T | null | undefined,
  conditionToFind: (value: T[keyof T], key: string, obj: T) => unknown
): string | undefined;

function findLastKey<T>(obj: T | null | undefined, objectToFind: Partial<T[keyof T]>): string | undefined;

function findLastKey<T>(obj: T | null | undefined, propertyToFind: [PropertyKey, any]): string | undefined;

function findLastKey<T>(obj: T | null | undefined, propertyToFind: PropertyKey): string | undefined;

function findLastKey<T>(
  obj: T | null | undefined,
  predicate?:
    | ((value: T[keyof T], key: string, obj: T) => unknown)
    | PropertyKey
    | [PropertyKey, any]
    | Partial<T[keyof T]>
): string | undefined;
```

### パラメータ

- `obj` (`T | null | undefined`): 検査するオブジェクトです。
- `predicate`: 反復ごとに呼び出される関数です。以下のいずれかの形式を取ります：
  - `(value, key, obj) => unknown` - 各要素に対して実行される関数です。
  - `Partial<T[keyof T]>` - 一致するプロパティを持つ要素に一致します。
  - `[PropertyKey, any]` - 指定されたプロパティと値を持つ要素に一致します。
  - `PropertyKey` - 指定されたプロパティの真値を持つ要素に一致します。

### 戻り値

(`string | undefined`): 一致した要素のキーを返します。一致する要素がない場合は `undefined` を返します。

### 例

```typescript
import { findLastKey } from 'es-toolkit/compat';

const users = {
  barney: { age: 36, active: true },
  fred: { age: 40, active: false },
  pebbles: { age: 1, active: true },
};

// 関数を使用する場合
findLastKey(users, o => o.age < 40);
// => 'pebbles'

// 部分オブジェクトを使用する場合
findLastKey(users, { active: true });
// => 'pebbles'

// プロパティと値のペアを使用する場合
findLastKey(users, ['active', false]);
// => 'fred'

// プロパティ名を使用する場合（真値チェック）
findLastKey(users, 'active');
// => 'pebbles'
```
