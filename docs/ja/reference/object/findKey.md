# findKey

提供されたテスト関数を満たすオブジェクト内の最初の要素のキーを検索します。

## インターフェース

```typescript
function findKey<T extends Record<any, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean
): keyof T | undefined;
```

### パラメータ

- `obj` (`T extends Record<any, any>`): 検索するオブジェクト。
- `predicate` (`(value: T[keyof T], key: keyof T, obj: T) => boolean`): オブジェクト内の各値に対して実行する関数。

### 戻り値

(`keyof T | undefined`): 指定されたテスト関数を満たすオブジェクト内の最初の要素のキー。テストに合格する要素がない場合は未定義です。

## 例

```typescript
const users = {
  pebbles: { age: 24, active: true },
  barney: { age: 36, active: true },
  fred: { age: 40, active: false },
};

findKey(users, o => o.age < 40); // 'pebbles'
findKey(users, o => o.age > 50); // undefined
```

## Lodash 互換性

`es-toolkit/compat` から `findKey` をインポートすると、Lodash と互換になります。
キーを検索する条件を、さまざまな方法で指定できます。

- **検査関数**: 各要素に対して検査する関数を実行します。最初に `true` を返す要素のキーを返します。
- **部分オブジェクト**: 指定されたオブジェクトと部分的に一致する要素のキーを返します。
- **プロパティ-値ペア**: 指定されたプロパティと値が一致する要素のキーを返します。
- **プロパティ名**: 指定されたプロパティに対して真と評価される要素のキーを返します。

### インターフェース

```typescript
function findKey<T extends Record<any, any>>(
  obj: T,
  conditionToFind: (value: T[keyof T], key: keyof T, obj: T) => boolean
): keyof T | undefined;
function findKey<T extends Record<any, any>>(obj: T, objectToFind: Partial<T[keyof T]>): keyof T | undefined;
function findKey<T extends Record<any, any>>(obj: T, propertyToFind: [keyof T[keyof T], any]): keyof T | undefined;
function findKey<T extends Record<any, any>>(obj: T, propertyToFind: keyof T[keyof T]): keyof T | undefined;
```

### 例

```typescript
const users = { barney: { age: 36 }, fred: { age: 40 } };

findKey(users, o => o.age < 40);
// => 'barney'
findKey(users, { age: 36 });
// => 'barney'
findKey(users, ['age', 36]);
// => 'barney'

const languages = { javascript: { active: false }, typescript: { active: true } };
findKey(users, 'active');
// => 'typescript'
```
