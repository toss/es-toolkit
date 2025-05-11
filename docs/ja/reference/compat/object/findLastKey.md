# findLastKey

::: info
この関数は `es-toolkit/compat` からのみ使用できます。  
lodash との互換性を保つために提供されており、`es-toolkit` のコアには含まれていません。
:::

オブジェクト内の**最後の要素**で、指定された条件を満たすキーを返します。

`findKey` と似ていますが、探索は末尾から始まります。

## シグネチャ

```ts
function findLastKey<T extends Record<any, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean
): keyof T | undefined;

function findLastKey<T extends Record<any, any>>(obj: T, objectToFind: Partial<T[keyof T]>): keyof T | undefined;

function findLastKey<T extends Record<any, any>>(obj: T, propertyToFind: [keyof T[keyof T], any]): keyof T | undefined;

function findLastKey<T extends Record<any, any>>(obj: T, propertyToFind: keyof T[keyof T]): keyof T | undefined;
```

### パラメータ

- `obj` (`T`): 探索する対象のオブジェクトです。
- `predicate`: 条件を定義します。次の形式が使えます：
  - **関数**：`(value, key, obj) => boolean`
  - **部分オブジェクト**：例：`{ active: true }`
  - **プロパティと値のペア**：例：`['active', true]`
  - **プロパティ名**（truthy 判定）：例：`'active'`

### 戻り値

条件に合致する**最後の要素のキー**を返します。  
見つからない場合は `undefined` を返します。

## 使用例

```ts
import { findLastKey } from 'es-toolkit/compat';

const users = {
  barney: { age: 36, active: true },
  fred: { age: 40, active: false },
  pebbles: { age: 1, active: true },
};

// 関数を使った場合
findLastKey(users, o => o.age < 40);
// => 'pebbles'

// 部分オブジェクトで指定
findLastKey(users, { active: true });
// => 'pebbles'

// プロパティと値のペアで指定
findLastKey(users, ['active', false]);
// => 'fred'

// プロパティ名だけで指定（truthy）
findLastKey(users, 'active');
// => 'pebbles'
```
