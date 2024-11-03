# findKey

提供されたテスト関数を満たすオブジェクト内の最初の要素のキーを検索します。

## Signature

```typescript
function findKey<T extends Record<any, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean
): keyof T | undefined;
```

### Parameters

- `obj` (`T extends Record<any, any>`): 検索するオブジェクト。
- `predicate` (`(value: T[keyof T], key: keyof T, obj: T) => boolean`): オブジェクト内の各値に対して実行する関数。

### Returns

(`keyof T | undefined`): 指定されたテスト関数を満たすオブジェクト内の最初の要素のキー。テストに合格する要素がない場合は未定義です。

## Examples

```typescript
const users = {
  pebbles: { age: 24, active: true },
  barney: { age: 36, active: true },
  fred: { age: 40, active: false },
};

findKey(users, o => o.age < 40); // 'pebbles'
findKey(users, o => o.age > 50); // undefined
```
